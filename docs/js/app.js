// Router + rendering + localStorage persistence + prerequisite-DAG logic.

const app = document.getElementById("app");
const breadcrumb = document.getElementById("breadcrumb");

// ---------- storage helpers ----------

function isCompleted(lessonId) {
  return localStorage.getItem(`lesson:${lessonId}:completed`) === "1";
}
function setCompleted(lessonId, value) {
  localStorage.setItem(`lesson:${lessonId}:completed`, value ? "1" : "0");
}
function getNotes(lessonId) {
  return localStorage.getItem(`lesson:${lessonId}:notes`) || "";
}
function setNotes(lessonId, text) {
  localStorage.setItem(`lesson:${lessonId}:notes`, text);
}
function getExerciseAnswer(lessonId, idx) {
  return localStorage.getItem(`lesson:${lessonId}:ex:${idx}`) || "";
}
function setExerciseAnswer(lessonId, idx, text) {
  localStorage.setItem(`lesson:${lessonId}:ex:${idx}`, text);
}

// ---------- lookups ----------

function findSubject(subjectId) {
  return SUBJECTS.find(s => s.id === subjectId);
}
function findChapter(subject, chapterId) {
  return subject.chapters.find(c => c.id === chapterId);
}
function findLesson(chapter, lessonId) {
  return chapter.lessons.find(l => l.id === lessonId);
}
function allLessons(subject) {
  return subject.chapters.flatMap(c => c.lessons);
}

// Global index: lesson id -> { lesson, subject, chapter }, built once per page load.
let LESSON_INDEX = null;
function lessonIndex() {
  if (LESSON_INDEX) return LESSON_INDEX;
  LESSON_INDEX = new Map();
  for (const subject of SUBJECTS) {
    for (const chapter of subject.chapters) {
      for (const lesson of chapter.lessons) {
        LESSON_INDEX.set(lesson.id, { lesson, subject, chapter });
      }
    }
  }
  return LESSON_INDEX;
}
function lessonById(id) {
  const entry = lessonIndex().get(id);
  return entry ? entry.lesson : null;
}

// ---------- DAG validation (runs once at startup; logs problems, never throws) ----------
// Catches the mistakes that are otherwise invisible: a typo'd prerequisite id silently
// leaves a lesson locked forever with no on-screen explanation, since the UI quietly
// drops ids it can't resolve. A cycle does the same (nothing in the cycle ever unlocks).
// This is a plain console check, not a build step — edit a data-*.js file, reload, look
// at devtools console for "[DAG check]" lines.
function validateDag() {
  const seenIds = new Map(); // id -> count, to catch duplicates across/within subjects
  for (const subject of SUBJECTS) {
    for (const chapter of subject.chapters) {
      for (const lesson of chapter.lessons) {
        seenIds.set(lesson.id, (seenIds.get(lesson.id) || 0) + 1);
      }
    }
  }
  for (const [id, count] of seenIds) {
    if (count > 1) console.warn(`[DAG check] duplicate lesson id "${id}" appears ${count} times.`);
  }

  const index = lessonIndex();
  for (const [id, { lesson, subject }] of index) {
    for (const prereqId of prereqIds(lesson)) {
      if (!index.has(prereqId)) {
        console.warn(`[DAG check] "${id}" (${subject.id}) lists unknown prerequisite "${prereqId}" — likely a typo. That lesson will never show as unlocked.`);
      }
    }
  }

  // cycle detection: DFS with a recursion stack, over the whole cross-subject graph
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = new Map([...index.keys()].map(id => [id, WHITE]));
  function visit(id, path) {
    color.set(id, GRAY);
    path.push(id);
    for (const prereqId of prereqIds(index.get(id).lesson)) {
      if (!index.has(prereqId)) continue; // already reported above
      if (color.get(prereqId) === GRAY) {
        const cycleStart = path.indexOf(prereqId);
        console.warn(`[DAG check] prerequisite cycle: ${path.slice(cycleStart).join(" -> ")} -> ${prereqId}. None of these lessons can ever unlock.`);
      } else if (color.get(prereqId) === WHITE) {
        visit(prereqId, path);
      }
    }
    path.pop();
    color.set(id, BLACK);
  }
  for (const id of index.keys()) {
    if (color.get(id) === WHITE) visit(id, []);
  }
}

// ---------- prerequisite DAG ----------

function prereqIds(lesson) {
  return lesson.prerequisites || [];
}
function isUnlocked(lesson) {
  return prereqIds(lesson).every(isCompleted);
}
function missingPrereqs(lesson) {
  return prereqIds(lesson).map(lessonById).filter(Boolean).filter(p => !isCompleted(p.id));
}
// Lessons (within the same subject) that list `lessonId` as a prerequisite.
function childrenOf(subject, lessonId) {
  return allLessons(subject).filter(l => prereqIds(l).includes(lessonId));
}
function lessonStatus(lesson) {
  if (isCompleted(lesson.id)) return "done";
  if (isUnlocked(lesson)) return "available";
  return "locked";
}

// Global child adjacency: lesson id -> [ids of lessons listing it as a prerequisite].
let CHILDREN_MAP = null;
function childrenMap() {
  if (CHILDREN_MAP) return CHILDREN_MAP;
  CHILDREN_MAP = new Map();
  for (const id of lessonIndex().keys()) CHILDREN_MAP.set(id, []);
  for (const [id, { lesson }] of lessonIndex()) {
    for (const p of prereqIds(lesson)) {
      if (CHILDREN_MAP.has(p)) CHILDREN_MAP.get(p).push(id);
    }
  }
  return CHILDREN_MAP;
}
// How many lessons sit downstream of this one (transitively) — i.e. how much this "opens".
function descendantCount(id) {
  const cm = childrenMap();
  const seen = new Set();
  const stack = [...(cm.get(id) || [])];
  while (stack.length) {
    const c = stack.pop();
    if (seen.has(c)) continue;
    seen.add(c);
    for (const g of cm.get(c) || []) stack.push(g);
  }
  return seen.size;
}
// The n available (unlocked, not-yet-done) lessons that open the most downstream lessons.
function topSuggestions(n) {
  const avail = [];
  for (const [id, { lesson, subject }] of lessonIndex()) {
    if (!isCompleted(id) && isUnlocked(lesson)) {
      avail.push({ lesson, subject, count: descendantCount(id) });
    }
  }
  avail.sort((a, b) => b.count - a.count || a.lesson.title.localeCompare(b.lesson.title));
  return avail.slice(0, n);
}

// ---------- DAG layout + SVG rendering (shared by home and subject pages) ----------

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

// Layered layout: layer index = longest prerequisite chain within the given lesson set.
function layoutLayers(lessons) {
  const ids = new Set(lessons.map(l => l.id));
  const depth = new Map();
  function d(l) {
    if (depth.has(l.id)) return depth.get(l.id);
    depth.set(l.id, 0); // guard against cycles while recursing
    let val = 0;
    for (const p of prereqIds(l)) {
      if (ids.has(p)) val = Math.max(val, d(lessonById(p)) + 1);
    }
    depth.set(l.id, val);
    return val;
  }
  lessons.forEach(d);
  const layers = [];
  lessons.forEach(l => {
    const k = depth.get(l.id);
    (layers[k] = layers[k] || []).push(l);
  });
  return layers;
}

function renderDagSvg(lessons, accent) {
  if (!lessons.length) return "";
  const layers = layoutLayers(lessons);
  const NW = 150, NH = 30, HGAP = 20, VGAP = 30;
  const cols = Math.max(1, ...layers.map(a => (a ? a.length : 0)));
  const rows = layers.length;
  const width = cols * (NW + HGAP) + HGAP;
  const height = rows * (NH + VGAP) + VGAP;

  const pos = new Map();
  layers.forEach((arr, li) => {
    if (!arr) return;
    const total = arr.length * (NW + HGAP) - HGAP;
    const offset = (width - total) / 2;
    arr.forEach((l, ci) => {
      pos.set(l.id, { x: offset + ci * (NW + HGAP), y: VGAP + li * (NH + VGAP) });
    });
  });

  const ids = new Set(lessons.map(l => l.id));
  let edges = "";
  for (const l of lessons) {
    for (const p of prereqIds(l)) {
      if (!ids.has(p)) continue;
      const a = pos.get(p), b = pos.get(l.id);
      const x1 = a.x + NW / 2, y1 = a.y + NH, x2 = b.x + NW / 2, y2 = b.y;
      const my = (y1 + y2) / 2;
      edges += `<path d="M${x1.toFixed(1)},${y1} C${x1.toFixed(1)},${my.toFixed(1)} ${x2.toFixed(1)},${my.toFixed(1)} ${x2.toFixed(1)},${y2}" class="dag-edge"/>`;
    }
  }

  let nodes = "";
  for (const l of lessons) {
    const { x, y } = pos.get(l.id);
    const st = lessonStatus(l);
    const entry = lessonIndex().get(l.id);
    const href = `#/subject/${entry.subject.id}/${entry.chapter.id}/${l.id}`;
    nodes += `<a href="${href}" class="dag-node ${st}">` +
      `<rect x="${x.toFixed(1)}" y="${y}" width="${NW}" height="${NH}" rx="7"/>` +
      `<text x="${(x + NW / 2).toFixed(1)}" y="${y + NH / 2 + 4}" text-anchor="middle">${escapeHtml(truncate(l.title, 20))}</text>` +
      `<title>${escapeHtml(l.title)} — ${st}</title></a>`;
  }

  return `<svg class="dag-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="--accent:${accent}">${edges}${nodes}</svg>`;
}

function dagLegendHtml() {
  return `<div class="dag-legend">
    <span><span class="legend-swatch available"></span> can start now</span>
    <span><span class="legend-swatch done"></span> completed</span>
    <span><span class="legend-swatch locked"></span> locked</span>
  </div>`;
}

// ---------- debounce ----------

function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

// ---------- rendering helpers ----------

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function setBreadcrumb(parts) {
  // parts: [{label, hash?}]
  breadcrumb.innerHTML = parts
    .map((p, i) => {
      const isLast = i === parts.length - 1;
      if (isLast || !p.hash) return `<span>${escapeHtml(p.label)}</span>`;
      return `<a href="${p.hash}">${escapeHtml(p.label)}</a>`;
    })
    .join(' <span class="sep">/</span> ');
}

function statusIconHtml(status) {
  if (status === "done") return `<span class="status-icon done" title="Completed">✓</span>`;
  if (status === "locked") return `<span class="status-icon locked" title="Prerequisites not completed yet">🔒</span>`;
  return `<span class="status-icon available" title="Available">○</span>`;
}

function timeBadgeHtml(lesson) {
  if (!lesson.estMinutes) return "";
  return `<span class="time-badge">~${escapeHtml(String(lesson.estMinutes))} min</span>`;
}

function lessonLink(subject, lesson) {
  const entry = lessonIndex().get(lesson.id);
  const chapterId = entry ? entry.chapter.id : subject.chapters.find(c => c.lessons.includes(lesson)).id;
  return `#/subject/${subject.id}/${chapterId}/${lesson.id}`;
}

// ---------- home ----------

function suggestionsPanelHtml() {
  const sugg = topSuggestions(3);
  if (!sugg.length) return "";
  const items = sugg.map(s => `
    <li>
      <a href="${lessonLink(s.subject, s.lesson)}">
        <span class="sug-dot" style="background:${s.subject.color}"></span>
        <span class="lesson-title">${escapeHtml(s.lesson.title)}</span>
        <span class="crumb-tag">${escapeHtml(s.subject.name)} · opens ${s.count} more</span>
      </a>
    </li>`).join("");
  return `
    <section class="suggest-panel">
      <h3>Suggested next</h3>
      <p class="suggest-sub">The 3 unlockable lessons that open the most further material.</p>
      <ol class="suggest-list">${items}</ol>
    </section>`;
}

function renderHome() {
  setBreadcrumb([{ label: "Subjects" }]);

  const dags = SUBJECTS.map(subject => {
    const lessons = allLessons(subject);
    const done = lessons.filter(l => isCompleted(l.id)).length;
    return `
      <section class="home-subject">
        <div class="home-subject-head">
          <h2><a href="#/subject/${subject.id}" style="color:${subject.color}">${escapeHtml(subject.name)}</a></h2>
          <span class="progress-label">${done}/${lessons.length}</span>
        </div>
        <div class="dag-scroll">${renderDagSvg(lessons, subject.color)}</div>
      </section>`;
  }).join("");

  app.innerHTML = `
    <section class="home">
      <h1>Your map</h1>
      ${suggestionsPanelHtml()}
      ${dagLegendHtml()}
      ${dags}
    </section>`;
}

// ---------- subject ----------

function renderSubject(subjectId) {
  const subject = findSubject(subjectId);
  if (!subject) return renderNotFound();

  setBreadcrumb([{ label: "Subjects", hash: "#/" }, { label: subject.name }]);

  const lessons = allLessons(subject);

  // "Available now": unlocked, not yet completed, across the whole subject regardless of chapter/section.
  const available = lessons.filter(l => !isCompleted(l.id) && isUnlocked(l));
  const availableHtml = available.length
    ? `
      <section class="available-panel">
        <h3>Available now</h3>
        <ul class="available-list">
          ${available.map(l => {
            const entry = lessonIndex().get(l.id);
            return `
              <li>
                <a href="${lessonLink(subject, l)}">
                  <span class="lesson-title">${escapeHtml(l.title)}</span>
                  ${timeBadgeHtml(l)}
                </a>
                <span class="crumb-tag">${escapeHtml(entry.chapter.name)}${l.section ? " · " + escapeHtml(l.section) : ""}</span>
              </li>`;
          }).join("")}
        </ul>
      </section>`
    : "";

  const chapters = subject.chapters.map(chapter => {
    // group this chapter's lessons by `section` (fallback: chapter name), preserving first-seen order.
    const groups = [];
    const groupIndex = new Map();
    for (const lesson of chapter.lessons) {
      const key = lesson.section || "General";
      if (!groupIndex.has(key)) {
        groupIndex.set(key, groups.length);
        groups.push({ name: key, lessons: [] });
      }
      groups[groupIndex.get(key)].lessons.push(lesson);
    }

    const groupsHtml = groups.map(group => `
      <div class="section-group">
        <h4 class="section-heading">${escapeHtml(group.name)}</h4>
        <ul class="lesson-list">
          ${group.lessons.map(lesson => {
            const status = lessonStatus(lesson);
            return `
              <li class="lesson-row ${status}">
                <a href="${lessonLink(subject, lesson)}">
                  ${statusIconHtml(status)}
                  <span class="lesson-title">${escapeHtml(lesson.title)}</span>
                  ${timeBadgeHtml(lesson)}
                </a>
              </li>`;
          }).join("")}
        </ul>
      </div>`).join("");

    const doneCount = chapter.lessons.filter(l => isCompleted(l.id)).length;

    return `
      <section class="chapter">
        <h3>${escapeHtml(chapter.name)} <span class="chapter-count">${doneCount}/${chapter.lessons.length}</span></h3>
        ${groupsHtml}
      </section>`;
  }).join("");

  app.innerHTML = `
    <section class="subject" style="--accent:${subject.color}">
      <h1>${escapeHtml(subject.name)}</h1>
      <section class="subject-dag">
        <h3>Map</h3>
        ${dagLegendHtml()}
        <div class="dag-scroll">${renderDagSvg(lessons, subject.color)}</div>
      </section>
      ${availableHtml}
      ${chapters}
    </section>`;
}

// ---------- lesson ----------

function renderLesson(subjectId, chapterId, lessonId) {
  const subject = findSubject(subjectId);
  if (!subject) return renderNotFound();
  const chapter = findChapter(subject, chapterId);
  if (!chapter) return renderNotFound();
  const lesson = findLesson(chapter, lessonId);
  if (!lesson) return renderNotFound();

  setBreadcrumb([
    { label: "Subjects", hash: "#/" },
    { label: subject.name, hash: `#/subject/${subject.id}` },
    { label: lesson.title }
  ]);

  const done = isCompleted(lesson.id);
  const missing = missingPrereqs(lesson);

  const lockNoticeHtml = (!done && missing.length)
    ? `
      <div class="lock-notice">
        Usually comes after: ${missing.map(p => `<a href="${lessonLink(subject, p)}">${escapeHtml(p.title)}</a>`).join(", ")}
        — you can still read this now if you want to jump ahead.
      </div>`
    : "";

  const prereqs = prereqIds(lesson).map(lessonById).filter(Boolean);
  const prereqsHtml = prereqs.length ? `
    <div class="dag-block">
      <h4>Prerequisites</h4>
      <ul class="dag-list">
        ${prereqs.map(p => `<li>${statusIconHtml(lessonStatus(p))} <a href="${lessonLink(subject, p)}">${escapeHtml(p.title)}</a></li>`).join("")}
      </ul>
    </div>` : "";

  const children = childrenOf(subject, lesson.id);
  const childrenHtml = children.length ? `
    <div class="dag-block">
      <h4>Leads to</h4>
      <ul class="dag-list">
        ${children.map(c => `<li>${statusIconHtml(lessonStatus(c))} <a href="${lessonLink(subject, c)}">${escapeHtml(c.title)}</a></li>`).join("")}
      </ul>
    </div>` : "";

  const exercisesHtml = lesson.exercises.map((ex, i) => `
    <div class="exercise">
      <p class="exercise-prompt"><strong>${i + 1}.</strong> ${ex}</p>
      <textarea class="exercise-answer" data-idx="${i}" placeholder="Your answer / working...">${escapeHtml(getExerciseAnswer(lesson.id, i))}</textarea>
    </div>
  `).join("");

  app.innerHTML = `
    <section class="lesson" style="--accent:${subject.color}">
      <div class="lesson-header">
        <div class="lesson-header-titles">
          <h1>${escapeHtml(lesson.title)}</h1>
          <div class="lesson-meta">${lesson.section ? `<span class="crumb-tag">${escapeHtml(lesson.section)}</span>` : ""}${timeBadgeHtml(lesson)}</div>
        </div>
        <button id="complete-btn" class="complete-btn ${done ? "is-done" : ""}">
          ${done ? "✓ Completed" : "Mark as complete"}
        </button>
      </div>

      ${lockNoticeHtml}

      <div class="lesson-content">${lesson.content}</div>

      <section class="notes-block">
        <h3>Thoughts / notes</h3>
        <textarea id="notes-area" placeholder="Write your thoughts here...">${escapeHtml(getNotes(lesson.id))}</textarea>
        <span id="notes-saved" class="saved-indicator"></span>
      </section>

      <section class="exercises-block">
        <h3>Exercises</h3>
        ${exercisesHtml}
      </section>

      <nav class="dag-nav">
        ${prereqsHtml}
        ${childrenHtml}
      </nav>
    </section>`;

  // wire up interactions
  document.getElementById("complete-btn").addEventListener("click", () => {
    const newState = !isCompleted(lesson.id);
    setCompleted(lesson.id, newState);
    renderLesson(subjectId, chapterId, lessonId);
  });

  const notesArea = document.getElementById("notes-area");
  const savedIndicator = document.getElementById("notes-saved");
  const saveNotes = debounce((text) => {
    setNotes(lesson.id, text);
    savedIndicator.textContent = "Saved";
    setTimeout(() => { savedIndicator.textContent = ""; }, 1200);
  }, 400);
  notesArea.addEventListener("input", (e) => saveNotes(e.target.value));

  document.querySelectorAll(".exercise-answer").forEach(area => {
    const idx = Number(area.dataset.idx);
    const save = debounce((text) => setExerciseAnswer(lesson.id, idx, text), 400);
    area.addEventListener("input", (e) => save(e.target.value));
  });
}

function renderNotFound() {
  setBreadcrumb([{ label: "Subjects", hash: "#/" }, { label: "Not found" }]);
  app.innerHTML = `<section class="not-found"><h1>Not found</h1><p><a href="#/">Back to subjects</a></p></section>`;
}

// ---------- router ----------

function route() {
  LESSON_INDEX = null; // rebuild in case data changed; cheap either way
  CHILDREN_MAP = null;
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);

  if (parts.length === 0) return renderHome();
  if (parts[0] === "subject" && parts.length === 2) return renderSubject(parts[1]);
  if (parts[0] === "subject" && parts.length === 4) return renderLesson(parts[1], parts[2], parts[3]);
  return renderNotFound();
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", () => {
  validateDag(); // console warnings only, once per load — see the function for what it catches
  route();
});
