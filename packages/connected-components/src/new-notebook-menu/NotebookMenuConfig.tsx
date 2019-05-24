import React from 'react'
import { AnchorButton, MenuDivider, MenuItem } from "@blueprintjs/core"

// Note, we can reuse keys, but all paths need to be unique in the menu.

// These actions map to a case in a switch handler. They are meant to cause a
// unique actionKey from the menu.
export const NOTEBOOK_MENU_ACTIONS = {
    SAVE_NOTEBOOK: "save-notebook",
    DOWNLOAD_NOTEBOOK: "download-notebook",
    EXECUTE_ALL_CELLS: "execute-all-cells",
    EXECUTE_ALL_CELLS_BELOW: "execute-all-cells-below",
    RESTART_KERNEL: "restart-kernel",
    RESTART_AND_CLEAR_OUTPUTS: "restart-kernel-and-clear-outputs",
    RESTART_AND_RUN_ALL_OUTPUTS: "restart-kernel-and-run-all-outputs",
    CLEAR_ALL_OUTPUTS: "clear-all-outputs",
    CHANGE_KERNEL: "change-kernel",
    UNHIDE_ALL: "unhide-all",
    CREATE_CODE_CELL: "create-code-cell",
    CREATE_MARKDOWN_CELL: "create-markdown-cell",
    SET_CELL_TYPE_CODE: "set-cell-type-code",
    SET_CELL_TYPE_MARKDOWN: "set-cell-type-markdown",
    COPY_CELL: "copy-cell",
    CUT_CELL: "cut-cell",
    PASTE_CELL: "paste-cell",
    SET_THEME_DARK: "set-theme-dark",
    SET_THEME_LIGHT: "set-theme-light",
    TOGGLE_EDITOR: "toggle-editor",
    OPEN_ABOUT: "open-about",
    KILL_KERNEL: "kill-kernel",
    INTERRUPT_KERNEL: "interrupt-kernel",
    PUBLISH_TO_BOOKSTORE: "publish-to-bookstore"
  };

const { 
  SAVE_NOTEBOOK,
  DOWNLOAD_NOTEBOOK,
  PUBLISH_TO_BOOKSTORE,
  CUT_CELL,
  COPY_CELL,
  PASTE_CELL,
  SET_CELL_TYPE_CODE,
  SET_CELL_TYPE_MARKDOWN,
  TOGGLE_EDITOR,
  SET_THEME_LIGHT,
  SET_THEME_DARK,
  EXECUTE_ALL_CELLS,
  EXECUTE_ALL_CELLS_BELOW,
  CREATE_CODE_CELL,
  CREATE_MARKDOWN_CELL,
  CLEAR_ALL_OUTPUTS,
  UNHIDE_ALL,
  INTERRUPT_KERNEL,
  KILL_KERNEL,
  RESTART_KERNEL,
  RESTART_AND_CLEAR_OUTPUTS,
  RESTART_AND_RUN_ALL_OUTPUTS,
  CHANGE_KERNEL,
  OPEN_ABOUT,
} = NOTEBOOK_MENU_ACTIONS

// To allow actions that can take dynamic arguments (like selecting a kernel
// based on the host's kernelspecs), we have some simple utility functions to
// stringify/parse actions/arguments.
export const createActionKey = (actionKey: string, ...args: any[]) =>
  [actionKey, ...args].join(":");
export const parseActionKey = (key: string) => key.split(":");

const makePublishMenuItem = bookstoreEnabled => bookstoreEnabled ? { item: "Publish", actionKey: PUBLISH_TO_BOOKSTORE } : null

const mapKernelSpecsToSubItems = currentKernelspecs =>
  currentKernelspecs
  ? currentKernelspecs.byName
    .keySeq()
    .map(name => [
      name,
      currentKernelspecs.byName.getIn([name, "displayName"])
    ])
    .toArray()
    .map(([name, displayName]) => ({ item: displayName, actionKey: createActionKey(CHANGE_KERNEL, name) }))
  : null 

export const makeNotebookMenuConfig = (bookstoreEnabled, currentKernelspecs) => [
  {
    item: "File",
    subItems: [
      { component: <AnchorButton minimal href="/nteract/edit" target="_blank" text="Open..." /> },
      { item: "Save", actionKey: SAVE_NOTEBOOK },
      { item: "Download (.ipynb)", actionKey: DOWNLOAD_NOTEBOOK },
      makePublishMenuItem(bookstoreEnabled)
    ]
  },{
    item: "Edit",
    subItems: [
      { item: "Cut Cell", actionKey: CUT_CELL },
      { item: "Copy Cell", actionKey: COPY_CELL },
      { item: "Paste Cell Below", actionKey: PASTE_CELL },
      { component: <MenuDivider /> },
      {
        item: "Cell Type",
        subItems: [
          { item: "Code", actionKey: SET_CELL_TYPE_CODE },
          { item: "Markdown", actionKey: SET_CELL_TYPE_MARKDOWN }
        ]
      }
    ]
  },{
    item: "View",
    subItems: [
      { item: "Notebook Header", actionKey: TOGGLE_EDITOR },
      {
        item: "Themes",
        subItems: [
          { item: "Light", actionKey: SET_THEME_LIGHT },
          { item: "Dark", actionKey: SET_THEME_DARK }
        ]
      }
    ]
  },{
    item: "Cell",
    subItems: [
      { item: "Run All Cells", actionKey: EXECUTE_ALL_CELLS },
      { item: "Run All Cells Below", actionKey: EXECUTE_ALL_CELLS_BELOW },
      { component: <MenuDivider /> },
      { 
        item: "New Cell",
        subItems: [
          { item: "Code", actionKey: CREATE_CODE_CELL },
          { item: "Markdown", actionKey: CREATE_MARKDOWN_CELL }
        ]
       },
      { component: <MenuDivider /> },
      { item: "Clear All Outputs", actionKey: CLEAR_ALL_OUTPUTS },
      { item: "Unhide All Inputs and Outputs", actionKey: UNHIDE_ALL }
    ]
  },{
    item: "Runtime",
    subItems: [
      { item: "Interrupt", actionKey: INTERRUPT_KERNEL },
      { component: <MenuDivider /> },
      { item: "Halt", actionKey: KILL_KERNEL },
      { item: "Restart", actionKey: RESTART_KERNEL },
      { item: "Restart and Clear All Cells", actionKey: RESTART_AND_CLEAR_OUTPUTS },
      { item: "Restart and Run All Cells", actionKey: RESTART_AND_RUN_ALL_OUTPUTS },
      { component: <MenuDivider /> },
      { 
          item: "Change Kernel",
          // TODO: dedicated mapping for kernelSpecs
          subItems: mapKernelSpecsToSubItems(currentKernelspecs)
      }
    ]
  },{
    item: "Help",
    subItems: [{ item: "About", actionKey: OPEN_ABOUT}]
  }
]
