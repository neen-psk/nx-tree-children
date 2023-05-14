import { Tree, joinPathFragments } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

describe('AppComponent', () => {
  let tree: Tree;

  test('when a file is removed, it should not be shown in tree.children list', () => {
    tree = createTreeWithEmptyWorkspace();
    const targetFilePath = joinPathFragments('apps', 'test', 'file-a.json');
    tree.write(targetFilePath, '');

    expect(tree.exists(targetFilePath)).toBe(true);
    expect(tree.children('apps/test').length).toBe(1);

    tree.delete(targetFilePath);

    expect(tree.exists(targetFilePath)).toBe(false);
    expect(tree.children('apps/test').length).toBe(0);
  });
});
