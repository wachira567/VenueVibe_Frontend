import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import {
  MapPin,
  Users,
  Star,
  Heart,
  Calendar,
  MessageSquare,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";
import "./VenueDetails.css";

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [venue, setVenue] = useState(null);
  const [similarVenues, setSimilarVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingData, setBookingData] = useState({
    event_date: "",
    end_date: "",
    guest_count: 1,
    contact_email: user?.email || "",
    contact_phone: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentSimilarIndex, setCurrentSimilarIndex] = useState(0);

  // Get venue images from database (for now just the main image, can be extended later)
  const getVenueImages = (venue) => {
    if (!venue) return [];
    // Use the actual venue image from database, with fallback
    const mainImage =
      venue.image_url ||
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop";

    // For now, return just the main image. In future, venues could have multiple images
    return [mainImage];
  };

  const nextImage = () => {
    const images = getVenueImages(venue);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getVenueImages(venue);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const [venueRes, allVenuesRes, bookedDatesRes] = await Promise.all([
          api.get(`/venues/${id}`),
          api.get("/venues"),
          api.get(`/venues/${id}/booked-dates`), // Get booked dates for this venue
        ]);

        setVenue(venueRes.data);

        // Get similar venues (same category, different venue)
        const similar = allVenuesRes.data
          .filter(
            (v) =>
              v.id !== parseInt(id) && v.category === venueRes.data.category
          )
          .slice(0, 3);
        setSimilarVenues(similar);

        // Get booked dates for this venue (from the new endpoint)
        setBookedDates(bookedDatesRes.data.booked_dates || []);

        // Check if saved (if user is logged in)
        if (user) {
          try {
            const savedRes = await api.get("/venues/saved");
            setIsSaved(savedRes.data.some((v) => v.id === parseInt(id)));
          } catch (error) {
            console.error("Error checking saved status:", error);
            setIsSaved(false);
          }
        } else {
          setIsSaved(false);
        }
      } catch (error) {
        console.error("Error fetching venue:", error);
        // No toast notification for loading errors
        navigate("/venues");
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id, user, navigate]);

  // Rotate similar venues every 5 seconds
  useEffect(() => {
    if (similarVenues.length > 3) {
      const interval = setInterval(() => {
        setCurrentSimilarIndex((prev) => (prev + 3) % similarVenues.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [similarVenues.length]);

  const toggleSaved = async () => {
    if (!user) {
      // No toast notification for login prompts
      navigate("/login");
      return;
    }

    try {
      if (isSaved) {
        console.log(`Unsaving venue ${id} for user ${user.username}`);
        await api.delete(`/venues/${id}/save`);
        setIsSaved(false);
        toast.success("Venue removed from saved list!");
        console.log(`Successfully unsaved venue ${id}`);
      } else {
        console.log(`Saving venue ${id} for user ${user.username}`);
        await api.post(`/venues/${id}/save`);
        setIsSaved(true);
        toast.success("Venue saved successfully!");
        console.log(`Successfully saved venue ${id}`);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      });

      // Handle authentication errors
      if (error.response?.status === 401) {
        console.log("Authentication error - redirecting to login");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        navigate("/login");
        // No toast notification for auth errors
        return;
      }

      // No other error notifications needed
      console.error("Error toggling save:", error);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      // No toast notification for login prompts
      navigate("/login");
      return;
    }

    if (
      !bookingData.event_date ||
      bookingData.guest_count < 1 ||
      !bookingData.contact_phone
    ) {
      // No toast notification for validation errors
      return;
    }

    if (bookingData.guest_count > venue.capacity) {
      // No toast notification for capacity errors
      return;
    }

    // Phone validation (basic check for required field)
    if (!bookingData.contact_phone.trim()) {
      // No toast notification for phone validation errors
      return;
    }

    try {
      const bookingPayload = {
        user_id: parseInt(user.id),
        venue_id: parseInt(id),
        event_date: bookingData.event_date, // Send as YYYY-MM-DD string, backend will handle
        end_date: bookingData.end_date || bookingData.event_date, // Use end_date if provided, otherwise same as start
        guest_count: parseInt(bookingData.guest_count),
        contact_email: bookingData.contact_email,
        contact_phone: bookingData.contact_phone || null,
      };

      await api.post("/bookings", bookingPayload);
      toast.success("Booking request submitted successfully!");
      navigate("/dashboard/bookings");
    } catch (error) {
      console.error("Error creating booking:", error);
      // No toast notification for booking errors
    }
  };

  const startChat = () => {
    if (!user) {
      // No toast notification for login prompts
      navigate("/login");
      return;
    }

    // Initialize chat with venue details
    if (window.Tawk_API) {
      // Set venue-specific attributes
      window.Tawk_API.setAttributes({
        pageType: "venue_details",
        venueId: id,
        venueName: venue?.name || "Unknown Venue",
        venueLocation: venue?.location || "Unknown Location",
        venuePrice: venue?.price_per_day || 0,
        venueCategory: venue?.category || "Unknown Category",
        inquiryType: "property_information",
        inquirySource: "venue_details_page",
        timestamp: new Date().toISOString(),
      });

      // Add event for property inquiry
      window.Tawk_API.addEvent("Property Inquiry Started", {
        venueId: id,
        venueName: venue?.name || "Unknown Venue",
        venueLocation: venue?.location || "Unknown Location",
        venuePrice: venue?.price_per_day || 0,
        userId: user.id || user.username,
        username: user.username,
        timestamp: new Date().toISOString(),
      });

      // Show the chat widget
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();

      toast.success("💬 Chat opened with venue information!");
    } else {
      // No toast notification for chat errors
    }
  };

  const calculateTotalCost = () => {
    if (!bookingData.event_date) return 0;

    const startDate = new Date(bookingData.event_date);
    const endDate = bookingData.end_date
      ? new Date(bookingData.end_date)
      : startDate;

    // Calculate number of days (inclusive)
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    return venue.price_per_day * daysDiff;
  };

  // Custom Calendar Component
  const BookingCalendar = ({ selectedDate, onDateSelect, bookedDates }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - monthStart.getDay());

    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const dayString = cloneDay.toISOString().split("T")[0];
        const isCurrentMonth = cloneDay.getMonth() === currentMonth.getMonth();
        const isPast = cloneDay < today;
        const isBooked = bookedDates.includes(dayString);
        const isSelected = selectedDate === dayString;
        const isToday = cloneDay.toDateString() === today.toDateString();

        days.push(
          <div
            key={dayString}
            className={`calendar-day ${
              !isCurrentMonth ? "calendar-day-other-month" : ""
            } ${isPast ? "calendar-day-past" : ""} ${
              isBooked ? "calendar-day-booked" : ""
            } ${isSelected ? "calendar-day-selected" : ""} ${
              isToday ? "calendar-day-today" : ""
            }`}
            onClick={() =>
              !isPast && !isBooked && isCurrentMonth && onDateSelect(dayString)
            }
          >
            <span className="calendar-day-number">{cloneDay.getDate()}</span>
            {isBooked && <X size={12} className="calendar-day-icon" />}
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div key={day.toISOString()} className="calendar-row">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1
                )
              )
            }
            className="calendar-nav-btn"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="calendar-title">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1
                )
              )
            }
            className="calendar-nav-btn"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-body">{rows}</div>
        <div className="calendar-legend">
          <div className="calendar-legend-item">
            <div className="calendar-legend-color calendar-legend-available"></div>
            <span>Available</span>
          </div>
          <div className="calendar-legend-item">
            <div className="calendar-legend-color calendar-legend-booked"></div>
            <span>Booked</span>
          </div>
          <div className="calendar-legend-item">
            <div className="calendar-legend-color calendar-legend-past"></div>
            <span>Past</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Venue Not Found
          </h2>
          <Link
            to="/venues"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse All Venues
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="venue-details-page">
      <div className="venue-details-container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to venues
        </button>

        {/* Hero Section with Dedicated Image Space */}
        <div className="venue-hero">
          <div className="venue-hero-images">
            {getVenueImages(venue).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${venue.name} - Image ${index + 1}`}
                className={`venue-hero-image ${
                  index === currentImageIndex ? "active" : ""
                }`}
              />
            ))}

            {/* Professional Navigation */}
            {getVenueImages(venue).length > 1 && (
              <div className="venue-image-nav">
                <button
                  onClick={prevImage}
                  className="venue-nav-arrow"
                  disabled={currentImageIndex === 0}
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="venue-image-dots">
                  {getVenueImages(venue).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`venue-image-dot ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      title={`View image ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextImage}
                  className="venue-nav-arrow"
                  disabled={
                    currentImageIndex === getVenueImages(venue).length - 1
                  }
                >
                  <ChevronRight size={20} />
                </button>

                <div className="venue-image-counter">
                  {currentImageIndex + 1} / {getVenueImages(venue).length}
                </div>
              </div>
            )}
          </div>

          {/* Venue Info Overlay */}
          <div className="venue-info-overlay">
            <div className="venue-info-content">
              <div className="venue-info-header">
                <div className="venue-info-main">
                  <h1>{venue.name}</h1>
                  <div className="venue-info-meta">
                    <div className="venue-info-location">
                      <MapPin size={18} />
                      <span>{venue.location}</span>
                    </div>
                    <div className="venue-info-capacity">
                      <Users size={18} />
                      <span>Up to {venue.capacity} guests</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="venue-info-price">
                KES {venue.price_per_day.toLocaleString()}{" "}
                <span className="text-lg font-normal text-white/80">
                  per day
                </span>
              </div>

              <div className="venue-info-actions">
                <button
                  onClick={toggleSaved}
                  className="venue-info-btn venue-info-btn-secondary"
                >
                  <Heart
                    className={isSaved ? "fill-red-500 text-red-500" : ""}
                    size={20}
                  />
                  {isSaved ? "Saved" : "Save Venue"}
                </button>
                <button
                  onClick={startChat}
                  className="venue-info-btn venue-info-btn-primary"
                >
                  <MessageSquare size={20} />
                  Ask About Venue
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="venue-content-layout">
          {/* Venue Details Section */}
          <div className="venue-details-section">
            <div className="venue-details-card">
              <div className="venue-details-header">
                <h2 className="venue-details-title">About This Venue</h2>
                <p className="venue-details-subtitle">
                  Everything you need to know about {venue.name}
                </p>
              </div>

              <div className="venue-description">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {venue.description}
                </p>
              </div>

              <div className="venue-features">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Venue Features
                </h3>
                <div className="venue-features-grid">
                  <div className="venue-feature-item">
                    <CheckCircle className="venue-feature-icon" size={20} />
                    <span className="venue-feature-text">
                      Verified Location
                    </span>
                  </div>
                  <div className="venue-feature-item">
                    <Users className="venue-feature-icon" size={20} />
                    <span className="venue-feature-text">
                      Up to {venue.capacity} Guests
                    </span>
                  </div>
                  <div className="venue-feature-item">
                    <Star className="venue-feature-icon" size={20} />
                    <span className="venue-feature-text">Premium Quality</span>
                  </div>
                  <div className="venue-feature-item">
                    <Calendar className="venue-feature-icon" size={20} />
                    <span className="venue-feature-text">Flexible Booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="venue-sidebar">
            <div className="venue-booking-card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Book This Venue
              </h3>

              <div className="space-y-6">
                <div className="venue-booking-field">
                  <label className="venue-booking-label">
                    Select Event Date
                  </label>
                  <div className="venue-calendar-container">
                    <button
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="venue-calendar-button"
                    >
                      <Calendar size={18} />
                      {bookingData.event_date ? (
                        <span>
                          {new Date(bookingData.event_date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-500">Select a date</span>
                      )}
                    </button>
                    {showCalendar && (
                      <div className="venue-calendar-dropdown">
                        <BookingCalendar
                          selectedDate={bookingData.event_date}
                          onDateSelect={(date) => {
                            setBookingData({
                              ...bookingData,
                              event_date: date,
                            });
                            setShowCalendar(false);
                          }}
                          bookedDates={bookedDates}
                        />
                      </div>
                    )}
                    <div className="venue-calendar-info">
                      <p className="text-sm text-gray-600">
                        📅 Click to open calendar. Past dates and booked dates
                        are disabled.
                      </p>
                      {bookedDates.length > 0 && (
                        <p className="text-sm text-red-600 mt-1">
                          🚫 {bookedDates.length} date
                          {bookedDates.length > 1 ? "s" : ""} already booked
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="venue-booking-field">
                  <label className="venue-booking-label">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    value={bookingData.guest_count}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        guest_count: parseInt(e.target.value) || 1,
                      })
                    }
                    className="venue-booking-input"
                    min="1"
                    max={venue.capacity}
                    placeholder="Enter guest count"
                  />
                  {bookingData.guest_count > venue.capacity && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      ⚠️ Guest count exceeds venue capacity ({venue.capacity})
                    </p>
                  )}
                </div>

                <div className="venue-booking-field">
                  <label className="venue-booking-label">Contact Email (Optional)</label>
                  <input
                    type="email"
                    value={bookingData.contact_email}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        contact_email: e.target.value,
                      })
                    }
                    className="venue-booking-input"
                    placeholder="your.email@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    📧 Optional: We'll use this email to send booking confirmations and updates
                  </p>
                </div>

                <div className="venue-booking-field">
                  <label className="venue-booking-label">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={bookingData.contact_phone}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        contact_phone: e.target.value,
                      })
                    }
                    className="venue-booking-input"
                    placeholder="+254 700 000 000"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    📱 Required: We'll send SMS notifications about your booking to this number
                  </p>
                </div>

                <div className="venue-booking-field">
                  <label className="venue-booking-label">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={bookingData.end_date}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        end_date: e.target.value,
                      })
                    }
                    className="venue-booking-input"
                    min={bookingData.event_date || undefined}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    📅 Leave empty for single-day events, or select end date for
                    multi-day bookings
                  </p>
                </div>

                {/* Booking Summary */}
                {(bookingData.event_date || bookingData.guest_count > 1) && (
                  <div className="venue-booking-summary">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Booking Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      {bookingData.event_date && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start Date:</span>
                          <span className="font-medium">
                            {new Date(
                              bookingData.event_date
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                      {bookingData.end_date &&
                        bookingData.end_date !== bookingData.event_date && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">End Date:</span>
                            <span className="font-medium">
                              {new Date(
                                bookingData.end_date
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-medium">
                          {bookingData.guest_count}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">
                          {bookingData.event_date && bookingData.end_date
                            ? Math.ceil(
                                (new Date(bookingData.end_date).getTime() -
                                  new Date(bookingData.event_date).getTime()) /
                                  (1000 * 3600 * 24)
                              ) + 1
                            : 1}{" "}
                          Day
                          {bookingData.event_date &&
                          bookingData.end_date &&
                          Math.ceil(
                            (new Date(bookingData.end_date).getTime() -
                              new Date(bookingData.event_date).getTime()) /
                              (1000 * 3600 * 24)
                          ) +
                            1 >
                            1
                            ? "s"
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="venue-cost-breakdown">
                  <div className="venue-cost-row">
                    <span>Total Cost:</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      KES {calculateTotalCost().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    💰 Flat rate per day for your event
                  </p>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={
                    !bookingData.event_date ||
                    bookingData.guest_count > venue.capacity ||
                    !bookingData.contact_phone.trim()
                  }
                  className="venue-booking-submit"
                >
                  <Calendar className="inline mr-2" size={20} />
                  Confirm Booking
                </button>

                <div className="venue-chat-section">
                  <button onClick={startChat} className="venue-chat-button">
                    <MessageSquare className="inline mr-2" size={20} />
                    Ask About This Venue
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    💬 Get instant answers from venue experts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Venues Section */}
        {similarVenues.length > 0 && (
          <div className="venue-similar-section">
            <div className="venue-similar-container">
              <div className="venue-similar-header">
                <h2 className="venue-similar-title">
                  Similar Venues You Might Like
                </h2>
                <p className="venue-similar-subtitle">
                  Discover other amazing venues in the same category
                </p>
              </div>

              <div className="venue-similar-grid">
                {similarVenues
                  .slice(currentSimilarIndex, currentSimilarIndex + 3)
                  .map((similarVenue) => (
                    <Link
                      key={similarVenue.id}
                      to={`/venues/${similarVenue.id}`}
                      className="venue-similar-card"
                    >
                      <div className="venue-similar-image">
                        <img
                          src={
                            similarVenue.image_url ||
                            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop"
                          }
                          alt={similarVenue.name}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div style={{ display: "none" }}>🏛️</div>
                        <div className="venue-similar-badge">Similar</div>
                      </div>
                      <div className="venue-similar-content">
                        <h3 className="venue-similar-name">
                          {similarVenue.name}
                        </h3>
                        <div className="venue-similar-location">
                          <MapPin size={16} />
                          <span>{similarVenue.location}</span>
                        </div>
                        <div className="venue-similar-meta">
                          <div className="venue-similar-capacity">
                            <Users size={14} />
                            <span>Up to {similarVenue.capacity}</span>
                          </div>
                          <div className="venue-similar-rating">
                            <Star size={14} className="fill-current" />
                            <span>4.5</span>
                          </div>
                        </div>
                        <div className="venue-similar-footer">
                          <div className="venue-similar-price">
                            KES {similarVenue.price_per_day.toLocaleString()}
                          </div>
                          <button className="venue-similar-view-btn">
                            <ExternalLink size={14} />
                            View
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              <div className="venue-similar-explore">
                <Link to="/venues" className="venue-similar-explore-btn">
                  <Search size={20} />
                  Explore All Venues
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueDetails;
