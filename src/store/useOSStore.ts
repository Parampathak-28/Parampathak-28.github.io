import { create } from "zustand";

import {
  useSettingsStore,
} from "@/store/useSettingsStore";

export type AppId =
  | "finder"
  | "notes"
  | "claude"
  | "messages"
  | "photos"
  | "preview"
  | "music"
  | "terminal"
  | "settings";

export type WindowPosition = {
  x: number;
  y: number;
};

export type WindowSize = {
  width: number;
  height: number;
};

export type WindowState = {
  open: boolean;
  minimized: boolean;
  maximized: boolean;

  zIndex: number;

  position: WindowPosition;
  size: WindowSize;
};

type OSStore = {
  windows: Record<
    AppId,
    WindowState
  >;

  activeApp:
    | AppId
    | null;

  topZIndex: number;

  openApp: (
    appId: AppId
  ) => void;

  closeApp: (
    appId: AppId
  ) => void;

  minimizeApp: (
    appId: AppId
  ) => void;

  restoreApp: (
    appId: AppId
  ) => void;

  toggleMaximize: (
    appId: AppId
  ) => void;

  focusApp: (
    appId: AppId
  ) => void;

  updateWindowPosition: (
    appId: AppId,
    position:
      WindowPosition
  ) => void;

  updateWindowSize: (
    appId: AppId,
    size:
      WindowSize
  ) => void;

  closeAllExceptSettings:
    () => void;
};

/* =========================================================
   WINDOW FACTORY
========================================================= */

const createWindow = (
  x: number,
  y: number,
  width: number,
  height: number,
  zIndex: number
): WindowState => ({
  open: false,

  minimized: false,

  maximized: false,

  zIndex,

  position: {
    x,
    y,
  },

  size: {
    width,
    height,
  },
});

/* =========================================================
   WIFI ACCESS CHECK
========================================================= */

function canAccessApp(
  appId: AppId
) {
  /*
   * System Settings must always remain available.
   * Every other ParamOS app requires simulated Wi-Fi.
   */

  if (
    appId ===
    "settings"
  ) {
    return true;
  }

  return useSettingsStore
    .getState()
    .wifiEnabled;
}

/* =========================================================
   STORE
========================================================= */

export const useOSStore =
  create<OSStore>(
    (set) => ({
      activeApp: null,

      topZIndex: 100,

      windows: {
        finder:
          createWindow(
            110,
            75,
            1060,
            650,
            101
          ),

        notes:
          createWindow(
            150,
            70,
            1000,
            680,
            102
          ),

        claude:
          createWindow(
            175,
            65,
            1000,
            680,
            103
          ),

        messages:
          createWindow(
            130,
            75,
            1030,
            650,
            104
          ),

        photos:
          createWindow(
            110,
            65,
            1050,
            680,
            105
          ),

        preview:
          createWindow(
            210,
            60,
            820,
            700,
            106
          ),

        music:
          createWindow(
            120,
            70,
            1060,
            670,
            107
          ),

        terminal:
          createWindow(
            210,
            120,
            820,
            500,
            108
          ),

        settings:
          createWindow(
            180,
            85,
            930,
            640,
            109
          ),
      },

      /* ===================================================
         OPEN
      =================================================== */

      openApp:
        (
          appId
        ) =>
          set(
            (
              state
            ) => {
              if (
                !canAccessApp(
                  appId
                )
              ) {
                return state;
              }

              const newZIndex =
                state.topZIndex +
                1;

              return {
                activeApp:
                  appId,

                topZIndex:
                  newZIndex,

                windows: {
                  ...state.windows,

                  [appId]: {
                    ...state
                      .windows[
                      appId
                    ],

                    open: true,

                    minimized:
                      false,

                    zIndex:
                      newZIndex,
                  },
                },
              };
            }
          ),

      /* ===================================================
         CLOSE
      =================================================== */

      closeApp:
        (
          appId
        ) =>
          set(
            (
              state
            ) => ({
              activeApp:
                state.activeApp ===
                appId
                  ? null
                  : state.activeApp,

              windows: {
                ...state.windows,

                [appId]: {
                  ...state
                    .windows[
                    appId
                  ],

                  open: false,

                  minimized:
                    false,

                  maximized:
                    false,
                },
              },
            })
          ),

      /* ===================================================
         MINIMIZE
      =================================================== */

      minimizeApp:
        (
          appId
        ) =>
          set(
            (
              state
            ) => ({
              activeApp:
                state.activeApp ===
                appId
                  ? null
                  : state.activeApp,

              windows: {
                ...state.windows,

                [appId]: {
                  ...state
                    .windows[
                    appId
                  ],

                  minimized:
                    true,
                },
              },
            })
          ),

      /* ===================================================
         RESTORE
      =================================================== */

      restoreApp:
        (
          appId
        ) =>
          set(
            (
              state
            ) => {
              if (
                !canAccessApp(
                  appId
                )
              ) {
                return state;
              }

              const newZIndex =
                state.topZIndex +
                1;

              return {
                activeApp:
                  appId,

                topZIndex:
                  newZIndex,

                windows: {
                  ...state.windows,

                  [appId]: {
                    ...state
                      .windows[
                      appId
                    ],

                    open: true,

                    minimized:
                      false,

                    zIndex:
                      newZIndex,
                  },
                },
              };
            }
          ),

      /* ===================================================
         MAXIMIZE
      =================================================== */

      toggleMaximize:
        (
          appId
        ) =>
          set(
            (
              state
            ) => {
              if (
                !canAccessApp(
                  appId
                )
              ) {
                return state;
              }

              const newZIndex =
                state.topZIndex +
                1;

              return {
                activeApp:
                  appId,

                topZIndex:
                  newZIndex,

                windows: {
                  ...state.windows,

                  [appId]: {
                    ...state
                      .windows[
                      appId
                    ],

                    maximized:
                      !state
                        .windows[
                        appId
                      ]
                        .maximized,

                    minimized:
                      false,

                    zIndex:
                      newZIndex,
                  },
                },
              };
            }
          ),

      /* ===================================================
         FOCUS
      =================================================== */

      focusApp:
        (
          appId
        ) =>
          set(
            (
              state
            ) => {
              if (
                !canAccessApp(
                  appId
                )
              ) {
                return state;
              }

              const newZIndex =
                state.topZIndex +
                1;

              return {
                activeApp:
                  appId,

                topZIndex:
                  newZIndex,

                windows: {
                  ...state.windows,

                  [appId]: {
                    ...state
                      .windows[
                      appId
                    ],

                    zIndex:
                      newZIndex,
                  },
                },
              };
            }
          ),

      /* ===================================================
         POSITION
      =================================================== */

      updateWindowPosition:
        (
          appId,
          position
        ) =>
          set(
            (
              state
            ) => ({
              windows: {
                ...state.windows,

                [appId]: {
                  ...state
                    .windows[
                    appId
                  ],

                  position,
                },
              },
            })
          ),

      /* ===================================================
         SIZE
      =================================================== */

      updateWindowSize:
        (
          appId,
          size
        ) =>
          set(
            (
              state
            ) => ({
              windows: {
                ...state.windows,

                [appId]: {
                  ...state
                    .windows[
                    appId
                  ],

                  size,
                },
              },
            })
          ),

      /* ===================================================
         WIFI OFF LOCK
      =================================================== */

      closeAllExceptSettings:
        () =>
          set(
            (
              state
            ) => {
              const newZIndex =
                state.topZIndex +
                1;

              const nextWindows: Record<
                AppId,
                WindowState
              > = {
                ...state.windows,
              };

              (
                Object.keys(
                  nextWindows
                ) as AppId[]
              ).forEach(
                (
                  appId
                ) => {
                  if (
                    appId ===
                    "settings"
                  ) {
                    nextWindows[
                      appId
                    ] = {
                      ...nextWindows[
                        appId
                      ],

                      open: true,

                      minimized:
                        false,

                      zIndex:
                        newZIndex,
                    };

                    return;
                  }

                  nextWindows[
                    appId
                  ] = {
                    ...nextWindows[
                      appId
                    ],

                    open: false,

                    minimized:
                      false,

                    maximized:
                      false,
                  };
                }
              );

              return {
                activeApp:
                  "settings",

                topZIndex:
                  newZIndex,

                windows:
                  nextWindows,
              };
            }
          ),
    })
  );