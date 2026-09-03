"use client";

import {
  useMemo,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  Accessibility,
  Bluetooth,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Gauge,
  HardDrive,
  Info,
  Laptop,
  MonitorCog,
  RefreshCw,
  Search,
  Settings2,
  SlidersHorizontal,
  Wifi,
} from "lucide-react";

import {
  useSettingsStore,
} from "@/store/useSettingsStore";

import {
  useOSStore,
} from "@/store/useOSStore";

import type {
  AccentColor,
  AppearanceMode,
} from "@/store/useSettingsStore";

import styles from "./SettingsApp.module.css";

/* =========================================================
   TYPES
========================================================= */

type SettingsSection =
  | "wifi"
  | "bluetooth"
  | "general"
  | "appearance"
  | "desktop"
  | "accessibility";

type GeneralPage =
  | "main"
  | "about"
  | "update"
  | "storage";

/* =========================================================
   DATA
========================================================= */

const NAV_ITEMS: {
  id: SettingsSection;
  label: string;
  icon:
    | "wifi"
    | "bluetooth"
    | "general"
    | "appearance"
    | "desktop"
    | "accessibility";
}[] = [
  {
    id: "wifi",
    label: "Wi-Fi",
    icon: "wifi",
  },
  {
    id: "bluetooth",
    label: "Bluetooth",
    icon: "bluetooth",
  },
  {
    id: "general",
    label: "General",
    icon: "general",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: "appearance",
  },
  {
    id: "desktop",
    label: "Desktop & Dock",
    icon: "desktop",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    icon: "accessibility",
  },
];

const ACCENTS: {
  id: AccentColor;
  label: string;
  className: string;
}[] = [
  {
    id: "blue",
    label: "Blue",
    className: styles.accentBlue,
  },
  {
    id: "purple",
    label: "Purple",
    className: styles.accentPurple,
  },
  {
    id: "pink",
    label: "Pink",
    className: styles.accentPink,
  },
  {
    id: "red",
    label: "Red",
    className: styles.accentRed,
  },
  {
    id: "orange",
    label: "Orange",
    className: styles.accentOrange,
  },
  {
    id: "yellow",
    label: "Yellow",
    className: styles.accentYellow,
  },
  {
    id: "green",
    label: "Green",
    className: styles.accentGreen,
  },
  {
    id: "graphite",
    label: "Graphite",
    className: styles.accentGraphite,
  },
];

/* =========================================================
   MAIN
========================================================= */

export default function SettingsApp() {
  const [
    section,
    setSection,
  ] =
    useState<SettingsSection>(
      "general"
    );

  const [
    generalPage,
    setGeneralPage,
  ] =
    useState<GeneralPage>(
      "main"
    );

  const [
    search,
    setSearch,
  ] =
    useState("");

  const settings =
    useSettingsStore();

  const closeAllExceptSettings =
    useOSStore(
      (state) =>
        state.closeAllExceptSettings
    );

  const filteredNavigation =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (
        !query
      ) {
        return NAV_ITEMS;
      }

      return NAV_ITEMS.filter(
        (
          item
        ) =>
          item.label
            .toLowerCase()
            .includes(
              query
            )
      );
    }, [
      search,
    ]);

  const selectSection =
    (
      nextSection:
        SettingsSection
    ) => {
      setSection(
        nextSection
      );

      if (
        nextSection ===
        "general"
      ) {
        setGeneralPage(
          "main"
        );
      }
    };

  const title =
    section ===
      "general" &&
    generalPage !==
      "main"
      ? generalPage ===
        "about"
        ? "About"
        : generalPage ===
          "update"
          ? "Software Update"
          : "Storage"
      : NAV_ITEMS.find(
          (
            item
          ) =>
            item.id ===
            section
        )?.label ??
        "Settings";

  const handleWifiChange =
    (
      enabled: boolean
    ) => {
      settings.setWifiEnabled(
        enabled
      );

      if (
        !enabled
      ) {
        closeAllExceptSettings();
      }
    };

  return (
    <div
      className={
        styles.app
      }
    >

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={
          styles.sidebar
        }
      >

        <div
          className={
            styles.searchBox
          }
        >

          <Search
            size={15}
          />

          <input
            value={search}
            onChange={(
              event
            ) =>
              setSearch(
                event
                  .target
                  .value
              )
            }
            placeholder="Search"
          />

        </div>

        <div
          className={
            styles.profile
          }
        >

          <div
            className={
              styles.avatar
            }
          >
            PP
          </div>

          <div>

            <strong>
              Param Pathak
            </strong>

            <span>
              ParamOS Account
            </span>

          </div>

        </div>

        <nav
          className={
            styles.navigation
          }
        >

          {filteredNavigation.map(
            (
              item
            ) => (
              <button
                key={
                  item.id
                }
                className={
                  `${styles.navItem} ${
                    section ===
                    item.id
                      ? styles.navItemActive
                      : ""
                  }`
                }
                onClick={() =>
                  selectSection(
                    item.id
                  )
                }
              >

                <NavIcon
                  type={
                    item.icon
                  }
                />

                <span>
                  {item.label}
                </span>

              </button>
            )
          )}

        </nav>

        <div
          className={
            styles.sidebarFooter
          }
        >
          ParamOS 1.0
        </div>

      </aside>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <section
        className={
          styles.content
        }
      >

        <header
          className={
            styles.toolbar
          }
        >

          <div
            className={
              styles.toolbarNavigation
            }
          >

            <button
              onClick={() => {
                if (
                  section ===
                    "general" &&
                  generalPage !==
                    "main"
                ) {
                  setGeneralPage(
                    "main"
                  );
                }
              }}
            >

              <ChevronLeft
                size={20}
              />

            </button>

            <button
              disabled
            >

              <ChevronRight
                size={20}
              />

            </button>

          </div>

          <h1>
            {title}
          </h1>

        </header>

        <div
          className={
            styles.page
          }
        >

          {section ===
            "wifi" && (
            <WifiPage
              enabled={
                settings
                  .wifiEnabled
              }
              setEnabled={
                handleWifiChange
              }
            />
          )}

          {section ===
            "bluetooth" && (
            <BluetoothPage
              enabled={
                settings
                  .bluetoothEnabled
              }
              setEnabled={
                settings
                  .setBluetoothEnabled
              }
            />
          )}

          {section ===
            "general" && (
            <GeneralContent
              page={
                generalPage
              }
              setPage={
                setGeneralPage
              }
            />
          )}

          {section ===
            "appearance" && (
            <AppearancePage
              appearance={
                settings
                  .appearance
              }
              setAppearance={
                settings
                  .setAppearance
              }
              accentColor={
                settings
                  .accentColor
              }
              setAccentColor={
                settings
                  .setAccentColor
              }
            />
          )}

          {section ===
            "desktop" && (
            <DesktopDockPage />
          )}

          {section ===
            "accessibility" && (
            <AccessibilityPage />
          )}

        </div>

      </section>

    </div>
  );
}

/* =========================================================
   NAV ICON
========================================================= */

function NavIcon({
  type,
}: {
  type:
    | "wifi"
    | "bluetooth"
    | "general"
    | "appearance"
    | "desktop"
    | "accessibility";
}) {
  const content =
    type ===
    "wifi" ? (
      <Wifi
        size={16}
      />
    ) : type ===
      "bluetooth" ? (
      <Bluetooth
        size={16}
      />
    ) : type ===
      "general" ? (
      <Settings2
        size={16}
      />
    ) : type ===
      "appearance" ? (
      <SlidersHorizontal
        size={16}
      />
    ) : type ===
      "desktop" ? (
      <MonitorCog
        size={16}
      />
    ) : (
      <Accessibility
        size={16}
      />
    );

  return (
    <div
      className={
        `${styles.navIcon} ${styles[
          `navIcon_${type}`
        ]}`
      }
    >
      {content}
    </div>
  );
}

/* =========================================================
   WIFI
========================================================= */

function WifiPage({
  enabled,
  setEnabled,
}: {
  enabled: boolean;

  setEnabled:
    (
      value: boolean
    ) => void;
}) {
  return (
    <div
      className={
        styles.settingsPage
      }
    >

      <SettingsCard>

        <div
          className={
            styles.primarySetting
          }
        >

          <div
            className={
              styles.settingIdentity
            }
          >

            <div
              className={
                `${styles.largeIcon} ${styles.blueIcon}`
              }
            >

              <Wifi
                size={21}
              />

            </div>

            <strong>
              Wi-Fi
            </strong>

          </div>

          <Toggle
            value={
              enabled
            }
            onChange={
              setEnabled
            }
          />

        </div>

      </SettingsCard>

      {enabled && (
        <>
          <SectionLabel>
            KNOWN NETWORK
          </SectionLabel>

          <SettingsCard>

            <SettingRow
              icon={
                <Wifi
                  size={18}
                />
              }
              label="Param Network"
              value="Connected"
            />

          </SettingsCard>

          <p
            className={
              styles.blueText
            }
          >
            Portfolio connectivity is online.
          </p>
        </>
      )}

      {!enabled && (
        <EmptyMessage>
          Wi-Fi is turned off. ParamOS apps are unavailable until Wi-Fi is turned back on.
        </EmptyMessage>
      )}

    </div>
  );
}

/* =========================================================
   BLUETOOTH
========================================================= */

function BluetoothPage({
  enabled,
  setEnabled,
}: {
  enabled: boolean;

  setEnabled:
    (
      value: boolean
    ) => void;
}) {
  return (
    <div
      className={
        styles.settingsPage
      }
    >

      <SettingsCard>

        <div
          className={
            styles.primarySetting
          }
        >

          <div
            className={
              styles.settingIdentity
            }
          >

            <div
              className={
                `${styles.largeIcon} ${styles.blueIcon}`
              }
            >

              <Bluetooth
                size={21}
              />

            </div>

            <strong>
              Bluetooth
            </strong>

          </div>

          <Toggle
            value={
              enabled
            }
            onChange={
              setEnabled
            }
          />

        </div>

      </SettingsCard>

      {enabled && (
        <>
          <SectionLabel>
            MY DEVICES
          </SectionLabel>

          <SettingsCard>

            <SettingRow
              label="Param's AirPods"
              value="Connected"
            />

            <SettingRow
              label="Magic Keyboard"
              value="Not Connected"
            />

          </SettingsCard>
        </>
      )}

      {!enabled && (
        <EmptyMessage>
          Bluetooth is turned off.
        </EmptyMessage>
      )}

    </div>
  );
}

/* =========================================================
   GENERAL
========================================================= */

function GeneralContent({
  page,
  setPage,
}: {
  page:
    GeneralPage;

  setPage:
    (
      page:
        GeneralPage
    ) => void;
}) {
  if (
    page ===
    "about"
  ) {
    return (
      <AboutPage />
    );
  }

  if (
    page ===
    "update"
  ) {
    return (
      <SoftwareUpdatePage />
    );
  }

  if (
    page ===
    "storage"
  ) {
    return (
      <StoragePage />
    );
  }

  return (
    <div
      className={
        styles.settingsPage
      }
    >

      <div
        className={
          styles.generalGrid
        }
      >

        <GeneralTile
          icon={
            <Info
              size={23}
            />
          }
          title="About"
          description="Information about ParamOS and this portfolio."
          onClick={() =>
            setPage(
              "about"
            )
          }
        />

        <GeneralTile
          icon={
            <RefreshCw
              size={23}
            />
          }
          title="Software Update"
          description="Check the current ParamOS build."
          onClick={() =>
            setPage(
              "update"
            )
          }
        />

        <GeneralTile
          icon={
            <HardDrive
              size={23}
            />
          }
          title="Storage"
          description="See how the portfolio is organized."
          onClick={() =>
            setPage(
              "storage"
            )
          }
        />

        <GeneralTile
          icon={
            <Code2
              size={23}
            />
          }
          title="Developer"
          description="Next.js, React, TypeScript and Zustand."
        />

      </div>

    </div>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function AboutPage() {
  return (
    <div
      className={
        styles.settingsPage
      }
    >

      <SettingsCard>

        <div
          className={
            styles.deviceCard
          }
        >

          <div
            className={
              styles.deviceIcon
            }
          >

            <Laptop
              size={42}
            />

          </div>

          <div>

            <h2>
              ParamOS
            </h2>

            <p>
              Param Pathak&apos;s interactive research portfolio
            </p>

          </div>

        </div>

      </SettingsCard>

      <SettingsCard>

        <SettingRow
          label="Owner"
          value="Param Pathak"
        />

        <SettingRow
          label="Role"
          value="AI Research Associate"
        />

        <SettingRow
          label="Primary Focus"
          value="Reinforcement Learning"
        />

        <SettingRow
          label="Research"
          value="RL · Quant Finance · QML"
        />

        <SettingRow
          label="Selected Works"
          value="9"
        />

      </SettingsCard>

      <SettingsCard>

        <SettingRow
          label="ParamOS"
          value="1.0"
        />

        <SettingRow
          label="Framework"
          value="Next.js"
        />

        <SettingRow
          label="Interface"
          value="React + TypeScript"
        />

        <SettingRow
          label="State"
          value="Zustand"
        />

      </SettingsCard>

    </div>
  );
}

/* =========================================================
   SOFTWARE UPDATE
========================================================= */

function SoftwareUpdatePage() {
  return (
    <div
      className={
        styles.settingsPage
      }
    >

      <SettingsCard>

        <div
          className={
            styles.updateCard
          }
        >

          <div
            className={
              styles.checkIcon
            }
          >

            <Check
              size={27}
              strokeWidth={3}
            />

          </div>

          <div>

            <h2>
              ParamOS is up to date
            </h2>

            <p>
              ParamOS 1.0
            </p>

          </div>

        </div>

      </SettingsCard>

      <SettingsCard>

        <SettingRow
          label="Build"
          value="2026.09"
        />

        <SettingRow
          label="Environment"
          value="Portfolio"
        />

        <SettingRow
          label="Status"
          value="All systems operational"
        />

      </SettingsCard>

    </div>
  );
}

/* =========================================================
   STORAGE
========================================================= */

function StoragePage() {
  return (
    <div
      className={
        styles.settingsPage
      }
    >

      <div
        className={
          styles.storageHeader
        }
      >

        <strong>
          ParamOS
        </strong>

        <span>
          Portfolio space
        </span>

      </div>

      <div
        className={
          styles.storageBar
        }
      >

        <span
          className={
            styles.storageResearch
          }
        />

        <span
          className={
            styles.storageApps
          }
        />

        <span
          className={
            styles.storageMedia
          }
        />

        <span
          className={
            styles.storageSystem
          }
        />

      </div>

      <SettingsCard>

        <StorageRow
          className={
            styles.storageResearchDot
          }
          label="Research"
          value="9 works"
        />

        <StorageRow
          className={
            styles.storageAppsDot
          }
          label="Applications"
          value="9 apps"
        />

        <StorageRow
          className={
            styles.storageMediaDot
          }
          label="Photos & Music"
          value="Personal"
        />

        <StorageRow
          className={
            styles.storageSystemDot
          }
          label="ParamOS"
          value="System"
        />

      </SettingsCard>

    </div>
  );
}

/* =========================================================
   APPEARANCE
========================================================= */

function AppearancePage({
  appearance,
  setAppearance,
  accentColor,
  setAccentColor,
}: {
  appearance:
    AppearanceMode;

  setAppearance:
    (
      value:
        AppearanceMode
    ) => void;

  accentColor:
    AccentColor;

  setAccentColor:
    (
      value:
        AccentColor
    ) => void;
}) {
  return (
    <div
      className={
        styles.settingsPage
      }
    >

      <div
        className={
          styles.pageIntro
        }
      >

        <div
          className={
            styles.appearanceHeroIcon
          }
        >

          <SlidersHorizontal
            size={31}
          />

        </div>

        <h2>
          Appearance
        </h2>

        <p>
          Customize the look and feel of ParamOS.
        </p>

      </div>

      <SectionLabel>
        APPEARANCE
      </SectionLabel>

      <div
        className={
          styles.appearanceGrid
        }
      >

        <AppearanceOption
          label="Auto"
          mode="auto"
          selected={
            appearance ===
            "auto"
          }
          onClick={() =>
            setAppearance(
              "auto"
            )
          }
        />

        <AppearanceOption
          label="Light"
          mode="light"
          selected={
            appearance ===
            "light"
          }
          onClick={() =>
            setAppearance(
              "light"
            )
          }
        />

        <AppearanceOption
          label="Dark"
          mode="dark"
          selected={
            appearance ===
            "dark"
          }
          onClick={() =>
            setAppearance(
              "dark"
            )
          }
        />

      </div>

      <SectionLabel>
        ACCENT COLOR
      </SectionLabel>

      <SettingsCard>

        <div
          className={
            styles.accentRow
          }
        >

          {ACCENTS.map(
            (
              accent
            ) => (
              <button
                key={
                  accent.id
                }
                title={
                  accent.label
                }
                className={
                  `${styles.accentButton} ${accent.className} ${
                    accentColor ===
                    accent.id
                      ? styles.accentSelected
                      : ""
                  }`
                }
                onClick={() =>
                  setAccentColor(
                    accent.id
                  )
                }
              >

                {accentColor ===
                  accent.id && (
                  <Check
                    size={13}
                  />
                )}

              </button>
            )
          )}

        </div>

      </SettingsCard>

    </div>
  );
}

/* =========================================================
   DESKTOP & DOCK
========================================================= */

function DesktopDockPage() {
  const settings =
    useSettingsStore();

  return (
    <div
      className={
        styles.settingsPage
      }
    >

      <SectionLabel>
        DOCK
      </SectionLabel>

      <SettingsCard>

        <SliderRow
          label="Dock Size"
          value={
            settings
              .dockSize
          }
          onChange={
            settings
              .setDockSize
          }
        />

        <ToggleRow
          label="Magnification"
          description="Enlarge Dock icons when the pointer moves over them."
          value={
            settings
              .dockMagnification
          }
          onChange={
            settings
              .setDockMagnification
          }
        />

        <ToggleRow
          label="Show indicators for open applications"
          value={
            settings
              .showRunningIndicators
          }
          onChange={
            settings
              .setShowRunningIndicators
          }
        />

        <ToggleRow
          label="Show application names"
          description="Display labels above Dock icons."
          value={
            settings
              .showDockTooltips
          }
          onChange={
            settings
              .setShowDockTooltips
          }
        />

      </SettingsCard>

      <SectionLabel>
        WINDOWS & MENU BAR
      </SectionLabel>

      <SettingsCard>

        <ToggleRow
          label="Animate opening applications"
          value={
            settings
              .windowAnimations
          }
          onChange={
            settings
              .setWindowAnimations
          }
        />

        <ToggleRow
          label="Show seconds in menu bar clock"
          value={
            settings
              .menuBarSeconds
          }
          onChange={
            settings
              .setMenuBarSeconds
          }
        />

      </SettingsCard>

    </div>
  );
}

/* =========================================================
   ACCESSIBILITY
========================================================= */

function AccessibilityPage() {
  const settings =
    useSettingsStore();

  return (
    <div
      className={
        styles.settingsPage
      }
    >

      <div
        className={
          styles.pageIntro
        }
      >

        <div
          className={
            styles.accessibilityHeroIcon
          }
        >

          <Accessibility
            size={31}
          />

        </div>

        <h2>
          Accessibility
        </h2>

        <p>
          Adjust ParamOS for a more comfortable experience.
        </p>

      </div>

      <SectionLabel>
        DISPLAY
      </SectionLabel>

      <SettingsCard>

        <ToggleRow
          label="Reduce Motion"
          description="Use fewer interface animations."
          value={
            settings
              .reduceMotion
          }
          onChange={
            settings
              .setReduceMotion
          }
        />

        <ToggleRow
          label="Increase Contrast"
          description="Increase separation between interface elements."
          value={
            settings
              .increaseContrast
          }
          onChange={
            settings
              .setIncreaseContrast
          }
        />

        <ToggleRow
          label="Reduce Transparency"
          description="Replace translucent surfaces with solid backgrounds."
          value={
            settings
              .reduceTransparency
          }
          onChange={
            settings
              .setReduceTransparency
          }
        />

        <ToggleRow
          label="Larger Interface Text"
          value={
            settings
              .largerText
          }
          onChange={
            settings
              .setLargerText
          }
        />

      </SettingsCard>

      <button
        className={
          styles.resetButton
        }
        onClick={
          settings
            .resetSettings
        }
      >
        Restore Default Settings
      </button>

    </div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function SettingsCard({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <div
      className={
        styles.card
      }
    >
      {children}
    </div>
  );
}

function SectionLabel({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <div
      className={
        styles.sectionLabel
      }
    >
      {children}
    </div>
  );
}

function SettingRow({
  icon,
  label,
  value,
}: {
  icon?:
    ReactNode;

  label: string;

  value: string;
}) {
  return (
    <div
      className={
        styles.settingRow
      }
    >

      <div
        className={
          styles.settingRowLabel
        }
      >

        {icon}

        <span>
          {label}
        </span>

      </div>

      <span
        className={
          styles.settingValue
        }
      >
        {value}
      </span>

    </div>
  );
}

function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;

  description?: string;

  value: boolean;

  onChange:
    (
      value:
        boolean
    ) => void;
}) {
  return (
    <div
      className={
        styles.toggleRow
      }
    >

      <div>

        <strong>
          {label}
        </strong>

        {description && (
          <p>
            {description}
          </p>
        )}

      </div>

      <Toggle
        value={
          value
        }
        onChange={
          onChange
        }
      />

    </div>
  );
}

function Toggle({
  value,
  onChange,
}: {
  value: boolean;

  onChange:
    (
      value:
        boolean
    ) => void;
}) {
  return (
    <button
      className={
        `${styles.toggle} ${
          value
            ? styles.toggleOn
            : ""
        }`
      }
      onClick={() =>
        onChange(
          !value
        )
      }
      aria-pressed={
        value
      }
    >

      <span />

    </button>
  );
}

function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string;

  value: number;

  onChange:
    (
      value:
        number
    ) => void;
}) {
  return (
    <div
      className={
        styles.sliderRow
      }
    >

      <div>

        <strong>
          {label}
        </strong>

        <span>
          Small
        </span>

      </div>

      <input
        type="range"
        min={0.8}
        max={1.25}
        step={0.05}
        value={
          value
        }
        onChange={(
          event
        ) =>
          onChange(
            Number(
              event
                .target
                .value
            )
          )
        }
      />

      <span>
        Large
      </span>

    </div>
  );
}

function AppearanceOption({
  label,
  mode,
  selected,
  onClick,
}: {
  label: string;

  mode:
    AppearanceMode;

  selected: boolean;

  onClick:
    () => void;
}) {
  return (
    <button
      className={
        `${styles.appearanceOption} ${
          selected
            ? styles.appearanceOptionSelected
            : ""
        }`
      }
      onClick={
        onClick
      }
    >

      <div
        className={
          `${styles.appearancePreview} ${
            mode ===
            "dark"
              ? styles.previewDark
              : mode ===
                  "light"
                ? styles.previewLight
                : styles.previewAuto
          }`
        }
      >

        <span />

        <span />

      </div>

      <strong>
        {label}
      </strong>

    </button>
  );
}

function GeneralTile({
  icon,
  title,
  description,
  onClick,
}: {
  icon:
    ReactNode;

  title: string;

  description: string;

  onClick?:
    () => void;
}) {
  return (
    <button
      className={
        styles.generalTile
      }
      onClick={
        onClick
      }
    >

      <div
        className={
          styles.generalTileIcon
        }
      >
        {icon}
      </div>

      <div>

        <strong>
          {title}
        </strong>

        <p>
          {description}
        </p>

      </div>

      {onClick && (
        <ChevronRight
          size={17}
        />
      )}

    </button>
  );
}

function StorageRow({
  className,
  label,
  value,
}: {
  className:
    string;

  label:
    string;

  value:
    string;
}) {
  return (
    <div
      className={
        styles.settingRow
      }
    >

      <div
        className={
          styles.storageLabel
        }
      >

        <span
          className={
            `${styles.storageDot} ${className}`
          }
        />

        {label}

      </div>

      <span
        className={
          styles.settingValue
        }
      >
        {value}
      </span>

    </div>
  );
}

function EmptyMessage({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <div
      className={
        styles.emptyMessage
      }
    >

      <Gauge
        size={31}
      />

      <p>
        {children}
      </p>

    </div>
  );
}