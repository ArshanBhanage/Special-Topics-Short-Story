# Publication and submission runbook

This project contains the **finished drafts/files**, but it cannot independently authenticate your GitHub, Medium, Scribd, or YouTube accounts. This runbook separates completed material from actions that require your account. **Do not substitute placeholders for live links.**

## Step 0 — Confirm topic acceptance

Visit [the Fall 2026 sheet](https://docs.google.com/spreadsheets/d/13YnPKykntSONmfqkHyh94d7KsIvjdhrkblqKg8yLTFM/edit#gid=141293072). On the `2026 short story` tab, **row 19** is for Arshan Bhanage. The row is marked `approved`; `B19` links to `https://github.com/ArshanBhanage/Special-Topics-Short-Story`; and `D19` links to the primary June 2026 survey. Verify the link still resolves before submission.

## Step 1 — GitHub: create or update the destination

1. Open <https://github.com/ArshanBhanage/Special-Topics-Short-Story> while logged into your GitHub account. If it doesn't exist, create a **public** repository named `Special-Topics-Short-Story` under your account; do not rename an existing repo without checking downstream links.
2. Unzip `Agent_Privacy_Short_Story_Submission.zip` into a local folder. Upload the **folder's contents**, including `README.md`, `article/`, `figures/`, `slides/`, `video/`, `research/`, `experiment/`, `publishing/`, and `src/`. The root README should render when you visit the repository URL.
3. Verify both `article/medium-article.md` and `slides/Agent_Privacy_Short_Story.pdf` open for a user not signed in. Check the external links in the README.
4. Git CLI alternative if repo already exists and is authorized: from inside the unzipped directory, `git init`, `git add .`, `git commit -m "Add research short story deliverables"`, `git branch -M main`, `git remote add origin https://github.com/ArshanBhanage/Special-Topics-Short-Story.git`, then `git push -u origin main`. If remote has existing commits, first clone it and copy the files over so existing history is preserved. Never force-push blindly.
5. Don't commit files >100 MB. If your video is too big, upload it using Git LFS (if available), or store the video on YouTube and link to it clearly in README. The rubric requests video in GitHub: prefer an MP4 below 100 MB if feasible, while retaining YouTube link.

## Step 2 — Publish a genuinely new Medium story

1. Log into [Medium.com](https://medium.com/) → **Write** (new story). Use the article in `article/medium-article.md`, or copy text from `article/medium-article-standalone.html` in a browser.
2. Use the exact original headline **Your AI Agent Can Give a Clean Answer and Still Leak Your Data** and subtitle. Do **not** link to an older third-party Medium article.
3. Keep all sections and references, especially the qualification that the ablation is toy/synthetic and the figures are original.
4. Upload the PNG illustrations from `figures/` as native Medium images **near their matching figure captions**. Medium may not preserve relative paths from pasted Markdown. Check the preview: every figure must actually render.
5. Suggested topics/tags: `AI Agents`, `LLM Security`, `AI Engineering`, `Generative AI`, `LLM Evaluation` (within Medium's tag count limit).
6. Preview on desktop/mobile, review caption contrast and spelling, then **Publish** and copy the live story URL.
7. Replace the README's Medium pending status with the real URL. Also enter it in `publishing/links.json` under `medium_url`.

**Suggested Medium description:** An original, diagram-rich research synthesis of a June 2026 agent-privacy survey, enriched with recent evaluation/memory reviews, peer-reviewed AgentLeak evidence, and an explicitly synthetic ablation.

## Step 3 — Presentation publication

The presentation is published on [Scribd](https://www.scribd.com/document/1098754475/Agent-Privacy-Short-Story-pdf) by author choice. SlideShare is intentionally not used for this submission.

1. Keep the published Scribd URL in `README.md` and `publishing/links.json`.
2. Title used for the presentation: `Your AI Agent Can Give a Clean Answer and Still Leak Your Data | CMPE 297 Short Story`.
3. Description: `A June 2026 data-centric survey of privacy in LLM agents: six data surfaces, six disclosure outcomes, nine control families; recent survey synthesis, AgentLeak published evidence, benchmark gaps, and transparent synthetic policy ablation. By Arshan Bhanage.`
4. Verify the public Scribd page and confirm all 22 slides are present.

## Step 4 — Record and upload your video, >=15 minutes

1. Use the PowerPoint in `slides/` and read `video/15-minute-narration-and-notes.md`. It gives 22 slide-level narration blocks and a notional **15:23** timeline.
2. Record actual narration + visible slides via PowerPoint, OBS, Zoom, or screen recorder; export MP4. **Check actual duration >=15:00**; aim 16–17 minutes to have a margin. Keep the survey source/title and citations visible and read enough explanatory material to substantiate each figure.
3. Review 1080p video at 1x speed: audible voice, no silent slide gaps, no accidental personal screen data; citation slides visible.
4. Upload to YouTube; use the details in `video/youtube-description.md`, set sharing per instructor requirement, and copy the finished link. Add it to the README and `publishing/links.json`.
5. Add the MP4 to `video/` and push it to the public GitHub repository **if within acceptable GitHub file size limits**, otherwise use Git LFS or add the working YouTube link in README. You must not put a broken fake video file into the repo.

## Step 5 — Spreadsheet & public access verification

- Return to [professor's selection sheet](https://docs.google.com/spreadsheets/d/13YnPKykntSONmfqkHyh94d7KsIvjdhrkblqKg8yLTFM/edit#gid=141293072), find row **19** (Arshan Bhanage).
- Column **B** already points via hyperlink to the intended GitHub destination; check it is the *right public working repo*. If instructor allows edits and the displayed text `Github Link` needs replacement, enter the actual public URL in **B19**. Do not touch peers' rows. Do not set approval status yourself.
- Check the exact repository URL without a login and verify Medium, Scribd, YouTube, source papers, images, and PPT/PDF are accessible.
- **Only then** submit the public GitHub directory URL to the LMS.

## Upload-risk checklist

| Risk | Check |
| --- | --- |
| Approval not confirmed | Confirm `2026 short story!A19`, D19 with instructor |
| GitHub link doesn't exist/is private | Open it in a private browser window |
| Medium story not actually published | Open the new Medium URL when logged out |
| Scribd presentation unavailable | Open published link and count 22 slides |
| Video shorter than 15 minutes | Inspect the actual MP4/YouTube runtime |
| Article images lost on paste | Verify every figure and caption on Medium |
| Data points mistaken for original measurements | Preserve source citations and synthetic disclaimer |
| Broken README links | Click links from the remote GitHub README |
| Old unchanged placeholder links | Replace all three placeholders in README |
