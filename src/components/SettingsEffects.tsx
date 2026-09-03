"use client";

import {
  useEffect,
} from "react";

import {
  useSettingsStore,
} from "@/store/useSettingsStore";

import AppleMenu from "@/components/AppleMenu";
import SystemExtras from "@/components/SystemExtras";

import styles from "./SettingsEffects.module.css";

const ACCENT_COLORS = {
  blue: "#0a84ff",
  purple: "#bf5af2",
  pink: "#ff375f",
  red: "#ff453a",
  orange: "#ff9f0a",
  yellow: "#ffd60a",
  green: "#30d158",
  graphite: "#8e8e93",
};

/* =========================================================
   SETTINGS EFFECTS
========================================================= */

export default function SettingsEffects() {
  const appearance =
    useSettingsStore(
      (state) =>
        state.appearance
    );

  const accentColor =
    useSettingsStore(
      (state) =>
        state.accentColor
    );

  const dockSize =
    useSettingsStore(
      (state) =>
        state.dockSize
    );

  const dockMagnification =
    useSettingsStore(
      (state) =>
        state.dockMagnification
    );

  const showRunningIndicators =
    useSettingsStore(
      (state) =>
        state.showRunningIndicators
    );

  const showDockTooltips =
    useSettingsStore(
      (state) =>
        state.showDockTooltips
    );

  const windowAnimations =
    useSettingsStore(
      (state) =>
        state.windowAnimations
    );

  const reduceMotion =
    useSettingsStore(
      (state) =>
        state.reduceMotion
    );

  const increaseContrast =
    useSettingsStore(
      (state) =>
        state.increaseContrast
    );

  const reduceTransparency =
    useSettingsStore(
      (state) =>
        state.reduceTransparency
    );

  const largerText =
    useSettingsStore(
      (state) =>
        state.largerText
    );

  /* =======================================================
     APPEARANCE — LIGHT / DARK / AUTO
  ======================================================= */

  useEffect(() => {
    const root =
      document.documentElement;

    const media =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const applyTheme =
      () => {
        const resolved =
          appearance ===
          "auto"
            ? media.matches
              ? "dark"
              : "light"
            : appearance;

        root.setAttribute(
          "data-paramos-theme",
          resolved
        );

        root.style.colorScheme =
          resolved;
      };

    applyTheme();

    if (
      appearance ===
      "auto"
    ) {
      media.addEventListener(
        "change",
        applyTheme
      );
    }

    return () => {
      media.removeEventListener(
        "change",
        applyTheme
      );
    };
  }, [
    appearance,
  ]);

  /* =======================================================
     ACCENT COLOR
  ======================================================= */

  useEffect(() => {
    const root =
      document.documentElement;

    const color =
      ACCENT_COLORS[
        accentColor
      ];

    root.style.setProperty(
      "--paramos-accent",
      color
    );

    root.setAttribute(
      "data-paramos-accent",
      accentColor
    );
  }, [
    accentColor,
  ]);

  /* =======================================================
     DOCK SIZE
  ======================================================= */

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--paramos-dock-scale",
      String(
        dockSize
      )
    );
  }, [
    dockSize,
  ]);

  /* =======================================================
     OTHER SETTINGS
  ======================================================= */

  useEffect(() => {
    const root =
      document.documentElement;

    root.setAttribute(
      "data-dock-magnification",
      dockMagnification
        ? "on"
        : "off"
    );

    root.setAttribute(
      "data-running-indicators",
      showRunningIndicators
        ? "on"
        : "off"
    );

    root.setAttribute(
      "data-dock-tooltips",
      showDockTooltips
        ? "on"
        : "off"
    );

    root.setAttribute(
      "data-window-animations",
      windowAnimations
        ? "on"
        : "off"
    );

    root.setAttribute(
      "data-reduce-motion",
      reduceMotion
        ? "on"
        : "off"
    );

    root.setAttribute(
      "data-increase-contrast",
      increaseContrast
        ? "on"
        : "off"
    );

    root.setAttribute(
      "data-reduce-transparency",
      reduceTransparency
        ? "on"
        : "off"
    );

    root.setAttribute(
      "data-larger-text",
      largerText
        ? "on"
        : "off"
    );
  }, [
    dockMagnification,
    showRunningIndicators,
    showDockTooltips,
    windowAnimations,
    reduceMotion,
    increaseContrast,
    reduceTransparency,
    largerText,
  ]);

  /* =======================================================
     GLOBAL PARAMOS EXTRAS
  ======================================================= */

  return (
    <>
      <AppleMenu />

      <SystemExtras />

      <span
        className={
          styles.bridge
        }
        aria-hidden="true"
      />
    </>
  );
}