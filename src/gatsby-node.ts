import { promises as fs } from 'fs';
import { GatsbyNode, PluginOptions } from 'gatsby';
import simpleGit, { SimpleGitOptions } from 'simple-git';

interface Options extends PluginOptions {
  /**
   * The URL of the repository to clone.
   */
  repository: string;

  /**
   * The local path where to clone the repository to.
   */
  path: string;

  /**
   * The branch to clone. Defaults to `master`.
   */
  branch?: string;

  /**
   * Options for `simple-git`.
   */
  gitOptions?: Partial<SimpleGitOptions>;
}

/**
 * Check if a path exists.
 *
 * @param {string} path
 * @return {Promise<boolean>}
 */
const exists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

export const onPreBootstrap: GatsbyNode['onPreBootstrap'] = async ({ reporter }, options: Options): Promise<void> => {
  if (!options.repository) {
    reporter.panic('Missing required option `repository` for gatsby-plugin-git-clone.');
    return;
  }

  if (!options.path) {
    reporter.panic('Missing required option `path` for gatsby-plugin-git-clone.');
    return;
  }

  const git = simpleGit(options.gitOptions ?? {});

  if (await exists(options.path)) {
    await git.cwd(options.path);
    await git.pull('origin', options.branch, ['--rebase', '--autostash', '--depth', '1']);

    return;
  }

  await git.clone(options.repository, options.path, [
    '--branch',
    options.branch ?? 'master',
    '--depth',
    '1',
    '--single-branch'
  ]);
};
