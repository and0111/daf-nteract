// Vendor modules
import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import {
  ButtonGroup,
  Button,
  Popover,
  Menu,
  MenuItem
} from "@blueprintjs/core";
// import {
//   AppState,
//   ContentRef,
//   HostRecord,
//   KernelRef,
//   KernelspecsByRefRecord,
//   KernelspecsByRefRecordProps,
//   KernelspecsRef
// } from "@nteract/types";

// Local modules
import {
  NOTEBOOK_MENU_ACTIONS,
  parseActionKey,
  makeNotebookMenuConfig
} from "./NotebookMenuConfig";
import { NotebookMenuProps } from "./NotebookMenuTypes";

// Styled Components
const StickyMenu = styled(Menu)`
  position: sticky;
  top: 0;
  z-index: 10000;
`;

const Link = styled.a`
  color: currentColor;
`;

export default class NotebookMenu extends React.PureComponent<
  NotebookMenuProps
> {
  constructor(props: NotebookMenuProps) {
    super(props);
  }

  handleClickNew = (actionKey: string) => {
    // e.preventDefault(); 

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
      OPEN_ABOUT
    } = NOTEBOOK_MENU_ACTIONS;

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

    const [action, ...args] = parseActionKey(actionKey);

    const handleActionSwitch = {
      [TOGGLE_EDITOR]:
        toggleNotebookHeaderEditor &&
        toggleNotebookHeaderEditor({ contentRef: currentContentRef }),

      [SAVE_NOTEBOOK]:
        saveNotebook && saveNotebook({ contentRef: currentContentRef }),

      [DOWNLOAD_NOTEBOOK]:
        downloadNotebook && downloadNotebook({ contentRef: currentContentRef }),

      [COPY_CELL]: copyCell && copyCell({ contentRef: currentContentRef }),

      [CUT_CELL]: cutCell && cutCell({ contentRef: currentContentRef }),

      [PASTE_CELL]: pasteCell && pasteCell({ contentRef: currentContentRef }),

      [CREATE_CODE_CELL]:
        createCellBelow &&
        createCellBelow({
          cellType: "code",
          source: "",
          contentRef: currentContentRef
        }),

      [CREATE_MARKDOWN_CELL]:
        createCellBelow &&
        createCellBelow({
          cellType: "markdown",
          source: "",
          contentRef: currentContentRef
        }),

      [SET_CELL_TYPE_CODE]:
        changeCellType &&
        changeCellType({
          to: "code",
          contentRef: currentContentRef
        }),

      [SET_CELL_TYPE_MARKDOWN]:
        changeCellType &&
        changeCellType({
          to: "markdown",
          contentRef: currentContentRef
        }),

      [EXECUTE_ALL_CELLS]:
        executeAllCells && executeAllCells({ contentRef: currentContentRef }),

      [EXECUTE_ALL_CELLS_BELOW]:
        executeAllCellsBelow &&
        executeAllCellsBelow({ contentRef: currentContentRef }),

      [UNHIDE_ALL]:
        unhideAll &&
        unhideAll({
          outputHidden: false,
          inputHidden: false,
          contentRef: currentContentRef
        }),

      [CLEAR_ALL_OUTPUTS]:
        clearAllOutputs && clearAllOutputs({ contentRef: currentContentRef }),

      [SET_THEME_DARK]: setTheme && setTheme("dark"),

      [SET_THEME_LIGHT]: setTheme && setTheme("light"),

      [OPEN_ABOUT]: openAboutModal && openAboutModal(),

      [INTERRUPT_KERNEL]:
        interruptKernel && interruptKernel({ kernelRef: currentKernelRef }),

      [RESTART_KERNEL]:
        restartKernel &&
        restartKernel({
          outputHandling: "None",
          kernelRef: currentKernelRef,
          contentRef: currentContentRef
        }),

      [RESTART_AND_CLEAR_OUTPUTS]:
        restartKernelAndClearOutputs &&
        restartKernelAndClearOutputs({
          kernelRef: currentKernelRef,
          contentRef: currentContentRef
        }),

      [RESTART_AND_RUN_ALL_OUTPUTS]:
        restartKernelAndRunAllOutputs &&
        restartKernelAndRunAllOutputs({
          kernelRef: currentKernelRef,
          contentRef: currentContentRef
        }),

      [KILL_KERNEL]:
        killKernel &&
        killKernel({ restarting: false, kernelRef: currentKernelRef }),

      [CHANGE_KERNEL]:
        changeKernelByName &&
        changeKernelByName({
          oldKernelRef: currentKernelRef,
          contentRef: currentContentRef,
          kernelSpecName: args[0] // args are not coming from right source
        }),

      [PUBLISH_TO_BOOKSTORE]:
        onPublish && onPublish({ contentRef: currentContentRef })
    };
    console.log(actionKey, handleActionSwitch[action])
    // handleActionSwitch[action] || null;
    return null
  };

  renderNotebookMenuItem = ({ item, actionKey, component, subItems = [] }) =>
    <MenuItem
      text={item || component}
      onClick={this.handleClickNew(actionKey)}
    >{
      subItems.length && subItems.map(renderNotebookMenuItem)
    }</MenuItem>

  // Can not be recursive if using ({ bookstoreEnabled, currentKernelspecs }) parameter
  mapNotebookMenuItemToDropdown = ({ item, actionKey, component, subItems = [] }) => (
    <Popover
      target={<Button text={item} />}
      content={
        subItems.length && <Menu>{subItems.map(renderNotebookMenuItem)}</Menu>
      }
    />
  )
  
  renderNotebookMenu = (itemsList = makeNotebookMenuConfig(this.props.bookstoreEnabled, this.props.currentKernelspecs)) =>
    itemsList.map(
      ({ item, actionKey, component, subItems = [] }) => (
        <Popover
          target={<Button text={item} />}
          content={
            <Menu >
              {subItems.length &&
                subItems.map(({ item, actionKey, component, subItems = [] }) =>
                  item ? (
                    <MenuItem text={item} onClick={e => this.handleClickNew(actionKey)}>
                      {subItems.length
                        ? this.renderNotebookMenu(subItems) // Can not be recursive if using ({ bookstoreEnabled, currentKernelspecs }) parameter
                        : null}
                    </MenuItem>
                  ) : (
                    component
                  )
                )}
            </Menu>
          }
        />
      )
    );

  render(): JSX.Element {
    // const { bookstoreEnabled, currentKernelspecs } = this.props;
    // const menuProps: { [key: string]: any } = {
    //   mode: "horizontal",
    //   onClick: this.handleClick,
    //   onOpenChange: this.handleOpenChange,
    //   defaultOpenKeys,
    //   selectable: false
    // };

    return (
      <ButtonGroup minimal className="bp3-fill">
        {this.renderNotebookMenu()}
      </ButtonGroup>
    );
  }
}
