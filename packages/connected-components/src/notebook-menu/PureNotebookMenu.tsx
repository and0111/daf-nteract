// Vendor modules
import { CellType } from "@nteract/commutable";
import { actions } from "@nteract/core";
import {
  ContentRef,
  KernelRef,
  KernelspecsByRefRecord,
  KernelspecsRef
} from "@nteract/types";
import React, { SyntheticEvent, CSSProperties } from "react";
// import styled from "styled-components";
import {
  // ButtonGroup,
  // Button,
  // Popover,
  Menu,
  MenuItem,
  MenuDivider,
  // Position,
  // Classes
} from "@blueprintjs/core";

// Local modules
import { MENU_ITEM_ACTIONS } from "./constants";
import { IconNames } from "@blueprintjs/icons";

// To allow actions that can take dynamic arguments (like selecting a kernel
// based on the host's kernelspecs), we have some simple utility functions to
// stringify/parse actions/arguments.
const createActionKey = (action: string, ...args: any[]) =>
  [action, ...args].join(":");
const parseActionKey = (key: string) => key.split(":");

// Styled Components
// const StickyMenu = styled(ButtonGroup)`
//   position: sticky;
//   top: 0;
//   z-index: 10000;
// `;

export interface PureNotebookMenuProps {
  /**
   * Whether or not `Bookstore` is enabled
   * https://github.com/nteract/bookstore#bookstore-books
   */
  bookstoreEnabled?: boolean;
  currentKernelRef?: KernelRef | null;
  toggleNotebookHeaderEditor?: (payload: { contentRef: string }) => void;
  saveNotebook?: (payload: { contentRef: string }) => void;
  downloadNotebook?: (payload: { contentRef: string }) => void;
  executeCell?: (payload: { id: string; contentRef: string }) => void;
  executeAllCells?: (payload: { contentRef: string }) => void;
  executeAllCellsBelow?: (payload: { contentRef: string }) => void;
  clearAllOutputs?: (payload: { contentRef: string }) => void;
  unhideAll?: (payload: {
    outputHidden: boolean;
    inputHidden: boolean;
    contentRef: string;
  }) => void;
  cutCell?: (payload: { id?: string; contentRef: string }) => void;
  copyCell?: (payload: { id?: string; contentRef: string }) => void;
  pasteCell?: (payload: { contentRef: string }) => void;
  createCellBelow?: (payload: {
    id?: string | undefined;
    cellType: CellType;
    source: string;
    contentRef: string;
  }) => void;
  changeCellType?: (payload: {
    id?: string | undefined;
    to: CellType;
    contentRef: string;
  }) => void;
  setTheme?: (theme: string) => void;
  openAboutModal?: () => void;
  changeKernelByName?: (payload: {
    kernelSpecName: string;
    oldKernelRef?: KernelRef | null;
    contentRef: ContentRef;
  }) => void;
  restartKernel?: (payload: {
    outputHandling: actions.RestartKernelOutputHandling;
    kernelRef?: string | null;
    contentRef: string;
  }) => void;
  restartKernelAndClearOutputs?: (payload: {
    kernelRef?: string | null;
    contentRef: string;
  }) => void;
  restartKernelAndRunAllOutputs?: (payload: {
    kernelRef?: string | null;
    contentRef: string;
  }) => void;
  killKernel?: (payload: {
    restarting: boolean;
    kernelRef?: string | null;
  }) => void;
  interruptKernel?: (payload: { kernelRef?: string | null }) => void;
  currentContentRef: ContentRef;
  currentKernelspecsRef?: KernelspecsRef | null;
  currentKernelspecs?: KernelspecsByRefRecord | null;
  /**
   * Function required to publish notebooks to `Bookstore`.
   * https://github.com/nteract/bookstore#bookstore-books
   */
  onPublish?: (payload: { contentRef: ContentRef }) => void;
}

class PureNotebookMenu extends React.PureComponent<PureNotebookMenuProps> {
  handleActionClick = (e: SyntheticEvent, action: string, ...args: any[]) => {
    e.preventDefault();
    const currentKey = { key: createActionKey(action, ...args) };
    console.log(`PureNotebookenu::handleActionmClick -> ${currentKey.key}`);
    this.handleClick(currentKey);
  };

  handleClick = ({ key }: { key: string }) => {
    const {
      saveNotebook,
      downloadNotebook,
      changeKernelByName,
      currentKernelRef,
      copyCell,
      createCellBelow,
      cutCell,
      executeAllCells,
      executeAllCellsBelow,
      clearAllOutputs,
      unhideAll,
      onPublish,
      openAboutModal,
      pasteCell,
      setTheme,
      changeCellType,
      restartKernel,
      restartKernelAndClearOutputs,
      restartKernelAndRunAllOutputs,
      killKernel,
      interruptKernel,
      currentContentRef,
      toggleNotebookHeaderEditor
    } = this.props;
    const [action, ...args] = parseActionKey(key);
    switch (action) {
      case MENU_ITEM_ACTIONS.TOGGLE_EDITOR:
        toggleNotebookHeaderEditor &&
          toggleNotebookHeaderEditor({ contentRef: currentContentRef });
        break;
      case MENU_ITEM_ACTIONS.SAVE_NOTEBOOK:
        saveNotebook && saveNotebook({ contentRef: currentContentRef });
        break;
      case MENU_ITEM_ACTIONS.DOWNLOAD_NOTEBOOK:
        downloadNotebook && downloadNotebook({ contentRef: currentContentRef });
        break;
      case MENU_ITEM_ACTIONS.COPY_CELL:
        copyCell && copyCell({ contentRef: currentContentRef });
        break;
      case MENU_ITEM_ACTIONS.CUT_CELL:
        cutCell && cutCell({ contentRef: currentContentRef });
        break;
      case MENU_ITEM_ACTIONS.PASTE_CELL:
        pasteCell && pasteCell({ contentRef: currentContentRef });
        break;
      case MENU_ITEM_ACTIONS.CREATE_CODE_CELL:
        createCellBelow &&
          createCellBelow({
            cellType: "code",
            source: "",
            contentRef: currentContentRef
          });
        break;
      case MENU_ITEM_ACTIONS.CREATE_MARKDOWN_CELL:
        createCellBelow &&
          createCellBelow({
            cellType: "markdown",
            source: "",
            contentRef: currentContentRef
          });
        break;
      case MENU_ITEM_ACTIONS.SET_CELL_TYPE_CODE:
        changeCellType &&
          changeCellType({
            to: "code",
            contentRef: currentContentRef
          });

        break;
      case MENU_ITEM_ACTIONS.SET_CELL_TYPE_MARKDOWN:
        changeCellType &&
          changeCellType({
            to: "markdown",
            contentRef: currentContentRef
          });
        break;
      case MENU_ITEM_ACTIONS.EXECUTE_ALL_CELLS:
        executeAllCells && executeAllCells({ contentRef: currentContentRef });
        break;
      case MENU_ITEM_ACTIONS.EXECUTE_ALL_CELLS_BELOW:
        executeAllCellsBelow &&
          executeAllCellsBelow({ contentRef: currentContentRef });
        break;
      case MENU_ITEM_ACTIONS.UNHIDE_ALL:
        unhideAll &&
          unhideAll({
            outputHidden: false,
            inputHidden: false,
            contentRef: currentContentRef
          });

        break;
      case MENU_ITEM_ACTIONS.CLEAR_ALL_OUTPUTS:
        clearAllOutputs && clearAllOutputs({ contentRef: currentContentRef });
        break;
      case MENU_ITEM_ACTIONS.SET_THEME_DARK:
        setTheme && setTheme("dark");
        break;
      case MENU_ITEM_ACTIONS.SET_THEME_LIGHT:
        setTheme && setTheme("light");
        break;
      case MENU_ITEM_ACTIONS.OPEN_ABOUT:
        openAboutModal && openAboutModal();
        break;
      case MENU_ITEM_ACTIONS.INTERRUPT_KERNEL:
        interruptKernel && interruptKernel({ kernelRef: currentKernelRef });
        break;
      case MENU_ITEM_ACTIONS.RESTART_KERNEL:
        restartKernel &&
          restartKernel({
            outputHandling: "None",
            kernelRef: currentKernelRef,
            contentRef: currentContentRef
          });
        break;
      case MENU_ITEM_ACTIONS.RESTART_AND_CLEAR_OUTPUTS:
        restartKernelAndClearOutputs &&
          restartKernelAndClearOutputs({
            kernelRef: currentKernelRef,
            contentRef: currentContentRef
          });
        break;
      case MENU_ITEM_ACTIONS.RESTART_AND_RUN_ALL_OUTPUTS:
        restartKernelAndRunAllOutputs &&
          restartKernelAndRunAllOutputs({
            kernelRef: currentKernelRef,
            contentRef: currentContentRef
          });
        break;
      case MENU_ITEM_ACTIONS.KILL_KERNEL:
        killKernel &&
          killKernel({ restarting: false, kernelRef: currentKernelRef });
        break;
      case MENU_ITEM_ACTIONS.CHANGE_KERNEL:
        changeKernelByName &&
          changeKernelByName({
            oldKernelRef: currentKernelRef,
            contentRef: currentContentRef,
            kernelSpecName: args[0]
          });
        break;
      case MENU_ITEM_ACTIONS.PUBLISH_TO_BOOKSTORE:
        onPublish && onPublish({ contentRef: currentContentRef });
        break;
      default:
        console.log(`unhandled action: ${action}`);
    }
  };

  render(): JSX.Element {
    const { bookstoreEnabled, currentKernelspecs } = this.props;
    // const { BOTTOM } = Position;
    const {
      DOCUMENT_OPEN,
      FLOPPY_DISK,
      DOWNLOAD,
      CLOUD_UPLOAD,
      CUT,
      DUPLICATE,
      CLIPBOARD,
      SWAP_HORIZONTAL,
      WIDGET_HEADER,
      STYLE,
      PLAY,
      INSERT,
      ERASER,
      EYE_OFF,
      PAUSE,
      STOP,
      REPEAT,
      REFRESH,
      REDO,
      EXCHANGE,
      HELP
    } = IconNames;
    const notebookMenuStyles: CSSProperties = {
      position: "sticky",
      top: 0,
      zIndex: 10000,
      display: "inline-flex",
      width: "100%",
      background: "var(--theme-app-bg)",
      color: "var(--theme-app-fg)",
      borderBottom: "1px solid var(--theme-app-border)"
    };

    return (
      <Menu style={notebookMenuStyles}>
        <MenuItem
          text="File"
          children={
            <Menu>
              <MenuItem
                text="Open..."
                icon={DOCUMENT_OPEN}
                href="/nteract/edit"
                target="_blank"
              />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.SAVE_NOTEBOOK)
                }
                // actionkey={MENU_ITEM_ACTIONS.SAVE_NOTEBOOK}
                text="Save"
                icon={FLOPPY_DISK}
              />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.DOWNLOAD_NOTEBOOK)
                }
                // actionkey={MENU_ITEM_ACTIONS.DOWNLOAD_NOTEBOOK}
                text="Download (.ipynb)"
                icon={DOWNLOAD}
              />
              {bookstoreEnabled ? (
                <MenuItem
                  onClick={(e: SyntheticEvent) =>
                    this.handleActionClick(
                      e,
                      MENU_ITEM_ACTIONS.PUBLISH_TO_BOOKSTORE
                    )
                  }
                  // actionkey={MENU_ITEM_ACTIONS.PUBLISH_TO_BOOKSTORE}
                  text="Publish"
                  icon={CLOUD_UPLOAD}
                />
              ) : null}
            </Menu>
          }
        />
        <MenuItem
          text="Edit"
          children={
            <Menu>
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.CUT_CELL)
                }
                // actionkey={MENU_ITEM_ACTIONS.CUT_CELL}
                text="Cut Cell"
                icon={CUT}
              />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.COPY_CELL)
                }
                // actionkey={MENU_ITEM_ACTIONS.COPY_CELL}
                text="Copy Cell"
                icon={DUPLICATE}
              />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.PASTE_CELL)
                }
                // actionkey={MENU_ITEM_ACTIONS.PASTE_CELL}
                text="Paste Cell Below"
                icon={CLIPBOARD}
              />
              <MenuDivider />
              <MenuItem text="Change Cell Type" icon={SWAP_HORIZONTAL}>
                <MenuItem
                  onClick={(e: SyntheticEvent) =>
                    this.handleActionClick(
                      e,
                      MENU_ITEM_ACTIONS.SET_CELL_TYPE_CODE
                    )
                  }
                  // actionkey={MENU_ITEM_ACTIONS.SET_CELL_TYPE_CODE}
                  text="Code"
                />
                <MenuItem
                  onClick={(e: SyntheticEvent) =>
                    this.handleActionClick(
                      e,
                      MENU_ITEM_ACTIONS.SET_CELL_TYPE_MARKDOWN
                    )
                  }
                  // actionkey={MENU_ITEM_ACTIONS.SET_CELL_TYPE_MARKDOWN}
                  text="Markdown"
                />
              </MenuItem>
            </Menu>
          }
        />
        <MenuItem
          text="View"
          children={
            <Menu>
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.TOGGLE_EDITOR)
                }
                // actionkey={MENU_ITEM_ACTIONS.TOGGLE_EDITOR}
                text="Notebook Header"
                icon={WIDGET_HEADER}
              />
              <MenuItem text="themes" icon={STYLE}>
                <MenuItem
                  onClick={(e: SyntheticEvent) =>
                    this.handleActionClick(e, MENU_ITEM_ACTIONS.SET_THEME_LIGHT)
                  }
                  // actionkey={MENU_ITEM_ACTIONS.SET_THEME_LIGHT}
                  text="light"
                />
                <MenuItem
                  onClick={(e: SyntheticEvent) =>
                    this.handleActionClick(e, MENU_ITEM_ACTIONS.SET_THEME_DARK)
                  }
                  // actionkey={MENU_ITEM_ACTIONS.SET_THEME_DARK}
                  text="dark"
                />
              </MenuItem>
            </Menu>
          }
        />
        <MenuItem
          text="Cell"
          children={
            <Menu>
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.EXECUTE_ALL_CELLS)
                }
                // actionkey={MENU_ITEM_ACTIONS.EXECUTE_ALL_CELLS}
                text="Run All Cells"
                icon={PLAY}
              />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(
                    e,
                    MENU_ITEM_ACTIONS.EXECUTE_ALL_CELLS_BELOW
                  )
                }
                // actionkey={MENU_ITEM_ACTIONS.EXECUTE_ALL_CELLS_BELOW}
                text="Run All Cells Below"
                icon={PLAY}
              />
              <MenuDivider />
              <MenuItem text="New Cell" icon={INSERT}>
                <MenuItem
                  onClick={(e: SyntheticEvent) =>
                    this.handleActionClick(
                      e,
                      MENU_ITEM_ACTIONS.CREATE_CODE_CELL
                    )
                  }
                  // actionkey={MENU_ITEM_ACTIONS.CREATE_CODE_CELL}
                  text="Code"
                />
                <MenuItem
                  onClick={(e: SyntheticEvent) =>
                    this.handleActionClick(
                      e,
                      MENU_ITEM_ACTIONS.CREATE_MARKDOWN_CELL
                    )
                  }
                  // actionkey={MENU_ITEM_ACTIONS.CREATE_MARKDOWN_CELL}
                  text="Markdown"
                />
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.CLEAR_ALL_OUTPUTS)
                }
                // actionkey={MENU_ITEM_ACTIONS.CLEAR_ALL_OUTPUTS}
                text="Clear All Outputs"
                icon={ERASER}
              />

              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.UNHIDE_ALL)
                }
                // actionkey={MENU_ITEM_ACTIONS.UNHIDE_ALL}
                text="Unhide All Input and Output"
                icon={EYE_OFF}
              />
            </Menu>
          }
        />
        <MenuItem
          text="Runtime"
          children={
            <Menu>
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.INTERRUPT_KERNEL)
                }
                // actionkey={MENU_ITEM_ACTIONS.INTERRUPT_KERNEL}
                text="Interrupt"
                icon={PAUSE}
              />
              <MenuDivider />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.KILL_KERNEL)
                }
                // actionkey={MENU_ITEM_ACTIONS.KILL_KERNEL}
                text="Halt"
                icon={STOP}
              />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.RESTART_KERNEL)
                }
                // actionkey={MENU_ITEM_ACTIONS.RESTART_KERNEL}
                text="Restart"
                icon={REPEAT}
              />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(
                    e,
                    MENU_ITEM_ACTIONS.RESTART_AND_CLEAR_OUTPUTS
                  )
                }
                // actionkey={MENU_ITEM_ACTIONS.RESTART_AND_CLEAR_OUTPUTS}
                text="Restart and Clear All Cells"
                icon={REFRESH}
              />
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(
                    e,
                    MENU_ITEM_ACTIONS.RESTART_AND_RUN_ALL_OUTPUTS
                  )
                }
                // actionkey={MENU_ITEM_ACTIONS.RESTART_AND_RUN_ALL_OUTPUTS}
                text="Restart and Run All Cells"
                icon={REDO}
              />
              <MenuDivider />
              <MenuItem
                disabled={!currentKernelspecs}
                text="Change Kernel"
                icon={EXCHANGE}
              >
                {currentKernelspecs
                  ? currentKernelspecs.byName
                      .keySeq()
                      .map((name: string) => [
                        name,
                        currentKernelspecs.byName.getIn([name, "displayName"])
                      ])
                      .toArray()
                      .map(([name, displayName]: string[]) => {
                        return (
                          <MenuItem
                            onClick={(e: SyntheticEvent) =>
                              this.handleActionClick(
                                e,
                                MENU_ITEM_ACTIONS.CHANGE_KERNEL,
                                name
                              )
                            }
                            // actionkey={MENU_ITEM_ACTIONS.CHANGE_KERNEL}
                            text={displayName}
                          />
                        );
                      })
                  : null}
              </MenuItem>
            </Menu>
          }
        />
        <MenuItem
          text="Help"
          children={
            <Menu>
              <MenuItem
                onClick={(e: SyntheticEvent) =>
                  this.handleActionClick(e, MENU_ITEM_ACTIONS.OPEN_ABOUT)
                }
                // actionkey={MENU_ITEM_ACTIONS.OPEN_ABOUT}
                text="About"
                icon={HELP}
              />
            </Menu>
          }
        />
      </Menu>
    );
  }
}

export default PureNotebookMenu;
