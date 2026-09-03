"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Clock3,
  Disc3,
  ExternalLink,
  Heart,
  ListMusic,
  MoreHorizontal,
  Pause,
  Play,
  Radio,
  Repeat2,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

import styles from "./MusicApp.module.css";

/* =========================================================
   YOUTUBE TYPES
========================================================= */

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (videoId: string) => void;
  cueVideoById: (videoId: string) => void;
  seekTo: (
    seconds: number,
    allowSeekAhead?: boolean
  ) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
};

type YouTubeEvent = {
  data: number;
  target: YouTubePlayer;
};

type YouTubeNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<
        string,
        number | string
      >;
      events?: {
        onReady?: (
          event: {
            target: YouTubePlayer;
          }
        ) => void;

        onStateChange?: (
          event: YouTubeEvent
        ) => void;

        onError?: (
          event: YouTubeEvent
        ) => void;
      };
    }
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeNamespace;

    onYouTubeIframeAPIReady?:
      () => void;
  }
}

/* =========================================================
   TRACK DATA
========================================================= */

type Track = {
  id: number;
  title: string;
  artist: string;
  youtubeId: string;
  mood: string;
};

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Let It Be",
    artist: "Music Travel Love",
    youtubeId: "KzqoSeVMGrQ",
    mood: "Acoustic",
  },

  {
    id: 2,
    title: "It Takes A Thief",
    artist: "Thievery Corporation",
    youtubeId: "d1LH72XpJzg",
    mood: "Downtempo",
  },

  {
    id: 3,
    title: "The Forgotten People",
    artist: "Thievery Corporation",
    youtubeId: "MaURaThDS5g",
    mood: "Downtempo",
  },

  {
    id: 4,
    title: "Lebanese Blonde",
    artist: "Thievery Corporation",
    youtubeId: "zNhHhtJ1reM",
    mood: "Trip Hop",
  },

  {
    id: 5,
    title: "Un Simple Histoire",
    artist: "Thievery Corporation",
    youtubeId: "sCoeuDvwUFk",
    mood: "Downtempo",
  },

  {
    id: 6,
    title: "21.40",
    artist: "Gagan Kooner",
    youtubeId: "GdxOoS54wMI",
    mood: "Punjabi",
  },

  {
    id: 7,
    title: "25 Freestyle",
    artist: "Gagan Kooner",
    youtubeId: "bVsIh1dmOzU",
    mood: "Punjabi",
  },

  {
    id: 8,
    title: "NARI NARI NARI",
    artist: "Saint Levant",
    youtubeId: "3OyT5uonEHk",
    mood: "Arabic",
  },

  {
    id: 9,
    title: "Boushret Khair",
    artist: "Hussain Al Jassmi",
    youtubeId: "QUBvVTNRp4Q",
    mood: "Arabic",
  },

  {
    id: 10,
    title: "Didi",
    artist: "Khaled",
    youtubeId: "tTcnIYYeZI8",
    mood: "Raï",
  },

  {
  id: 11,
  title: "Tip Tip Barsa Pani",
  artist: "Udit Narayan & Alka Yagnik",
  youtubeId: "9u-r5W4WVO4",
  mood: "Bollywood",
},
];

/* =========================================================
   HELPERS
========================================================= */

function formatTime(
  seconds: number
) {
  if (
    !Number.isFinite(
      seconds
    ) ||
    seconds < 0
  ) {
    return "0:00";
  }

  const minutes =
    Math.floor(
      seconds / 60
    );

  const remaining =
    Math.floor(
      seconds % 60
    );

  return `${minutes}:${remaining
    .toString()
    .padStart(
      2,
      "0"
    )}`;
}

function getThumbnail(
  youtubeId: string
) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function MusicApp() {
  const playerMountRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const playerRef =
    useRef<YouTubePlayer | null>(
      null
    );

  const selectedIndexRef =
    useRef(0);

  const pendingPlayRef =
    useRef(false);

  const [
    selectedIndex,
    setSelectedIndex,
  ] =
    useState(0);

  const [
    isPlaying,
    setIsPlaying,
  ] =
    useState(false);

  const [
    currentTime,
    setCurrentTime,
  ] =
    useState(0);

  const [
    duration,
    setDuration,
  ] =
    useState(0);

  const [
    volume,
    setVolume,
  ] =
    useState(70);

  const [
    muted,
    setMuted,
  ] =
    useState(false);

  const [
    favorites,
    setFavorites,
  ] =
    useState<number[]>([
      1,
      4,
      8,
    ]);

  const [
    searchTerm,
    setSearchTerm,
  ] =
    useState("");

  const [
    shuffleEnabled,
    setShuffleEnabled,
  ] =
    useState(false);

  const [
    repeatEnabled,
    setRepeatEnabled,
  ] =
    useState(false);

  const [
    playerError,
    setPlayerError,
  ] =
    useState(false);

  const currentTrack =
    TRACKS[
      selectedIndex
    ];

  useEffect(() => {
    selectedIndexRef.current =
      selectedIndex;
  }, [
    selectedIndex,
  ]);

  /* =======================================================
     PLAYER INITIALIZATION
  ======================================================= */

  useEffect(() => {
    let cancelled =
      false;

    const initializePlayer =
      () => {
        if (
          cancelled ||
          !playerMountRef.current ||
          !window.YT
        ) {
          return;
        }

        if (
          playerRef.current
        ) {
          return;
        }

        playerRef.current =
          new window.YT.Player(
            playerMountRef.current,
            {
              videoId:
                TRACKS[
                  selectedIndexRef.current
                ].youtubeId,

              playerVars: {
                autoplay: 0,
                controls: 0,
                rel: 0,
                playsinline: 1,
                modestbranding: 1,
                fs: 0,
              },

              events: {
                onReady: (
                  event
                ) => {
                  event.target.setVolume(
                    volume
                  );

                  setDuration(
                    event.target.getDuration()
                  );

                  if (
                    pendingPlayRef.current
                  ) {
                    event.target.playVideo();

                    pendingPlayRef.current =
                      false;
                  }
                },

                onStateChange: (
                  event
                ) => {
                  if (
                    event.data === 1
                  ) {
                    setIsPlaying(
                      true
                    );

                    setPlayerError(
                      false
                    );

                    setDuration(
                      event.target.getDuration()
                    );
                  }

                  if (
                    event.data ===
                      2 ||
                    event.data ===
                      5
                  ) {
                    setIsPlaying(
                      false
                    );
                  }

                  if (
                    event.data === 0
                  ) {
                    handleEnded();
                  }
                },

                onError: () => {
                  setPlayerError(
                    true
                  );

                  setIsPlaying(
                    false
                  );
                },
              },
            }
          );
      };

    if (
      window.YT?.Player
    ) {
      initializePlayer();
    } else {
      const existingScript =
        document.getElementById(
          "youtube-iframe-api"
        );

      window.onYouTubeIframeAPIReady =
        initializePlayer;

      if (
        !existingScript
      ) {
        const script =
          document.createElement(
            "script"
          );

        script.id =
          "youtube-iframe-api";

        script.src =
          "https://www.youtube.com/iframe_api";

        document.body.appendChild(
          script
        );
      }
    }

    return () => {
      cancelled =
        true;

      if (
        playerRef.current
      ) {
        playerRef.current.destroy();

        playerRef.current =
          null;
      }
    };
  }, []);

  /* =======================================================
     PLAYER CLOCK
  ======================================================= */

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          const player =
            playerRef.current;

          if (
            !player ||
            typeof player.getCurrentTime !== "function" ||
            typeof player.getDuration !== "function"
          ) {
            return;
          }

          try {
            const time =
              player.getCurrentTime();

            const total =
              player.getDuration();

            if (
              Number.isFinite(
                time
              )
            ) {
              setCurrentTime(
                time
              );
            }

            if (
              Number.isFinite(
                total
              ) &&
              total > 0
            ) {
              setDuration(
                total
              );
            }
          } catch {
            // YouTube player may still be initializing.
            // The next polling cycle will try again.
          }
        },
        500
      );

    return () =>
      window.clearInterval(
        timer
      );
  }, []);

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredTracks =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      if (
        !query
      ) {
        return TRACKS;
      }

      return TRACKS.filter(
        (
          track
        ) =>
          track.title
            .toLowerCase()
            .includes(
              query
            ) ||
          track.artist
            .toLowerCase()
            .includes(
              query
            ) ||
          track.mood
            .toLowerCase()
            .includes(
              query
            )
      );
    }, [
      searchTerm,
    ]);

  /* =======================================================
     PLAYBACK
  ======================================================= */

  const playTrack =
    (
      index: number
    ) => {
      const track =
        TRACKS[
          index
        ];

      selectedIndexRef.current =
        index;

      setSelectedIndex(
        index
      );

      setCurrentTime(
        0
      );

      setDuration(
        0
      );

      setPlayerError(
        false
      );

      if (
        playerRef.current
      ) {
        playerRef.current.loadVideoById(
          track.youtubeId
        );

        setIsPlaying(
          true
        );
      } else {
        pendingPlayRef.current =
          true;
      }
    };

  const togglePlayback =
    () => {
      const player =
        playerRef.current;

      if (
        !player
      ) {
        pendingPlayRef.current =
          true;

        return;
      }

      if (
        isPlaying
      ) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    };

  const goToPrevious =
    () => {
      const current =
        selectedIndexRef.current;

      let nextIndex =
        current - 1;

      if (
        nextIndex < 0
      ) {
        nextIndex =
          TRACKS.length - 1;
      }

      playTrack(
        nextIndex
      );
    };

  const chooseNextIndex =
    () => {
      if (
        shuffleEnabled
      ) {
        if (
          TRACKS.length <= 1
        ) {
          return 0;
        }

        let randomIndex =
          selectedIndexRef.current;

        while (
          randomIndex ===
          selectedIndexRef.current
        ) {
          randomIndex =
            Math.floor(
              Math.random() *
                TRACKS.length
            );
        }

        return randomIndex;
      }

      return (
        selectedIndexRef.current +
        1
      ) %
        TRACKS.length;
    };

  const goToNext =
    () => {
      playTrack(
        chooseNextIndex()
      );
    };

  const handleEnded =
    () => {
      const player =
        playerRef.current;

      if (
        repeatEnabled &&
        player
      ) {
        player.seekTo(
          0,
          true
        );

        player.playVideo();

        return;
      }

      const nextIndex =
        shuffleEnabled
          ? (() => {
              let index =
                selectedIndexRef.current;

              while (
                index ===
                selectedIndexRef.current
              ) {
                index =
                  Math.floor(
                    Math.random() *
                      TRACKS.length
                  );
              }

              return index;
            })()
          : (
              selectedIndexRef.current +
              1
            ) %
              TRACKS.length;

      selectedIndexRef.current =
        nextIndex;

      setSelectedIndex(
        nextIndex
      );

      setCurrentTime(
        0
      );

      setDuration(
        0
      );

      setPlayerError(
        false
      );

      player?.loadVideoById(
        TRACKS[
          nextIndex
        ].youtubeId
      );
    };

  const seek =
    (
      value: number
    ) => {
      setCurrentTime(
        value
      );

      playerRef.current?.seekTo(
        value,
        true
      );
    };

  const updateVolume =
    (
      value: number
    ) => {
      setVolume(
        value
      );

      const player =
        playerRef.current;

      player?.setVolume(
        value
      );

      if (
        value > 0 &&
        muted
      ) {
        player?.unMute();

        setMuted(
          false
        );
      }
    };

  const toggleMute =
    () => {
      const player =
        playerRef.current;

      if (
        !player
      ) {
        return;
      }

      if (
        muted
      ) {
        player.unMute();

        setMuted(
          false
        );
      } else {
        player.mute();

        setMuted(
          true
        );
      }
    };

  const toggleFavorite =
    (
      id: number
    ) => {
      setFavorites(
        (
          current
        ) =>
          current.includes(
            id
          )
            ? current.filter(
                (
                  item
                ) =>
                  item !==
                  id
              )
            : [
                ...current,
                id,
              ]
      );
    };

  const openOnYouTube =
    () => {
      window.open(
        `https://www.youtube.com/watch?v=${currentTrack.youtubeId}`,
        "_blank",
        "noopener,noreferrer"
      );
    };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className={styles.app}>

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside className={styles.sidebar}>

        <div className={styles.sidebarTitle}>
          Music
        </div>

        <nav className={styles.sidebarNav}>

          <button className={styles.navActive}>

            <Disc3
              size={17}
            />

            Listen Now

          </button>

          <button>

            <Radio
              size={17}
            />

            Radio

          </button>

          <div className={styles.navHeading}>
            LIBRARY
          </div>

          <button>

            <Clock3
              size={17}
            />

            Recently Played

          </button>

          <button>

            <ListMusic
              size={17}
            />

            Songs

          </button>

          <button>

            <Heart
              size={17}
            />

            Favourites

          </button>

        </nav>

        <div className={styles.sidebarBottom}>

          <span>
            PARAM&apos;S MUSIC
          </span>

          <p>
            11 tracks
          </p>

        </div>

      </aside>

      {/* ===================================================
          LIBRARY
      =================================================== */}

      <section className={styles.library}>

        <div className={styles.libraryHeader}>

          <div>

            <span className={styles.eyebrow}>
              PARAM&apos;S ROTATION
            </span>

            <h1>
              Listen Now
            </h1>

          </div>

          <div className={styles.searchBox}>

            <Search
              size={15}
            />

            <input
              value={
                searchTerm
              }
              onChange={(
                event
              ) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search"
            />

          </div>

        </div>

        <div className={styles.hero}>

          <div className={styles.heroContent}>

            <span className={styles.heroLabel}>
              PERSONAL STATION
            </span>

            <h2>
              Somewhere between downtempo, Punjab, Beirut and Bombay.
            </h2>

            <p>
              A small collection of songs I keep coming back to.
            </p>

            <button
              onClick={() =>
                playTrack(
                  0
                )
              }
            >

              <Play
                size={15}
                fill="currentColor"
              />

              Play

            </button>

          </div>

          <div className={styles.heroArtwork}>

            <div className={styles.heroDisc}>

              <div />

            </div>

            <span>
              P
            </span>

          </div>

        </div>

        <div className={styles.sectionHeading}>

          <div>

            <h2>
              Songs
            </h2>

            <p>
              {filteredTracks.length} tracks
            </p>

          </div>

        </div>

        <div className={styles.trackTable}>

          <div className={styles.trackTableHeader}>

            <span>
              #
            </span>

            <span>
              TITLE
            </span>

            <span>
              VIBE
            </span>

            <span />

          </div>

          <div className={styles.trackList}>

            {filteredTracks.map(
              (
                track
              ) => {
                const actualIndex =
                  TRACKS.findIndex(
                    (
                      item
                    ) =>
                      item.id ===
                      track.id
                  );

                const active =
                  actualIndex ===
                  selectedIndex;

                const favorite =
                  favorites.includes(
                    track.id
                  );

                return (
                  <div
                    key={
                      track.id
                    }
                    className={
                      `${styles.trackRow} ${
                        active
                          ? styles.trackRowActive
                          : ""
                      }`
                    }
                  >

                    <button
                      className={styles.trackPlay}
                      onClick={() =>
                        active
                          ? togglePlayback()
                          : playTrack(
                              actualIndex
                            )
                      }
                      aria-label={
                        active &&
                        isPlaying
                          ? "Pause"
                          : "Play"
                      }
                    >

                      {active &&
                      isPlaying ? (
                        <Pause
                          size={14}
                          fill="currentColor"
                        />
                      ) : (
                        <Play
                          size={14}
                          fill="currentColor"
                        />
                      )}

                    </button>

                    <button
                      className={styles.trackIdentity}
                      onClick={() =>
                        playTrack(
                          actualIndex
                        )
                      }
                    >

                      <img
                        src={getThumbnail(
                          track.youtubeId
                        )}
                        alt=""
                      />

                      <span>

                        <strong>
                          {track.title}
                        </strong>

                        <small>
                          {track.artist}
                        </small>

                      </span>

                    </button>

                    <span className={styles.trackMood}>
                      {track.mood}
                    </span>

                    <div className={styles.trackActions}>

                      <button
                        className={
                          favorite
                            ? styles.favoriteActive
                            : ""
                        }
                        onClick={() =>
                          toggleFavorite(
                            track.id
                          )
                        }
                        aria-label="Favourite"
                      >

                        <Heart
                          size={15}
                          fill={
                            favorite
                              ? "currentColor"
                              : "none"
                          }
                        />

                      </button>

                      <button
                        aria-label="More"
                      >

                        <MoreHorizontal
                          size={17}
                        />

                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          NOW PLAYING
      =================================================== */}

      <aside className={styles.nowPlaying}>

        <div className={styles.nowPlayingHeader}>

          <span>
            Now Playing
          </span>

          <button
            onClick={
              openOnYouTube
            }
            title="Open on YouTube"
          >

            <ExternalLink
              size={15}
            />

          </button>

        </div>

        <div className={styles.videoCard}>

          <div
            ref={
              playerMountRef
            }
            className={styles.youtubePlayer}
          />

          {playerError && (
            <div className={styles.playerError}>

              <p>
                This video cannot be played inside the site.
              </p>

              <button
                onClick={
                  openOnYouTube
                }
              >
                Open on YouTube
              </button>

            </div>
          )}

        </div>

        <div className={styles.nowPlayingMeta}>

          <div>

            <h2>
              {currentTrack.title}
            </h2>

            <p>
              {currentTrack.artist}
            </p>

          </div>

          <button
            className={
              favorites.includes(
                currentTrack.id
              )
                ? styles.favoriteActive
                : ""
            }
            onClick={() =>
              toggleFavorite(
                currentTrack.id
              )
            }
          >

            <Heart
              size={18}
              fill={
                favorites.includes(
                  currentTrack.id
                )
                  ? "currentColor"
                  : "none"
              }
            />

          </button>

        </div>

        <div className={styles.progressArea}>

          <input
            type="range"
            min={0}
            max={
              duration > 0
                ? duration
                : 1
            }
            step={0.1}
            value={
              Math.min(
                currentTime,
                duration ||
                  1
              )
            }
            onChange={(
              event
            ) =>
              seek(
                Number(
                  event.target.value
                )
              )
            }
            className={styles.progress}
          />

          <div className={styles.timeLabels}>

            <span>
              {formatTime(
                currentTime
              )}
            </span>

            <span>
              {duration
                ? `-${formatTime(
                    Math.max(
                      duration -
                        currentTime,
                      0
                    )
                  )}`
                : "0:00"}
            </span>

          </div>

        </div>

        <div className={styles.mainControls}>

          <button
            className={
              shuffleEnabled
                ? styles.controlActive
                : ""
            }
            onClick={() =>
              setShuffleEnabled(
                (
                  current
                ) =>
                  !current
              )
            }
            aria-label="Shuffle"
          >

            <Shuffle
              size={16}
            />

          </button>

          <button
            onClick={
              goToPrevious
            }
            aria-label="Previous"
          >

            <SkipBack
              size={21}
              fill="currentColor"
            />

          </button>

          <button
            className={styles.playButton}
            onClick={
              togglePlayback
            }
            aria-label={
              isPlaying
                ? "Pause"
                : "Play"
            }
          >

            {isPlaying ? (
              <Pause
                size={23}
                fill="currentColor"
              />
            ) : (
              <Play
                size={23}
                fill="currentColor"
              />
            )}

          </button>

          <button
            onClick={
              goToNext
            }
            aria-label="Next"
          >

            <SkipForward
              size={21}
              fill="currentColor"
            />

          </button>

          <button
            className={
              repeatEnabled
                ? styles.controlActive
                : ""
            }
            onClick={() =>
              setRepeatEnabled(
                (
                  current
                ) =>
                  !current
              )
            }
            aria-label="Repeat"
          >

            <Repeat2
              size={16}
            />

          </button>

        </div>

        <div className={styles.volumeArea}>

          <button
            onClick={
              toggleMute
            }
          >

            {muted ||
            volume ===
              0 ? (
              <VolumeX
                size={16}
              />
            ) : (
              <Volume2
                size={16}
              />
            )}

          </button>

          <input
            type="range"
            min={0}
            max={100}
            value={
              volume
            }
            onChange={(
              event
            ) =>
              updateVolume(
                Number(
                  event.target.value
                )
              )
            }
          />

        </div>

        <div className={styles.queue}>

          <div className={styles.queueHeading}>

            <span>
              Up Next
            </span>

            <ListMusic
              size={14}
            />

          </div>

          {[
            1,
            2,
            3,
          ].map(
            (
              offset
            ) => {
              const index =
                (
                  selectedIndex +
                  offset
                ) %
                TRACKS.length;

              const track =
                TRACKS[
                  index
                ];

              return (
                <button
                  key={
                    `${track.id}-${offset}`
                  }
                  className={styles.queueItem}
                  onClick={() =>
                    playTrack(
                      index
                    )
                  }
                >

                  <img
                    src={getThumbnail(
                      track.youtubeId
                    )}
                    alt=""
                  />

                  <span>

                    <strong>
                      {track.title}
                    </strong>

                    <small>
                      {track.artist}
                    </small>

                  </span>

                </button>
              );
            }
          )}

        </div>

        <div className={styles.youtubeNote}>
          Playback via YouTube
        </div>

      </aside>

    </div>
  );
}