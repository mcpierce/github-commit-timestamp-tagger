import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const token = core.getInput('repo-token', { required: true });
    const baseVersion = core.getInput('base_version');
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1); // getMonth() is zero-based
    const dd = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    const hh = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    const min = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    const ss = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    const timestamp = [yyyy, mm, dd, hh, min, ss].join("");
    const tag = `${baseVersion}-${timestamp}`;
    const sha = github.context.sha;

    console.log(`Generating a tag with ${tag} for ${sha}.`);
    const client = new github.GitHub(token);
    await client.git.createRef({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      ref: `refs/tags/${tag}`,
      sha: sha
    });

    // create the output variables
    console.log(`Setting output variable: tag=${tag}`);
    core.setOutput('tag_name', tag);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
