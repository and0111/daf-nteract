import { CellType } from "@nteract/commutable";
import { actions } from "@nteract/core";
import {
  ContentRef,
  KernelRef,
  KernelspecsByRefRecord,
  KernelspecsRef
} from "@nteract/types";

export interface NotebookMenuProps {
    /**
     * Whether or not `Bookstore` is enabled
     * https://github.com/nteract/bookstore#bookstore-books
     */
    bookstoreEnabled?: boolean;
    persistAfterClick?: boolean;
    defaultOpenKeys?: string[];
    openKeys?: string[];
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
