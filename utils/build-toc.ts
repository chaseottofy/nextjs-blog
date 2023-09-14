import { NestedTitles } from '@/models/interfaces';

/**
 * Extract lines from raw mdx content that start with # and are not within code blocks
 * @remarks
 * - Only checks the first character of each line
 * @param code string - raw mdx content
 * @returns Array<string> - ['## Title 1', '### Title 2', ...]
 */
const extractTOC = (mdx: string): string[] => {
  const lines = mdx.split('\n');
  let isInCodeBlock = false;
  let toc: string[] = [];

  for (let line of lines) {
    const trimmedLine = line.trim();
    // Check if we're entering or exiting a code block
    if (trimmedLine.startsWith('```')) {
      isInCodeBlock = !isInCodeBlock;
      continue;
    }
    // If not in a code block, check for headers
    if (!isInCodeBlock && trimmedLine.startsWith('#')) {
      toc.push(trimmedLine);
    }
  }

  return toc;
};

function buildHierarchy(contentRaw: string): NestedTitles {
  if (contentRaw.length === 0) return {};

  const titles = extractTOC(contentRaw);
  if (titles.length === 0) return {};
  if (titles.length === 1) {
    const title = titles[0].replace(/^#+\s/, '');
    return { [title]: null };
  }

  const root: NestedTitles = {};
  let stack: { title: string; node: NestedTitles; }[] = [];

  titles.forEach(title => {
    const level = title.lastIndexOf('#') + 1;
    const pureTitle = title.substring(level).trim();

    if (level <= 2) {  // Treat ## and # as the same level
      root[pureTitle] = null;
      stack = [{ title: pureTitle, node: root }];
    } else {
      const lastStack = stack[stack.length - 1];

      if (level === stack.length + 2) { // Next level down
        if (!lastStack.node[lastStack.title]) {
          lastStack.node[lastStack.title] = {};
        }
        (lastStack.node[lastStack.title] as NestedTitles)[pureTitle] = null;
        stack.push({ title: pureTitle, node: lastStack.node[lastStack.title] as NestedTitles });
      } else {  // Same level, or back up
        while (level <= stack.length + 1) {
          stack.pop();
        }
        const lastNode = stack[stack.length - 1].node;
        (lastNode[stack[stack.length - 1].title] as NestedTitles)[pureTitle] = null;
      }
    }
  });

  return root;
}

export default buildHierarchy;
