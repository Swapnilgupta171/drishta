# DRISHTA — Animation Direction

> **The animation is the storytelling mechanism, not decoration.**  
> Use GSAP to make the visitor travel through one continuous illustrated world.

## 1. Core principle: one evolving illustration

The defining interaction is a continuous illustrated story. The six chapters should feel like successive moments in the same imagined world. Whenever possible, carry visual motifs—such as a flower, eye, moon, brushstroke, drifting paper fragment or ornamental vine—from one chapter into the next.

Avoid treating every section as an isolated animation demo. Transitions should preserve visual continuity and help the narrative progress.

## 2. Story arc

1. **Arrival:** Reveal the world in layers. The wordmark and headline appear with restraint while the hero illustration assembles.
2. **Awakening:** The hero's visual motif travels or transforms into the human-perspective chapter.
3. **Dual creation:** The composition develops into a visual contrast between human and AI creation. Keep the comparison thoughtful, not adversarial.
4. **Human essence:** Details such as a hand, brushstroke, flower or imperfect paper edge become the focus. Reveal the story progressively.
5. **Recognition:** Visual motifs converge around the Drishta philosophy.
6. **Resolution:** The elements settle into a final composed scene and closing statement.

The exact visual metaphor can evolve during implementation, but the journey must read as one connected story.

## 3. GSAP implementation

First inspect the project and locate the installed GSAP skills. Read the relevant `SKILL.md` files before implementing. Likely locations include `~/.gemini/antigravity/skills/` and `.agent/skills/`; also inspect applicable `AGENTS.md` instructions.

Use the installed guidance for:
- `gsap-core` — tweens, easing, stagger and defaults.
- `gsap-timeline` — choreographed sequences and labels.
- `gsap-scrolltrigger` — scroll-linked progression, pinning and refresh.
- `gsap-plugins` — only plugins that materially help the experience.
- `gsap-utils` — mapping, clamping and reusable helpers.
- `gsap-performance` — efficient animation and rendering.
- `gsap-react` — if the project uses React.
- `gsap-frameworks` — if another supported framework is used.

Do not claim a skill was used unless its instructions were actually inspected and applied.

## 4. Animation vocabulary

Use a restrained set of techniques with clear narrative purpose:

- **Layered reveals:** foreground, middle-ground and background artwork appear in sequence.
- **Scroll-driven storytelling:** ScrollTrigger advances a scene or illustration as the visitor moves through chapters.
- **Parallax depth:** a small number of visual layers move at different rates.
- **Organic motion:** subtle, slow movement for selected botanical or atmospheric details.
- **Typography reveals:** staggered word or line entrances where they improve emphasis.
- **Morphs and transitions:** use SVG or suitable plugin techniques only when they create a meaningful visual transformation.
- **Cinematic timelines:** coordinate the entrance and exit of major scenes.

Prefer a few memorable sequences over constant motion. Avoid excessive floating, spinning, bouncing, cursor-following or simultaneous movement.

## 5. Continuous-scene guidance

Where practical, build a recurring master visual composition from separately controllable layers. Use timeline labels to mark narrative beats. Let a motif exit one chapter and reappear in the next, or transform its meaning as the story changes.

Pinned ScrollTrigger sections may be used for key moments, but do not trap the visitor in long scroll sequences. Keep scroll progression intuitive, ensure the page remains navigable and avoid horizontal-scroll gimmicks unless they clearly serve the story.

Use a normal document flow as the foundation. Animation should enhance the reading order, not replace it.

## 6. Performance, lifecycle and accessibility

- Animate transforms and opacity where appropriate; avoid unnecessary layout-triggering properties.
- Scope selectors and timelines to their components.
- Clean up/revert GSAP contexts and ScrollTriggers on unmount or route changes.
- Refresh ScrollTrigger after significant layout changes.
- Avoid excessive `will-change`.
- Do not make essential content depend on animation.
- Respect `prefers-reduced-motion`; provide a meaningful static or simplified experience.
- Test touch behaviour and smaller screens; adapt or simplify pinning and parallax on mobile.
- Ensure no horizontal overflow, scroll jank or content hidden behind pinned scenes.

## 7. Motion quality test

For every animation, ask:
1. What story beat does it communicate?
2. Does it connect to the scene before or after it?
3. Is the motion calm and intentional?
4. Does the content remain readable and accessible?
5. Does the experience still work with reduced motion?

If an animation has no clear answer to the first two questions, remove it.
