"use client";

import type {
  ReactNode,
} from "react";

import { Rnd } from "react-rnd";

import {
  AppId,
  useOSStore,
} from "@/store/useOSStore";

type MacWindowProps = {
  appId: AppId;

  title: string;

  children: ReactNode;

  minWidth?: number;

  minHeight?: number;

  className?: string;
};

export default function MacWindow({
  appId,
  title,
  children,
  minWidth = 600,
  minHeight = 400,
  className = "",
}: MacWindowProps) {
  const windowState =
    useOSStore(
      (state) => state.windows[appId]
    );

  const closeApp =
    useOSStore(
      (state) => state.closeApp
    );

  const minimizeApp =
    useOSStore(
      (state) => state.minimizeApp
    );

  const toggleMaximize =
    useOSStore(
      (state) => state.toggleMaximize
    );

  const focusApp =
    useOSStore(
      (state) => state.focusApp
    );

  const updateWindowPosition =
    useOSStore(
      (state) =>
        state.updateWindowPosition
    );

  const updateWindowSize =
    useOSStore(
      (state) =>
        state.updateWindowSize
    );

  if (
    !windowState.open ||
    windowState.minimized
  ) {
    return null;
  }

  const windowPosition =
    windowState.maximized
      ? {
          x: 12,
          y: 42,
        }
      : windowState.position;

  const windowSize =
    windowState.maximized
      ? {
          width:
            "calc(100vw - 24px)",

          height:
            "calc(100vh - 105px)",
        }
      : {
          width:
            windowState.size.width,

          height:
            windowState.size.height,
        };

  return (
    <Rnd
      position={windowPosition}
      size={windowSize}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds=".desktop"
      dragHandleClassName="mac-window-toolbar"
      cancel="
        .traffic-lights,
        button,
        input,
        textarea,
        select,
        a
      "
      disableDragging={
        windowState.maximized
      }
      enableResizing={
        !windowState.maximized
      }
      style={{
        zIndex:
          windowState.zIndex,
      }}
      className="mac-window-rnd"
      onMouseDown={() =>
        focusApp(appId)
      }
      onDragStart={() =>
        focusApp(appId)
      }
      onDragStop={(
        _event,
        data
      ) => {
        if (
          windowState.maximized
        ) {
          return;
        }

        updateWindowPosition(
          appId,
          {
            x: data.x,
            y: data.y,
          }
        );
      }}
      onResizeStart={() =>
        focusApp(appId)
      }
      onResizeStop={(
        _event,
        _direction,
        ref,
        _delta,
        position
      ) => {
        if (
          windowState.maximized
        ) {
          return;
        }

        updateWindowSize(
          appId,
          {
            width:
              ref.offsetWidth,

            height:
              ref.offsetHeight,
          }
        );

        updateWindowPosition(
          appId,
          {
            x: position.x,

            y: position.y,
          }
        );
      }}
    >
      <section
        className={`mac-window ${className}`}
        onMouseDown={() =>
          focusApp(appId)
        }
      >
        {/* =====================================
            WINDOW TOOLBAR
        ====================================== */}

        <header
          className="mac-window-toolbar"
          onDoubleClick={() =>
            toggleMaximize(appId)
          }
        >
          {/* ===================================
              TRAFFIC LIGHTS
          ==================================== */}

          <div className="traffic-lights">
            <button
              type="button"
              className="
                traffic-button
                traffic-red
              "
              aria-label={`Close ${title}`}
              onClick={() =>
                closeApp(appId)
              }
            />

            <button
              type="button"
              className="
                traffic-button
                traffic-yellow
              "
              aria-label={`Minimize ${title}`}
              onClick={() =>
                minimizeApp(appId)
              }
            />

            <button
              type="button"
              className="
                traffic-button
                traffic-green
              "
              aria-label={`Maximize ${title}`}
              onClick={() =>
                toggleMaximize(appId)
              }
            />
          </div>

          {/* ===================================
              WINDOW TITLE
          ==================================== */}

          <div className="mac-window-title">
            {title}
          </div>

          <div className="mac-window-toolbar-spacer" />
        </header>

        {/* =====================================
            WINDOW CONTENT
        ====================================== */}

        <div className="mac-window-content">
          {children}
        </div>
      </section>
    </Rnd>
  );
}