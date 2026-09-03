"use client";

import {
  useMemo,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Heart,
  Image as ImageIcon,
  Info,
  Maximize2,
  PanelLeft,
  Search,
  Share2,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

import styles from "./PhotosApp.module.css";

type Photo = {
  id: number;
  file: string;
  title: string;
  date: string;
  favorite: boolean;
};

type ViewId =
  | "library"
  | "favorites"
  | "people"
  | "research"
  | "conferences"
  | "personal";

const PHOTOS: Photo[] = [
  {
    id: 1,
    file: "Screenshot 2026-09-03 at 3.27.25 AM.png",
    title: "Photo 01",
    date: "2026",
    favorite: true,
  },
  {
    id: 2,
    file: "Screenshot 2026-09-03 at 3.28.55 AM.png",
    title: "Photo 02",
    date: "2026",
    favorite: false,
  },
  {
    id: 3,
    file: "Screenshot 2026-09-03 at 3.30.00 AM.png",
    title: "Photo 03",
    date: "2026",
    favorite: true,
  },
  {
    id: 4,
    file: "Screenshot 2026-09-03 at 3.33.27 AM.png",
    title: "Photo 04",
    date: "2026",
    favorite: false,
  },
  {
    id: 5,
    file: "Screenshot 2026-09-03 at 3.36.03 AM.png",
    title: "Photo 05",
    date: "2026",
    favorite: false,
  },
  {
    id: 6,
    file: "Screenshot 2026-09-03 at 3.36.48 AM.png",
    title: "Photo 06",
    date: "2026",
    favorite: true,
  },
  {
    id: 7,
    file: "Screenshot 2026-09-03 at 3.40.10 AM.png",
    title: "Photo 07",
    date: "2026",
    favorite: false,
  },
  {
    id: 8,
    file: "Screenshot 2026-09-03 at 3.43.51 AM.png",
    title: "Photo 08",
    date: "2026",
    favorite: false,
  },
];

const VIEW_LABELS: Record<ViewId, string> = {
  library: "Library",
  favorites: "Favorites",
  people: "People",
  research: "Research",
  conferences: "Conferences",
  personal: "Personal",
};

function getPhotoSrc(file: string) {
  return `/photos/${encodeURIComponent(file)}`;
}

export default function PhotosApp() {
  const [
    activeView,
    setActiveView,
  ] = useState<ViewId>("library");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedPhoto,
    setSelectedPhoto,
  ] = useState<Photo | null>(null);

  const [
    sidebarVisible,
    setSidebarVisible,
  ] = useState(true);

  const [
    favoriteIds,
    setFavoriteIds,
  ] = useState<number[]>(
    PHOTOS.filter(
      (photo) => photo.favorite
    ).map(
      (photo) => photo.id
    )
  );

  const displayedPhotos =
    useMemo(() => {
      let result = PHOTOS;

      if (
        activeView === "favorites"
      ) {
        result =
          result.filter(
            (photo) =>
              favoriteIds.includes(
                photo.id
              )
          );
      }

      if (
        activeView === "people" ||
        activeView === "research" ||
        activeView === "conferences" ||
        activeView === "personal"
      ) {
        result = [];
      }

      const query =
        search
          .trim()
          .toLowerCase();

      if (query) {
        result =
          result.filter(
            (photo) =>
              photo.title
                .toLowerCase()
                .includes(query) ||
              photo.date
                .toLowerCase()
                .includes(query)
          );
      }

      return result;
    }, [
      activeView,
      search,
      favoriteIds,
    ]);

  const toggleFavorite = (
    photoId: number
  ) => {
    setFavoriteIds(
      (current) =>
        current.includes(
          photoId
        )
          ? current.filter(
              (id) =>
                id !==
                photoId
            )
          : [
              ...current,
              photoId,
            ]
    );
  };

  const selectedIndex =
    selectedPhoto
      ? PHOTOS.findIndex(
          (photo) =>
            photo.id ===
            selectedPhoto.id
        )
      : -1;

  const showPrevious = () => {
    if (
      selectedIndex < 0
    ) {
      return;
    }

    const nextIndex =
      selectedIndex === 0
        ? PHOTOS.length - 1
        : selectedIndex - 1;

    setSelectedPhoto(
      PHOTOS[nextIndex]
    );
  };

  const showNext = () => {
    if (
      selectedIndex < 0
    ) {
      return;
    }

    const nextIndex =
      selectedIndex ===
      PHOTOS.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedPhoto(
      PHOTOS[nextIndex]
    );
  };

  return (
    <div className={styles.app}>

      <div className={styles.toolbar}>

        <div className={styles.toolbarLeft}>

          <button
            className={styles.toolbarButton}
            onClick={() =>
              setSidebarVisible(
                (current) =>
                  !current
              )
            }
            aria-label="Toggle sidebar"
          >
            <PanelLeft size={17} />
          </button>

          <button
            className={styles.toolbarButton}
            aria-label="Back"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            className={styles.toolbarButton}
            aria-label="Forward"
          >
            <ChevronRight size={18} />
          </button>

        </div>

        <div className={styles.toolbarTitle}>
          {VIEW_LABELS[activeView]}
        </div>

        <div className={styles.toolbarRight}>

          <div className={styles.searchBox}>

            <Search size={14} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search"
            />

          </div>

          <button
            className={styles.toolbarButton}
            aria-label="View options"
          >
            <SlidersHorizontal size={17} />
          </button>

        </div>

      </div>

      <div className={styles.body}>

        {sidebarVisible && (
          <aside className={styles.sidebar}>

            <div className={styles.sidebarSection}>

              <div className={styles.sidebarHeading}>
                Photos
              </div>

              <SidebarItem
                active={
                  activeView === "library"
                }
                icon={
                  <Grid3X3 size={17} />
                }
                label="Library"
                count={PHOTOS.length}
                onClick={() =>
                  setActiveView(
                    "library"
                  )
                }
              />

              <SidebarItem
                active={
                  activeView === "favorites"
                }
                icon={
                  <Heart size={17} />
                }
                label="Favorites"
                count={
                  favoriteIds.length
                }
                onClick={() =>
                  setActiveView(
                    "favorites"
                  )
                }
              />

              <SidebarItem
                active={
                  activeView === "people"
                }
                icon={
                  <Users size={17} />
                }
                label="People"
                onClick={() =>
                  setActiveView(
                    "people"
                  )
                }
              />

            </div>

            <div className={styles.sidebarSection}>

              <div className={styles.sidebarHeading}>
                Albums
              </div>

              <SidebarItem
                active={
                  activeView === "research"
                }
                icon={
                  <ImageIcon size={17} />
                }
                label="Research"
                onClick={() =>
                  setActiveView(
                    "research"
                  )
                }
              />

              <SidebarItem
                active={
                  activeView === "conferences"
                }
                icon={
                  <ImageIcon size={17} />
                }
                label="Conferences"
                onClick={() =>
                  setActiveView(
                    "conferences"
                  )
                }
              />

              <SidebarItem
                active={
                  activeView === "personal"
                }
                icon={
                  <ImageIcon size={17} />
                }
                label="Personal"
                onClick={() =>
                  setActiveView(
                    "personal"
                  )
                }
              />

            </div>

            <div className={styles.sidebarBottom}>

              <div className={styles.sidebarStat}>
                {PHOTOS.length} Photos
              </div>

              <div className={styles.sidebarStatMuted}>
                Param&apos;s Library
              </div>

            </div>

          </aside>
        )}

        <section className={styles.content}>

          <div className={styles.contentHeader}>

            <div>

              <h1>
                {VIEW_LABELS[activeView]}
              </h1>

              <p>
                {activeView === "library"
                  ? `${PHOTOS.length} Photos`
                  : activeView === "favorites"
                    ? `${displayedPhotos.length} Favorite${
                        displayedPhotos.length === 1
                          ? ""
                          : "s"
                      }`
                    : "Album not classified yet"}
              </p>

            </div>

            {(activeView === "library" ||
              activeView === "favorites") && (
              <div className={styles.yearBadge}>
                2026
              </div>
            )}

          </div>

          {displayedPhotos.length > 0 ? (
            <div className={styles.photoGrid}>

              {displayedPhotos.map(
                (photo) => (
                  <div
                    key={photo.id}
                    className={styles.photoTile}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      setSelectedPhoto(
                        photo
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();

                        setSelectedPhoto(
                          photo
                        );
                      }
                    }}
                  >

                    <img
                      src={getPhotoSrc(
                        photo.file
                      )}
                      alt={photo.title}
                      draggable={false}
                    />

                    <div className={styles.photoOverlay}>

                      <button
                        className={
                          `${styles.favoriteButton} ${
                            favoriteIds.includes(
                              photo.id
                            )
                              ? styles.favoriteButtonActive
                              : ""
                          }`
                        }
                        onClick={(event) => {
                          event.stopPropagation();

                          toggleFavorite(
                            photo.id
                          );
                        }}
                        aria-label="Favorite"
                      >
                        <Heart
                          size={16}
                          fill={
                            favoriteIds.includes(
                              photo.id
                            )
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      <div className={styles.expandHint}>
                        <Maximize2 size={15} />
                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          ) : (
            <EmptyAlbum
              activeView={
                activeView
              }
            />
          )}

        </section>

      </div>

      {selectedPhoto && (
        <div className={styles.viewer}>

          <div className={styles.viewerToolbar}>

            <button
              className={styles.viewerClose}
              onClick={() =>
                setSelectedPhoto(
                  null
                )
              }
              aria-label="Close photo"
            >
              <X size={18} />
            </button>

            <div className={styles.viewerTitle}>

              <strong>
                {selectedPhoto.title}
              </strong>

              <span>
                {selectedPhoto.date}
              </span>

            </div>

            <div className={styles.viewerActions}>

              <button
                onClick={() =>
                  toggleFavorite(
                    selectedPhoto.id
                  )
                }
                aria-label="Favorite"
                className={
                  favoriteIds.includes(
                    selectedPhoto.id
                  )
                    ? styles.viewerFavoriteActive
                    : ""
                }
              >
                <Heart
                  size={18}
                  fill={
                    favoriteIds.includes(
                      selectedPhoto.id
                    )
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

              <button aria-label="Share">
                <Share2 size={18} />
              </button>

              <button aria-label="Info">
                <Info size={18} />
              </button>

            </div>

          </div>

          <div className={styles.viewerStage}>

            <button
              className={`${styles.navButton} ${styles.navButtonLeft}`}
              onClick={showPrevious}
              aria-label="Previous photo"
            >
              <ChevronLeft size={27} />
            </button>

            <img
              src={getPhotoSrc(
                selectedPhoto.file
              )}
              alt={selectedPhoto.title}
              className={styles.viewerImage}
              draggable={false}
            />

            <button
              className={`${styles.navButton} ${styles.navButtonRight}`}
              onClick={showNext}
              aria-label="Next photo"
            >
              <ChevronRight size={27} />
            </button>

          </div>

          <div className={styles.viewerFilmstrip}>

            {PHOTOS.map(
              (photo) => (
                <button
                  key={photo.id}
                  className={
                    `${styles.filmstripItem} ${
                      selectedPhoto.id ===
                      photo.id
                        ? styles.filmstripItemActive
                        : ""
                    }`
                  }
                  onClick={() =>
                    setSelectedPhoto(
                      photo
                    )
                  }
                >
                  <img
                    src={getPhotoSrc(
                      photo.file
                    )}
                    alt=""
                    draggable={false}
                  />
                </button>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}

function SidebarItem({
  icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={
        `${styles.sidebarItem} ${
          active
            ? styles.sidebarItemActive
            : ""
        }`
      }
      onClick={onClick}
    >

      <span className={styles.sidebarIcon}>
        {icon}
      </span>

      <span className={styles.sidebarLabel}>
        {label}
      </span>

      {typeof count === "number" && (
        <span className={styles.sidebarCount}>
          {count}
        </span>
      )}

    </button>
  );
}

function EmptyAlbum({
  activeView,
}: {
  activeView: ViewId;
}) {
  return (
    <div className={styles.emptyState}>

      {activeView === "people" ? (
        <Users
          size={48}
          strokeWidth={1.25}
        />
      ) : (
        <ImageIcon
          size={48}
          strokeWidth={1.25}
        />
      )}

      <h2>
        {VIEW_LABELS[activeView]}
      </h2>

      <p>
        We&apos;ll classify the photos into this section after the main library is working.
      </p>

    </div>
  );
}