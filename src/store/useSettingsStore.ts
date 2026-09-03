import { create } from "zustand";

export type AppearanceMode =
  | "auto"
  | "light"
  | "dark";

export type AccentColor =
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "graphite";

type SettingsStore = {
  /* =======================================================
     APPEARANCE
  ======================================================= */

  appearance: AppearanceMode;

  accentColor: AccentColor;

  /* =======================================================
     DESKTOP & DOCK
  ======================================================= */

  dockSize: number;

  dockMagnification: boolean;

  showRunningIndicators: boolean;

  showDockTooltips: boolean;

  windowAnimations: boolean;

  menuBarSeconds: boolean;

  /* =======================================================
     ACCESSIBILITY
  ======================================================= */

  reduceMotion: boolean;

  increaseContrast: boolean;

  reduceTransparency: boolean;

  largerText: boolean;

  /* =======================================================
     CONNECTIVITY
  ======================================================= */

  wifiEnabled: boolean;

  bluetoothEnabled: boolean;

  /* =======================================================
     SETTERS
  ======================================================= */

  setAppearance: (
    appearance: AppearanceMode
  ) => void;

  setAccentColor: (
    accentColor: AccentColor
  ) => void;

  setDockSize: (
    dockSize: number
  ) => void;

  setDockMagnification: (
    dockMagnification: boolean
  ) => void;

  setShowRunningIndicators: (
    showRunningIndicators: boolean
  ) => void;

  setShowDockTooltips: (
    showDockTooltips: boolean
  ) => void;

  setWindowAnimations: (
    windowAnimations: boolean
  ) => void;

  setMenuBarSeconds: (
    menuBarSeconds: boolean
  ) => void;

  setReduceMotion: (
    reduceMotion: boolean
  ) => void;

  setIncreaseContrast: (
    increaseContrast: boolean
  ) => void;

  setReduceTransparency: (
    reduceTransparency: boolean
  ) => void;

  setLargerText: (
    largerText: boolean
  ) => void;

  setWifiEnabled: (
    wifiEnabled: boolean
  ) => void;

  setBluetoothEnabled: (
    bluetoothEnabled: boolean
  ) => void;

  resetSettings: () => void;
};

/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const DEFAULT_SETTINGS = {
  appearance:
    "dark" as AppearanceMode,

  accentColor:
    "blue" as AccentColor,

  dockSize: 1,

  dockMagnification: true,

  showRunningIndicators: true,

  showDockTooltips: true,

  windowAnimations: true,

  menuBarSeconds: true,

  reduceMotion: false,

  increaseContrast: false,

  reduceTransparency: false,

  largerText: false,

  wifiEnabled: true,

  bluetoothEnabled: true,
};

/* =========================================================
   STORE
========================================================= */

export const useSettingsStore =
  create<SettingsStore>(
    (set) => ({
      ...DEFAULT_SETTINGS,

      /* ===================================================
         APPEARANCE
      =================================================== */

      setAppearance:
        (
          appearance
        ) =>
          set({
            appearance,
          }),

      setAccentColor:
        (
          accentColor
        ) =>
          set({
            accentColor,
          }),

      /* ===================================================
         DESKTOP & DOCK
      =================================================== */

      setDockSize:
        (
          dockSize
        ) =>
          set({
            dockSize,
          }),

      setDockMagnification:
        (
          dockMagnification
        ) =>
          set({
            dockMagnification,
          }),

      setShowRunningIndicators:
        (
          showRunningIndicators
        ) =>
          set({
            showRunningIndicators,
          }),

      setShowDockTooltips:
        (
          showDockTooltips
        ) =>
          set({
            showDockTooltips,
          }),

      setWindowAnimations:
        (
          windowAnimations
        ) =>
          set({
            windowAnimations,
          }),

      setMenuBarSeconds:
        (
          menuBarSeconds
        ) =>
          set({
            menuBarSeconds,
          }),

      /* ===================================================
         ACCESSIBILITY
      =================================================== */

      setReduceMotion:
        (
          reduceMotion
        ) =>
          set({
            reduceMotion,
          }),

      setIncreaseContrast:
        (
          increaseContrast
        ) =>
          set({
            increaseContrast,
          }),

      setReduceTransparency:
        (
          reduceTransparency
        ) =>
          set({
            reduceTransparency,
          }),

      setLargerText:
        (
          largerText
        ) =>
          set({
            largerText,
          }),

      /* ===================================================
         CONNECTIVITY
      =================================================== */

      setWifiEnabled:
        (
          wifiEnabled
        ) =>
          set({
            wifiEnabled,
          }),

      setBluetoothEnabled:
        (
          bluetoothEnabled
        ) =>
          set({
            bluetoothEnabled,
          }),

      /* ===================================================
         RESET
      =================================================== */

      resetSettings:
        () =>
          set({
            ...DEFAULT_SETTINGS,
          }),
    })
  );