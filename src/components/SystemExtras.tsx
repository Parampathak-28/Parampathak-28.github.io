"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  createPortal,
} from "react-dom";

import {
  CloudSun,
  FileText,
  MessageCircle,
  Search,
  Sun,
  Cloud,
  CloudRain,
  Cloudy,
  X,
} from "lucide-react";

import {
  Rnd,
} from "react-rnd";

import {
  useOSStore,
} from "@/store/useOSStore";

import {
  useSettingsStore,
} from "@/store/useSettingsStore";

import styles from "./SystemExtras.module.css";

/* =========================================================
   TYPES
========================================================= */

type WeatherCity = {
  city: string;
  timezone: string;
  temperature: number;
  high: number;
  low: number;
  condition: string;
  theme:
    | "sand"
    | "blue"
    | "slate"
    | "warm";
};

type HourWeather = {
  time: string;
  temperature: number;
  condition:
    | "sun"
    | "cloud"
    | "rain";
};

type ForecastDay = {
  day: string;
  high: number;
  low: number;
  condition:
    | "sun"
    | "cloud"
    | "rain";
};

/* =========================================================
   WEATHER DATA
========================================================= */

const CITIES: WeatherCity[] = [
  {
    city: "Vadodara",
    timezone: "IST",
    temperature: 30,
    high: 33,
    low: 25,
    condition: "Partly Cloudy",
    theme: "sand",
  },
  {
    city: "Mumbai",
    timezone: "IST",
    temperature: 29,
    high: 31,
    low: 26,
    condition: "Cloudy",
    theme: "slate",
  },
  {
    city: "Bengaluru",
    timezone: "IST",
    temperature: 24,
    high: 28,
    low: 20,
    condition: "Partly Cloudy",
    theme: "blue",
  },
  {
    city: "Singapore",
    timezone: "SGT",
    temperature: 28,
    high: 31,
    low: 26,
    condition: "Rain",
    theme: "slate",
  },
  {
    city: "New York",
    timezone: "EDT",
    temperature: 27,
    high: 30,
    low: 22,
    condition: "Sunny",
    theme: "blue",
  },
  {
    city: "London",
    timezone: "BST",
    temperature: 18,
    high: 21,
    low: 13,
    condition: "Cloudy",
    theme: "slate",
  },
];

const HOURS: HourWeather[] = [
  {
    time: "Now",
    temperature: 30,
    condition: "cloud",
  },
  {
    time: "6 AM",
    temperature: 29,
    condition: "cloud",
  },
  {
    time: "7 AM",
    temperature: 29,
    condition: "cloud",
  },
  {
    time: "8 AM",
    temperature: 30,
    condition: "sun",
  },
  {
    time: "9 AM",
    temperature: 31,
    condition: "sun",
  },
  {
    time: "10 AM",
    temperature: 32,
    condition: "sun",
  },
  {
    time: "11 AM",
    temperature: 32,
    condition: "cloud",
  },
];

const FORECAST: ForecastDay[] = [
  {
    day: "Today",
    low: 25,
    high: 33,
    condition: "cloud",
  },
  {
    day: "Fri",
    low: 25,
    high: 32,
    condition: "rain",
  },
  {
    day: "Sat",
    low: 24,
    high: 32,
    condition: "cloud",
  },
  {
    day: "Sun",
    low: 24,
    high: 33,
    condition: "sun",
  },
  {
    day: "Mon",
    low: 25,
    high: 34,
    condition: "sun",
  },
  {
    day: "Tue",
    low: 25,
    high: 33,
    condition: "cloud",
  },
];

/* =========================================================
   MAIN
========================================================= */

export default function SystemExtras() {
  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    clockPanelOpen,
    setClockPanelOpen,
  ] = useState(false);

  const [
    clockPosition,
    setClockPosition,
  ] = useState({
    top: 40,
    right: 16,
  });

  const [
    weatherOpen,
    setWeatherOpen,
  ] = useState(false);

  const [
    readMeOpen,
    setReadMeOpen,
  ] = useState(false);

  const [
    selectedCity,
    setSelectedCity,
  ] = useState(
    CITIES[0]
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    now,
    setNow,
  ] = useState(
    new Date()
  );

  const clockPanelRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const openApp =
    useOSStore(
      (state) =>
        state.openApp
    );

  const wifiEnabled =
    useSettingsStore(
      (state) =>
        state.wifiEnabled
    );

  /* =========================================================
     MOUNT
  ========================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =========================================================
     CLOCK
  ========================================================= */

  useEffect(() => {
    const timer =
      window.setInterval(
        () =>
          setNow(
            new Date()
          ),
        1000
      );

    return () =>
      window.clearInterval(
        timer
      );
  }, []);

  /* =========================================================
     CONNECT TO EXISTING MENU-BAR CLOCK
  ========================================================= */

  useEffect(() => {
    if (
      !mounted
    ) {
      return;
    }

    const clock =
      document.querySelector(
        ".clock"
      );

    if (
      !clock
    ) {
      return;
    }

    const handleClockClick =
      (
        event: Event
      ) => {
        event.stopPropagation();

        if (
          !wifiEnabled
        ) {
          return;
        }

        const element =
          event.currentTarget as HTMLElement;

        const rect =
          element.getBoundingClientRect();

        setClockPosition({
          top:
            rect.bottom +
            7,

          right:
            Math.max(
              12,
              window.innerWidth -
                rect.right
            ),
        });

        setClockPanelOpen(
          (
            current
          ) =>
            !current
        );
      };

    clock.addEventListener(
      "click",
      handleClockClick
    );

    return () =>
      clock.removeEventListener(
        "click",
        handleClockClick
      );
  }, [
    mounted,
    wifiEnabled,
  ]);

  /* =========================================================
     DESKTOP README
  ========================================================= */

  useEffect(() => {
    if (
      !mounted
    ) {
      return;
    }

    const handleReadMe =
      (
        event: MouseEvent
      ) => {
        const target =
          event.target as HTMLElement;

        const desktopFile =
          target.closest(
            ".desktop-file"
          );

        if (
          !desktopFile
        ) {
          return;
        }

        if (
          !wifiEnabled
        ) {
          return;
        }

        /*
         * Prevent page.tsx's old handler from opening Notes.
         */
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        setReadMeOpen(
          true
        );
      };

    document.addEventListener(
      "dblclick",
      handleReadMe,
      true
    );

    return () =>
      document.removeEventListener(
        "dblclick",
        handleReadMe,
        true
      );
  }, [
    mounted,
    wifiEnabled,
  ]);

  /* =========================================================
     OUTSIDE CLICK FOR CLOCK PANEL
  ========================================================= */

  useEffect(() => {
    if (
      !clockPanelOpen
    ) {
      return;
    }

    const handleOutsideClick =
      (
        event:
          MouseEvent
      ) => {
        if (
          clockPanelRef.current &&
          !clockPanelRef.current.contains(
            event.target as Node
          )
        ) {
          setClockPanelOpen(
            false
          );
        }
      };

    window.setTimeout(
      () => {
        document.addEventListener(
          "mousedown",
          handleOutsideClick
        );
      },
      0
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, [
    clockPanelOpen,
  ]);

  /* =========================================================
     WIFI OFF
  ========================================================= */

  useEffect(() => {
    if (
      wifiEnabled
    ) {
      return;
    }

    setClockPanelOpen(
      false
    );

    setWeatherOpen(
      false
    );

    setReadMeOpen(
      false
    );
  }, [
    wifiEnabled,
  ]);

  const dateHeading =
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

  const filteredCities =
    CITIES.filter(
      (
        city
      ) =>
        city.city
          .toLowerCase()
          .includes(
            search
              .trim()
              .toLowerCase()
          )
    );

  if (
    !mounted
  ) {
    return null;
  }

  return createPortal(
    <>

      {/* =====================================================
          CLOCK / NOTIFICATION PANEL
      ===================================================== */}

      {clockPanelOpen && (
        <div
          ref={
            clockPanelRef
          }
          className={
            styles.clockPanel
          }
          style={{
            top:
              clockPosition
                .top,

            right:
              clockPosition
                .right,
          }}
        >

          <div
            className={
              styles.clockDate
            }
          >
            {dateHeading}
          </div>

          <div
            className={
              styles.clockSeparator
            }
          />

          <button
            className={
              styles.clockRow
            }
            onClick={() => {
              setClockPanelOpen(
                false
              );

              setWeatherOpen(
                true
              );
            }}
          >

            <CloudSun
              size={20}
            />

            <div>

              <strong>
                Weather
              </strong>

              <span>
                Open forecast
              </span>

            </div>

            <span
              className={
                styles.rowChevron
              }
            >
              ›
            </span>

          </button>

          <button
            className={
              styles.clockRow
            }
            onClick={() => {
              setClockPanelOpen(
                false
              );

              openApp(
                "messages"
              );
            }}
          >

            <MessageCircle
              size={20}
            />

            <div>

              <strong>
                Messages
              </strong>

              <span>
                Open conversations
              </span>

            </div>

            <span
              className={
                styles.rowChevron
              }
            >
              ›
            </span>

          </button>

        </div>
      )}

      {/* =====================================================
          WEATHER WINDOW
      ===================================================== */}

      {weatherOpen && (
        <Rnd
          default={{
            x: 115,
            y: 70,
            width: 1040,
            height: 690,
          }}
          minWidth={760}
          minHeight={520}
          bounds=".desktop"
          dragHandleClassName={
            styles.weatherTitleBar
          }
          className={
            styles.weatherWindow
          }
          style={{
            zIndex:
              900000,
          }}
        >

          <div
            className={
              styles.weatherShell
            }
          >

            <aside
              className={
                styles.weatherSidebar
              }
            >

              <div
                className={
                  styles.weatherTitleBar
                }
              >

                <div
                  className={
                    styles.trafficLights
                  }
                >

                  <button
                    className={
                      `${styles.trafficLight} ${styles.red}`
                    }
                    onClick={() =>
                      setWeatherOpen(
                        false
                      )
                    }
                    aria-label="Close Weather"
                  />

                  <span
                    className={
                      `${styles.trafficLight} ${styles.yellow}`
                    }
                  />

                  <span
                    className={
                      `${styles.trafficLight} ${styles.green}`
                    }
                  />

                </div>

              </div>

              <div
                className={
                  styles.weatherSearch
                }
              >

                <Search
                  size={17}
                />

                <input
                  value={
                    search
                  }
                  onChange={(
                    event
                  ) =>
                    setSearch(
                      event
                        .target
                        .value
                    )
                  }
                  placeholder="Search cities"
                />

              </div>

              <div
                className={
                  styles.cityList
                }
              >

                {filteredCities.map(
                  (
                    city
                  ) => (
                    <button
                      key={
                        city.city
                      }
                      className={
                        `${styles.cityCard} ${styles[
                          `city_${city.theme}`
                        ]} ${
                          selectedCity.city ===
                          city.city
                            ? styles.citySelected
                            : ""
                        }`
                      }
                      onClick={() =>
                        setSelectedCity(
                          city
                        )
                      }
                    >

                      <div>

                        <strong>
                          {city.city}
                        </strong>

                        <span>
                          {city.timezone}
                        </span>

                        <p>
                          {city.condition}
                        </p>

                      </div>

                      <div
                        className={
                          styles.cityTemperature
                        }
                      >
                        {city.temperature}°
                      </div>

                      <div
                        className={
                          styles.cityRange
                        }
                      >
                        H:{city.high}° L:{city.low}°
                      </div>

                    </button>
                  )
                )}

              </div>

            </aside>

            <main
              className={
                `${styles.weatherContent} ${styles[
                  `weather_${selectedCity.theme}`
                ]}`
              }
            >

              <button
                className={
                  styles.mobileClose
                }
                onClick={() =>
                  setWeatherOpen(
                    false
                  )
                }
              >

                <X
                  size={18}
                />

              </button>

              <div
                className={
                  styles.weatherHero
                }
              >

                <h1>
                  {selectedCity.city}
                </h1>

                <div
                  className={
                    styles.heroTemperature
                  }
                >
                  {selectedCity.temperature}°
                </div>

                <div
                  className={
                    styles.heroCondition
                  }
                >

                  <WeatherIcon
                    condition={
                      selectedCity.condition
                    }
                  />

                  {selectedCity.condition}

                </div>

                <div
                  className={
                    styles.heroRange
                  }
                >
                  H:{selectedCity.high}° L:{selectedCity.low}°
                </div>

              </div>

              <div
                className={
                  styles.weatherCard
                }
              >
                Comfortable conditions through the morning, with changing cloud cover later in the day.
              </div>

              <section
                className={
                  styles.weatherCard
                }
              >

                <h3>
                  HOURLY FORECAST
                </h3>

                <div
                  className={
                    styles.hourly
                  }
                >

                  {HOURS.map(
                    (
                      hour
                    ) => (
                      <div
                        key={
                          hour.time
                        }
                        className={
                          styles.hour
                        }
                      >

                        <span>
                          {hour.time}
                        </span>

                        <ForecastIcon
                          condition={
                            hour.condition
                          }
                        />

                        <strong>
                          {hour.temperature}°
                        </strong>

                      </div>
                    )
                  )}

                </div>

              </section>

              <section
                className={
                  styles.weatherCard
                }
              >

                <h3>
                  6-DAY FORECAST
                </h3>

                <div
                  className={
                    styles.dailyForecast
                  }
                >

                  {FORECAST.map(
                    (
                      day
                    ) => (
                      <div
                        key={
                          day.day
                        }
                        className={
                          styles.forecastRow
                        }
                      >

                        <strong>
                          {day.day}
                        </strong>

                        <ForecastIcon
                          condition={
                            day.condition
                          }
                        />

                        <span>
                          {day.low}°
                        </span>

                        <div
                          className={
                            styles.temperatureBar
                          }
                        >
                          <span />
                        </div>

                        <span>
                          {day.high}°
                        </span>

                      </div>
                    )
                  )}

                </div>

              </section>

            </main>

          </div>

        </Rnd>
      )}

      {/* =====================================================
          README WINDOW
      ===================================================== */}

      {readMeOpen && (
        <Rnd
          default={{
            x: 135,
            y: 85,
            width: 900,
            height: 610,
          }}
          minWidth={620}
          minHeight={430}
          bounds=".desktop"
          dragHandleClassName={
            styles.readmeTitlebar
          }
          className={
            styles.readmeWindow
          }
          style={{
            zIndex:
              900001,
          }}
        >

          <div
            className={
              styles.readmeShell
            }
          >

            <header
              className={
                styles.readmeTitlebar
              }
            >

              <div
                className={
                  styles.trafficLights
                }
              >

                <button
                  className={
                    `${styles.trafficLight} ${styles.red}`
                  }
                  onClick={() =>
                    setReadMeOpen(
                      false
                    )
                  }
                  aria-label="Close read-me.txt"
                />

                <span
                  className={
                    `${styles.trafficLight} ${styles.yellow}`
                  }
                />

                <span
                  className={
                    `${styles.trafficLight} ${styles.green}`
                  }
                />

              </div>

              <div
                className={
                  styles.readmeTitle
                }
              >
                read-me.txt
              </div>

            </header>

            <main
              className={
                styles.readmeBody
              }
            >

              <div
                className={
                  styles.readmePaper
                }
              >

                <FileText
                  className={
                    styles.readmeDocumentIcon
                  }
                  size={25}
                />

                <p>
                  hello — you found the control room.
                </p>

                <p>
                  this portfolio is less of a webpage and more of a small operating system built around the things i work on, think about, and occasionally disappear into.
                </p>

                <p>
                  a few good places to start:
                </p>

                <ul>

                  <li>
                    <span>
                      Research Lens
                    </span>{" "}
                    is the quickest route through my papers, ideas, evidence, and open questions
                  </li>

                  <li>
                    <span>
                      Notes
                    </span>{" "}
                    has the longer version of my work, experience, and research interests
                  </li>

                  <li>
                    <span>
                      Terminal
                    </span>{" "}
                    is for people who would rather type{" "}
                    <code>
                      help
                    </code>{" "}
                    than click around
                  </li>

                  <li>
                    <span>
                      Music & Photos
                    </span>{" "}
                    are the less academic corners of this place
                  </li>

                  <li>
                    <span>
                      System Settings
                    </span>{" "}
                    actually changes ParamOS — and yes, turning Wi-Fi off has consequences :)
                  </li>

                </ul>

                <p>
                  there are a few small surprises hidden around the desktop. poke around.
                </p>

                <p
                  className={
                    styles.readmeSignature
                  }
                >
                  — Param
                </p>

              </div>

            </main>

          </div>

        </Rnd>
      )}

    </>,
    document.body
  );
}

/* =========================================================
   WEATHER ICONS
========================================================= */

function WeatherIcon({
  condition,
}: {
  condition:
    string;
}) {
  if (
    condition
      .toLowerCase()
      .includes(
        "rain"
      )
  ) {
    return (
      <CloudRain
        size={26}
      />
    );
  }

  if (
    condition
      .toLowerCase()
      .includes(
        "cloud"
      )
  ) {
    return (
      <CloudSun
        size={26}
      />
    );
  }

  return (
    <Sun
      size={26}
    />
  );
}

function ForecastIcon({
  condition,
}: {
  condition:
    "sun"
    | "cloud"
    | "rain";
}) {
  if (
    condition ===
    "rain"
  ) {
    return (
      <CloudRain
        size={22}
      />
    );
  }

  if (
    condition ===
    "cloud"
  ) {
    return (
      <Cloudy
        size={22}
      />
    );
  }

  return (
    <Sun
      size={22}
    />
  );
}