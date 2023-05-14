# NxTreeChildren

A repository for reproducing [the `tree.children` filtering issue](https://github.com/nrwl/nx/issues/17011) on Windows machines

Currently, there is a filter in the `tree.children` method to exclude deleted files from the list.

https://github.com/nrwl/nx/blob/881067bbd24431e025ecf3ba9e5849a1c824d6b5/packages/nx/src/generators/tree.ts#L284-L287

However, due to the Windows path separator, this filter fails to work properly on Windows machines. When `dirPath` is `apps/test` and `q` is `file-a.json`, the `join(this.rp(dirPath), q)` function returns `'apps\test\file-a.json'`, which is not recognized by `recordedChanges`. As a result, the filter always returns `true`, causing deleted files to remain in the list.

## How to test

1. Open the workspace above on a **Windows** machine
2. Run `npm i`
3. Go to the `src/app/app.component.spec.ts` file where there is a test to add a file with a nested path to the tree then remove it and expect the list from `tree.children` to be empty
4. Run the test in that file
5. You should see the test fails on a Windows machine which indicates that the `tree.children` doesn't work. As a result, the children list is not empty.
