# Rebuild and verify

The presentation, figures and article proof are already generated and ready for use. This section documents the source so an evaluator can inspect the original work.

- `src/make_figures.py`: original Matplotlib render script; depends on Matplotlib, NumPy, and Pillow. It reads the experiment output and writes seven PNGs in `figures/`. Run `python3 experiment/privacy_ablation.py` first.
- `src/build_slides.js`: original PptxGenJS authoring script. Rebuild requires Node.js, `pptxgenjs`, and OpenAI's `pptxgenjs_helpers` module available at the absolute path imported by the file. That helper path exists in the author's original generation environment and is not vendored into this repository. Do not assume a clean machine can rebuild slides solely by installing npm deps. **The generated PPTX is committed** so the assignment does not depend on that environment.
- `article/medium-article.md`: canonical article text; paths to figures are relative. `article/medium-article-standalone.html` embeds images inline so it can be opened without local `figures/` assets. `article/Medium_Article_Proof.pdf` is print-ready.
- `video/15-minute-narration-and-notes.md`: narration was derived from the slide authoring script's notes, timestamped manually to 15 minutes 23 seconds. Verify actual recorded duration.
- `slides/contact-sheet.png`: image preview of the full 22-slide deck.

Run `python3 experiment/privacy_ablation.py` before any chart rebuild. Outputs should be identical because there is no randomness or model API.
