"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  createPortal,
} from "react-dom";

import {
  Power,
} from "lucide-react";

import {
  useOSStore,
} from "@/store/useOSStore";

import styles from "./AppleMenu.module.css";

type PowerDialog =
  | "restart"
  | "shutdown"
  | null;

export default function AppleMenu() {
  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [
    menuPosition,
    setMenuPosition,
  ] = useState({
    top: 35,
    left: 10,
  });

  const [
    sleeping,
    setSleeping,
  ] = useState(false);

  const [
    locked,
    setLocked,
  ] = useState(false);

  const [
    restarting,
    setRestarting,
  ] = useState(false);

  const [
    shutDown,
    setShutDown,
  ] = useState(false);

  const [
    dialog,
    setDialog,
  ] =
    useState<PowerDialog>(
      null
    );

  const [
    restartCountdown,
    setRestartCountdown,
  ] = useState(60);

  const [
    now,
    setNow,
  ] = useState(
    new Date()
  );

  const openApp =
    useOSStore(
      (state) =>
        state.openApp
    );

  /* =========================================================
     MOUNT
  ========================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =========================================================
     LIVE LOCK SCREEN CLOCK
  ========================================================= */

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setNow(
            new Date()
          );
        },
        1000
      );

    return () =>
      window.clearInterval(
        timer
      );
  }, []);

  /* =========================================================
     CONNECT TO EXISTING APPLE LOGO
  ========================================================= */

  useEffect(() => {
    if (
      !mounted
    ) {
      return;
    }

    const apple =
      document.querySelector(
        ".apple-logo"
      );

    if (
      !apple
    ) {
      return;
    }

    const handleAppleClick =
      (
        event: Event
      ) => {
        event.stopPropagation();

        const element =
          event.currentTarget as HTMLElement;

        const rect =
          element.getBoundingClientRect();

        setMenuPosition({
          top:
            rect.bottom +
            7,

          left:
            Math.max(
              10,
              rect.left - 7
            ),
        });

        setMenuOpen(
          (
            current
          ) =>
            !current
        );
      };

    const handleOutsideClick =
      () => {
        setMenuOpen(
          false
        );
      };

    apple.addEventListener(
      "click",
      handleAppleClick
    );

    document.addEventListener(
      "click",
      handleOutsideClick
    );

    return () => {
      apple.removeEventListener(
        "click",
        handleAppleClick
      );

      document.removeEventListener(
        "click",
        handleOutsideClick
      );
    };
  }, [
    mounted,
  ]);

  /* =========================================================
     SLEEP / LOCK / ESCAPE KEYBOARD BEHAVIOUR
  ========================================================= */

  useEffect(() => {
    const handleKeyDown =
      (
        event:
          KeyboardEvent
      ) => {
        /*
         * Sleep:
         * literally any key wakes ParamOS.
         */
        if (
          sleeping
        ) {
          event.preventDefault();

          setSleeping(
            false
          );

          return;
        }

        /*
         * Lock screen:
         * Return / Enter unlocks.
         */
        if (
          locked &&
          event.key ===
            "Enter"
        ) {
          event.preventDefault();

          setLocked(
            false
          );

          return;
        }

        /*
         * Escape closes temporary UI.
         */
        if (
          event.key ===
          "Escape"
        ) {
          setMenuOpen(
            false
          );

          setDialog(
            null
          );
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    sleeping,
    locked,
  ]);

  /* =========================================================
     RESTART DIALOG COUNTDOWN
  ========================================================= */

  useEffect(() => {
    if (
      dialog !==
      "restart"
    ) {
      setRestartCountdown(
        60
      );

      return;
    }

    const timer =
      window.setInterval(
        () => {
          setRestartCountdown(
            (
              current
            ) => {
              if (
                current <=
                1
              ) {
                window.clearInterval(
                  timer
                );

                setDialog(
                  null
                );

                return 60;
              }

              return (
                current -
                1
              );
            }
          );
        },
        1000
      );

    return () =>
      window.clearInterval(
        timer
      );
  }, [
    dialog,
  ]);

  /* =========================================================
     RESTART SEQUENCE
  ========================================================= */

  useEffect(() => {
    if (
      !restarting
    ) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          window.location.reload();
        },
        2100
      );

    return () =>
      window.clearTimeout(
        timer
      );
  }, [
    restarting,
  ]);

  /* =========================================================
     ACTIONS
  ========================================================= */

  const openSettings =
    () => {
      setMenuOpen(
        false
      );

      openApp(
        "settings"
      );
    };

  const sleep =
    () => {
      setMenuOpen(
        false
      );

      setSleeping(
        true
      );
    };

  const restart =
    () => {
      setMenuOpen(
        false
      );

      setRestartCountdown(
        60
      );

      setDialog(
        "restart"
      );
    };

  const confirmRestart =
    () => {
      setDialog(
        null
      );

      setRestarting(
        true
      );
    };

  const shutdown =
    () => {
      setMenuOpen(
        false
      );

      setDialog(
        "shutdown"
      );
    };

  const confirmShutdown =
    () => {
      setDialog(
        null
      );

      setShutDown(
        true
      );
    };

  const lock =
    () => {
      setMenuOpen(
        false
      );

      setNow(
        new Date()
      );

      setLocked(
        true
      );
    };

  const powerOn =
    () => {
      window.location.reload();
    };

  /* =========================================================
     DATE / TIME
  ========================================================= */

  const lockTime =
    now.toLocaleTimeString(
      "en-US",
      {
        hour:
          "numeric",

        minute:
          "2-digit",

        hour12:
          true,
      }
    );

  const lockDate =
    now.toLocaleDateString(
      "en-US",
      {
        weekday:
          "long",

        month:
          "long",

        day:
          "numeric",
      }
    );

  if (
    !mounted
  ) {
    return null;
  }

  return createPortal(
    <>

      {/* =====================================================
          APPLE MENU
      ===================================================== */}

      {menuOpen && (
        <div
          className={
            styles.appleMenu
          }
          style={{
            top:
              menuPosition
                .top,

            left:
              menuPosition
                .left,
          }}
          onClick={(
            event
          ) =>
            event.stopPropagation()
          }
        >

          <button
            onClick={
              openSettings
            }
          >
            About This Mac
          </button>

          <div
            className={
              styles.separator
            }
          />

          <button
            onClick={
              openSettings
            }
          >
            System Settings...
          </button>

          <div
            className={
              styles.separator
            }
          />

          <button
            onClick={
              sleep
            }
          >
            Sleep
          </button>

          <button
            onClick={
              restart
            }
          >
            Restart...
          </button>

          <button
            onClick={
              shutdown
            }
          >
            Shut Down...
          </button>

          <div
            className={
              styles.separator
            }
          />

          <button
            onClick={
              lock
            }
          >
            Lock Screen
          </button>

        </div>
      )}

      {/* =====================================================
          RESTART / SHUTDOWN DIALOG BACKDROP
      ===================================================== */}

      {dialog && (
        <div
          className={
            styles.dialogBackdrop
          }
        >

          <div
            className={
              styles.dialog
            }
          >

            <div
              className={
                styles.dialogApple
              }
            >
              
            </div>

            {dialog ===
              "restart" ? (
              <>
                <h2>
                  Are you sure you want to restart your computer now?
                </h2>

                <p>
                  This dialog will close automatically in{" "}
                  {restartCountdown}{" "}
                  {restartCountdown ===
                  1
                    ? "second"
                    : "seconds"}.
                </p>

                <button
                  className={
                    styles.primaryButton
                  }
                  onClick={
                    confirmRestart
                  }
                >
                  Restart
                </button>

                <button
                  className={
                    styles.secondaryButton
                  }
                  onClick={() =>
                    setDialog(
                      null
                    )
                  }
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2>
                  Are you sure you want to shut down your computer now?
                </h2>

                <p>
                  ParamOS will close this session.
                </p>

                <button
                  className={
                    styles.primaryButton
                  }
                  onClick={
                    confirmShutdown
                  }
                >
                  Shut Down
                </button>

                <button
                  className={
                    styles.secondaryButton
                  }
                  onClick={() =>
                    setDialog(
                      null
                    )
                  }
                >
                  Cancel
                </button>
              </>
            )}

          </div>

        </div>
      )}

      {/* =====================================================
          SLEEP
      ===================================================== */}

      {sleeping && (
        <div
          className={
            styles.sleepScreen
          }
        >

          <div
            className={
              styles.sleepMessage
            }
          >
            Press any key to wake :)
          </div>

        </div>
      )}

      {/* =====================================================
          RESTART BOOT SCREEN
      ===================================================== */}

      {restarting && (
        <div
          className={
            styles.restartScreen
          }
        >

          <div
            className={
              styles.bootApple
            }
          >
            
          </div>

          <div
            className={
              styles.progressTrack
            }
          >

            <div
              className={
                styles.progressFill
              }
            />

          </div>

        </div>
      )}

      {/* =====================================================
          LOCK SCREEN
      ===================================================== */}

      {locked && (
        <div
          className={
            styles.lockScreen
          }
        >

          <div
            className={
              styles.lockBackdrop
            }
          />

          <div
            className={
              styles.lockContent
            }
          >

            <div
              className={
                styles.lockDate
              }
            >
              {lockDate}
            </div>

            <div
              className={
                styles.lockTime
              }
            >
              {lockTime}
            </div>

            <div
              className={
                styles.lockUserArea
              }
            >

              <div
                className={
                  styles.lockAvatar
                }
              >
                PP
              </div>

              <div
                className={
                  styles.lockName
                }
              >
                Param Pathak
              </div>

              <div
                className={
                  styles.unlockBox
                }
              >

                <span>
                  Press Return to unlock
                </span>

                <button
                  onClick={() =>
                    setLocked(
                      false
                    )
                  }
                  aria-label="Unlock"
                >
                  →
                </button>

              </div>

              <div
                className={
                  styles.unlockHint
                }
              >
                Press Return to unlock
              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          SHUTDOWN
      ===================================================== */}

      {shutDown && (
        <div
          className={
            styles.shutdownScreen
          }
        >

          <button
            className={
              styles.powerButton
            }
            onClick={
              powerOn
            }
          >

            <Power
              size={30}
            />

          </button>

          <p>
            ParamOS is shut down
          </p>

          <span>
            Press the power button to start
          </span>

        </div>
      )}

    </>,
    document.body
  );
}