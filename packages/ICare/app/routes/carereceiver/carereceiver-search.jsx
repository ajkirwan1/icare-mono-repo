import { Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { FiHeart } from "react-icons/fi";
import "./carereceiver-pages.css";
import RatingStars from "./rating-stars";
import {
    readFavoriteCaregivers,
    toggleFavoriteCaregiver,
    writeFavoriteCaregivers
} from "./favorites-storage";

const RADIUS_OPTIONS = [5, 10, 15, 20, 30];
const DAY_OPTIONS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_OPTIONS = ["Morning", "Afternoon", "Evening"];
const SERVICE_OPTIONS = ["Companionship", "Light housework", "Shopping", "Meal prep", "Transportation"];
const VERIFICATION_OPTIONS = ["DBS Verified", "ID Verified", "Right to Work Verified"];
const PAGE_SIZE = 6;

const caregivers = [
    {
        id: "cg-001",
        name: "Sarah Thompson",
        postcode: "SW1A",
        location: "SW1A area",
        distanceMiles: 1.2,
        hourlyRate: 18,
        rating: 4.9,
        reviewCount: 27,
        services: ["Companionship", "Light housework"],
        languages: "English, Polish",
        badges: ["DBS Verified", "ID Verified"],
        availabilityDays: ["Monday", "Tuesday", "Wednesday"],
        availabilityTimes: ["Morning", "Afternoon"]
    },
    {
        id: "cg-002",
        name: "Mary Johnson",
        postcode: "W1H",
        location: "W1H area",
        distanceMiles: 2.4,
        hourlyRate: 17,
        rating: 4.8,
        reviewCount: 19,
        services: ["Companionship", "Shopping"],
        languages: "English",
        badges: ["DBS Verified"],
        availabilityDays: ["Tuesday", "Wednesday", "Friday"],
        availabilityTimes: ["Morning", "Evening"]
    },
    {
        id: "cg-003",
        name: "Emma Collins",
        postcode: "SE1",
        location: "SE1 area",
        distanceMiles: 3.1,
        hourlyRate: 20,
        rating: 4.7,
        reviewCount: 14,
        services: ["Companionship", "Meal prep"],
        languages: "English, Romanian",
        badges: ["ID Verified"],
        availabilityDays: ["Monday", "Thursday"],
        availabilityTimes: ["Afternoon", "Evening"]
    },
    {
        id: "cg-004",
        name: "Anna Nowak",
        postcode: "N1",
        location: "N1 area",
        distanceMiles: 3.8,
        hourlyRate: 16,
        rating: 4.6,
        reviewCount: 11,
        services: ["Companionship"],
        languages: "English, Polish",
        badges: ["DBS Verified", "ID Verified"],
        availabilityDays: ["Monday", "Tuesday", "Saturday"],
        availabilityTimes: ["Morning"]
    },
    {
        id: "cg-005",
        name: "Tom Richards",
        postcode: "EC1",
        location: "EC1 area",
        distanceMiles: 4.4,
        hourlyRate: 19,
        rating: 4.8,
        reviewCount: 22,
        services: ["Companionship", "Transportation"],
        languages: "English",
        badges: ["Right to Work Verified"],
        availabilityDays: ["Wednesday", "Friday", "Sunday"],
        availabilityTimes: ["Afternoon"]
    },
    {
        id: "cg-006",
        name: "Lina Patel",
        postcode: "E2",
        location: "E2 area",
        distanceMiles: 5.0,
        hourlyRate: 18,
        rating: 4.9,
        reviewCount: 31,
        services: ["Companionship", "Light housework"],
        languages: "English, Hindi",
        badges: ["DBS Verified", "ID Verified"],
        availabilityDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        availabilityTimes: ["Morning", "Afternoon"]
    },
    {
        id: "cg-007",
        name: "Margaret Shaw",
        postcode: "NW1",
        location: "NW1 area",
        distanceMiles: 2.1,
        hourlyRate: 19,
        rating: 4.9,
        reviewCount: 16,
        services: ["Companionship", "Light housework"],
        languages: "English",
        badges: ["DBS Verified", "ID Verified", "Right to Work Verified"],
        availabilityDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
        availabilityTimes: ["Morning", "Afternoon"]
    }
];

function initials(name) {
    return String(name)
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function toggleInArray(list, value) {
    return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];
}

export default function CarereceiverSearch() {
    const [searchInput, setSearchInput] = useState("");
    const [appliedPostcode, setAppliedPostcode] = useState("");
    const [radiusMiles, setRadiusMiles] = useState(10);
    const [sortBy, setSortBy] = useState("distance");
    const [selectedDays, setSelectedDays] = useState(["Monday", "Tuesday", "Wednesday"]);
    const [selectedTimes, setSelectedTimes] = useState(["Morning", "Afternoon"]);
    const [selectedServices, setSelectedServices] = useState(["Companionship", "Light housework"]);
    const [selectedVerification, setSelectedVerification] = useState(["DBS Verified", "ID Verified"]);
    const [minRate, setMinRate] = useState(15);
    const [maxRate, setMaxRate] = useState(25);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [favoriteCaregivers, setFavoriteCaregivers] = useState(() => readFavoriteCaregivers());

    const favoriteIds = useMemo(() => new Set(favoriteCaregivers.map((entry) => entry.id)), [favoriteCaregivers]);

    const filteredCaregivers = useMemo(() => {
        const query = appliedPostcode.trim().toLowerCase();

        const filtered = caregivers.filter((caregiver) => {
            const matchesQuery =
                !query || caregiver.postcode.toLowerCase().includes(query) || caregiver.location.toLowerCase().includes(query);
            const withinRadius = caregiver.distanceMiles <= radiusMiles;
            const withinRate = caregiver.hourlyRate >= minRate && caregiver.hourlyRate <= maxRate;
            const matchesDays = selectedDays.length === 0 || selectedDays.some((day) => caregiver.availabilityDays.includes(day));
            const matchesTimes =
                selectedTimes.length === 0 || selectedTimes.some((timeOfDay) => caregiver.availabilityTimes.includes(timeOfDay));
            const matchesServices =
                selectedServices.length === 0 || selectedServices.some((service) => caregiver.services.includes(service));
            const matchesVerification =
                selectedVerification.length === 0 || selectedVerification.some((badge) => caregiver.badges.includes(badge));

            return (
                matchesQuery &&
                withinRadius &&
                withinRate &&
                matchesDays &&
                matchesTimes &&
                matchesServices &&
                matchesVerification
            );
        });

        return filtered.sort((left, right) => {
            if (sortBy === "rating") { return right.rating - left.rating; }
            if (sortBy === "price-low") { return left.hourlyRate - right.hourlyRate; }
            if (sortBy === "price-high") { return right.hourlyRate - left.hourlyRate; }
            return left.distanceMiles - right.distanceMiles;
        });
    }, [appliedPostcode, maxRate, minRate, radiusMiles, selectedDays, selectedServices, selectedTimes, selectedVerification, sortBy]);

    const activeTags = useMemo(() => {
        const tags = [];
        selectedVerification.forEach((item) => tags.push({ type: "verification", value: item }));
        selectedTimes.forEach((item) => tags.push({ type: "time", value: `${item} availability` }));
        return tags.slice(0, 6);
    }, [selectedTimes, selectedVerification]);

    const totalPages = Math.max(1, Math.ceil(filteredCaregivers.length / PAGE_SIZE));
    const visiblePageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const paginatedCaregivers = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredCaregivers.slice(start, start + PAGE_SIZE);
    }, [currentPage, filteredCaregivers]);
    const pageStart = filteredCaregivers.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
    const pageEnd = filteredCaregivers.length === 0 ? 0 : pageStart + paginatedCaregivers.length - 1;

    useEffect(() => {
        setCurrentPage((prevPage) => Math.min(prevPage, totalPages));
    }, [totalPages]);

    useEffect(() => {
        setCurrentPage(1);
    }, [appliedPostcode, maxRate, minRate, radiusMiles, selectedDays, selectedServices, selectedTimes, selectedVerification, sortBy]);

    useEffect(() => {
        writeFavoriteCaregivers(favoriteCaregivers);
    }, [favoriteCaregivers]);

    function handleSearch(event) {
        event.preventDefault();
        setAppliedPostcode(searchInput);
        setCurrentPage(1);
    }

    function clearAllFilters() {
        setSelectedDays([]);
        setSelectedTimes([]);
        setSelectedServices([]);
        setSelectedVerification([]);
        setMinRate(10);
        setMaxRate(40);
        setRadiusMiles(10);
        setCurrentPage(1);
    }

    function handleRemoveTag(tag) {
        if (tag.type === "verification") {
            setSelectedVerification((prev) => prev.filter((item) => item !== tag.value));
            return;
        }
        const raw = tag.value.replace(" availability", "");
        setSelectedTimes((prev) => prev.filter((item) => item !== raw));
    }

    function handleToggleFavorite(caregiver) {
        setFavoriteCaregivers((prev) => toggleFavoriteCaregiver(prev, caregiver));
    }

    return (
        <div className="cr-page">
            <div className="cr-shell">
                <nav className="cr-breadcrumbs" aria-label="Breadcrumb navigation">
                    <Link to="/carereceiver/dashboard">Dashboard</Link><span>›</span><strong>Search Caregivers</strong>
                </nav>

                <section className="cr-card">
                    <form className="cr-search-form" onSubmit={handleSearch}>
                        <label className="cr-muted" htmlFor="postcode-input">
                            Where do you need care?
                            <input
                                id="postcode-input"
                                className="cr-input"
                                value={searchInput}
                                onChange={(event) => setSearchInput(event.target.value)}
                                placeholder="Enter your postcode (e.g., SW1A 1AA)"
                            />
                        </label>
                        <label className="cr-muted" htmlFor="radius-input">
                            Search radius
                            <select
                                id="radius-input"
                                className="cr-select"
                                value={`${radiusMiles}`}
                                onChange={(event) => setRadiusMiles(Number(event.target.value))}
                            >
                                {RADIUS_OPTIONS.map((radius) => (
                                    <option key={radius} value={`${radius}`}>{radius} miles</option>
                                ))}
                            </select>
                        </label>
                        <button type="submit" className="cr-button cr-button--primary" style={{ width: "100%" }}>
                            Search
                        </button>
                    </form>
                </section>

                <section className="cr-card">
                    <div className="cr-inline cr-toolbar" style={{ justifyContent: "space-between" }}>
                        <div>
                            <h1 style={{ margin: 0, fontSize: "26px" }}>
                                Showing {pageStart}-{pageEnd} of {filteredCaregivers.length} caregivers
                            </h1>
                            <p className="cr-muted" style={{ margin: "6px 0 0" }}>
                                Within {radiusMiles} miles{appliedPostcode ? ` of ${appliedPostcode.toUpperCase()}` : ""}
                            </p>
                            <p style={{ margin: "8px 0 0" }}>
                                <Link className="cr-button cr-button--secondary" to="/carereceiver/favorites">
                                    Favorites ({favoriteCaregivers.length})
                                </Link>
                            </p>
                        </div>
                        <button
                            type="button"
                            className="cr-button cr-button--secondary cr-filter-toggle"
                            onClick={() => setMobileFiltersOpen((prev) => !prev)}
                        >
                            {mobileFiltersOpen ? "Hide filters" : "Filters"}
                        </button>
                        <select
                            className="cr-select"
                            style={{ maxWidth: "260px" }}
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value)}
                        >
                            <option value="distance">Sort by: Distance (nearest first)</option>
                            <option value="rating">Sort by: Rating (highest first)</option>
                            <option value="price-low">Sort by: Price (low to high)</option>
                            <option value="price-high">Sort by: Price (high to low)</option>
                        </select>
                    </div>

                    <div className="cr-inline" style={{ marginTop: "10px" }}>
                        {activeTags.map((tag) => (
                            <button key={`${tag.type}-${tag.value}`} type="button" className="cr-chip cr-chip--green" onClick={() => handleRemoveTag(tag)}>
                                {tag.value} ×
                            </button>
                        ))}
                    </div>
                </section>

                <section className="cr-search-layout">
                    <aside className={`cr-card ${mobileFiltersOpen ? "is-open" : ""}`}>
                        <div className="cr-filter-head">
                            <h2 style={{ margin: 0 }}>Filters</h2>
                            <button
                                type="button"
                                className="cr-button cr-button--secondary cr-filter-close"
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                Close
                            </button>
                        </div>

                        <div className="cr-filter-group">
                            <h3>Availability</h3>
                            {DAY_OPTIONS.map((day) => (
                                <label key={day} className="cr-check">
                                    <input
                                        type="checkbox"
                                        checked={selectedDays.includes(day)}
                                        onChange={() => setSelectedDays((prev) => toggleInArray(prev, day))}
                                    />
                                    {day}
                                </label>
                            ))}

                            {TIME_OPTIONS.map((timeOfDay) => (
                                <label key={timeOfDay} className="cr-check">
                                    <input
                                        type="checkbox"
                                        checked={selectedTimes.includes(timeOfDay)}
                                        onChange={() => setSelectedTimes((prev) => toggleInArray(prev, timeOfDay))}
                                    />
                                    {timeOfDay}
                                </label>
                            ))}
                        </div>

                        <div className="cr-filter-group">
                            <h3>Hourly rate</h3>
                            <div className="cr-inline">
                                <label className="cr-muted" htmlFor="min-rate">Min</label>
                                <select id="min-rate" className="cr-select" value={minRate} onChange={(event) => setMinRate(Number(event.target.value))}>
                                    {[10, 12, 15, 18, 20, 25].map((value) => <option key={value} value={value}>£{value}</option>)}
                                </select>
                                <label className="cr-muted" htmlFor="max-rate">Max</label>
                                <select id="max-rate" className="cr-select" value={maxRate} onChange={(event) => setMaxRate(Number(event.target.value))}>
                                    {[20, 25, 30, 35, 40].map((value) => <option key={value} value={value}>£{value}</option>)}
                                </select>
                            </div>
                            <p className="cr-muted" style={{ margin: 0 }}>Platform adds 15% service fee to your total.</p>
                        </div>

                        <div className="cr-filter-group">
                            <h3>Services offered</h3>
                            {SERVICE_OPTIONS.map((service) => (
                                <label key={service} className="cr-check">
                                    <input
                                        type="checkbox"
                                        checked={selectedServices.includes(service)}
                                        onChange={() => setSelectedServices((prev) => toggleInArray(prev, service))}
                                    />
                                    {service}
                                </label>
                            ))}
                        </div>

                        <div className="cr-filter-group">
                            <h3>Verification</h3>
                            {VERIFICATION_OPTIONS.map((badge) => (
                                <label key={badge} className="cr-check">
                                    <input
                                        type="checkbox"
                                        checked={selectedVerification.includes(badge)}
                                        onChange={() => setSelectedVerification((prev) => toggleInArray(prev, badge))}
                                    />
                                    {badge}
                                </label>
                            ))}
                        </div>

                        <div className="cr-grid" style={{ marginTop: "12px" }}>
                            <button type="button" className="cr-button cr-button--primary" onClick={() => setMobileFiltersOpen(false)}>
                                Apply Filters
                            </button>
                            <button type="button" className="cr-button cr-button--secondary" onClick={clearAllFilters}>
                                Clear All
                            </button>
                        </div>
                    </aside>

                    <article className="cr-results-grid">
                        {filteredCaregivers.length === 0 ? (
                            <section className="cr-card" style={{ gridColumn: "1 / -1" }}>
                                <h3 style={{ marginTop: 0 }}>No caregivers found</h3>
                                <p className="cr-muted" style={{ marginBottom: "10px" }}>
                                    Try increasing the radius, widening hourly rate, or removing some filters.
                                </p>
                                <div className="cr-inline">
                                    <button type="button" className="cr-button cr-button--primary" onClick={clearAllFilters}>Clear filters</button>
                                </div>
                            </section>
                        ) : paginatedCaregivers.map((caregiver) => (
                            <div key={caregiver.id} className="cr-card cr-caregiver-card">
                                <div className="cr-inline" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div className="cr-avatar cr-caregiver-avatar">{initials(caregiver.name)}</div>
                                    <button
                                        type="button"
                                        className={`cr-heart-btn ${favoriteIds.has(caregiver.id) ? "is-active" : ""}`}
                                        aria-label={favoriteIds.has(caregiver.id) ? `Remove ${caregiver.name} from favorites` : `Add ${caregiver.name} to favorites`}
                                        onClick={() => handleToggleFavorite(caregiver)}
                                    >
                                        <span className="cr-heart-glyph" aria-hidden="true"><FiHeart /></span>
                                    </button>
                                </div>

                                <h3 style={{ marginBottom: "4px" }}>{caregiver.name}</h3>
                                <p className="cr-row-sub" style={{ marginBottom: "8px" }}>{caregiver.location} • {caregiver.distanceMiles.toFixed(1)} miles</p>

                                <p className="cr-row-sub cr-rating-line" style={{ marginBottom: "8px" }}>
                                    <span className="cr-stars-inline">
                                        <RatingStars value={caregiver.rating} />
                                    </span>
                                    <span>{caregiver.rating} ({caregiver.reviewCount})</span>
                                </p>

                                <p style={{ margin: "0 0 8px", fontWeight: 700 }}>£{caregiver.hourlyRate}/hour</p>

                                <div className="cr-inline" style={{ marginBottom: "10px" }}>
                                    {caregiver.services.map((service) => (
                                        <span key={service} className="cr-chip cr-chip--green">{service}</span>
                                    ))}
                                </div>

                                <p className="cr-row-sub" style={{ marginBottom: "10px" }}>Languages: {caregiver.languages}</p>

                                <div className="cr-inline" style={{ marginBottom: "12px" }}>
                                    {caregiver.badges.map((badge) => (
                                        <span key={badge} className="cr-chip cr-chip--blue">{badge}</span>
                                    ))}
                                </div>

                                <div className="cr-grid" style={{ gap: "8px" }}>
                                    <Link className="cr-button cr-button--primary" to={`/carereceiver/caregivers/${caregiver.id}`}>
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </article>
                </section>

                <section className="cr-card">
                    <div className="cr-inline" style={{ justifyContent: "center", gap: "10px" }}>
                        <button
                            type="button"
                            className="cr-button cr-button--secondary"
                            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                            disabled={currentPage === 1 || filteredCaregivers.length === 0}
                        >
                            ← Prev
                        </button>
                        {visiblePageNumbers.map((page) => (
                            <button
                                key={page}
                                type="button"
                                className={`cr-button ${currentPage === page ? "cr-button--primary" : "cr-button--secondary"}`}
                                onClick={() => setCurrentPage(page)}
                                aria-current={currentPage === page ? "page" : undefined}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            type="button"
                            className="cr-button cr-button--secondary"
                            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                            disabled={currentPage === totalPages || filteredCaregivers.length === 0}
                        >
                            Next →
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
