import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, MapPin, Users, ExternalLink, Trash2 } from "lucide-react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "./SavedVenues.css";

const SavedVenues = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [savedVenues, setSavedVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const fetchSavedVenues = async () => {
    try {
      const response = await api.get("/venues/saved");
      setSavedVenues(response.data || []);
    } catch (error) {
      console.error("Error fetching saved venues:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        navigate("/login");
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to load saved venues");
      }
      setSavedVenues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedVenues();
    }
  }, [user]);

  const handleUnsave = async (venueId) => {
    try {
      await api.delete(`/venues/${venueId}/save`);
      setSavedVenues((prev) => prev.filter((venue) => venue.id !== venueId));
      toast.success("Venue removed from saved list");
    } catch (error) {
      console.error("Error unsaving venue:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        navigate("/login");
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to remove venue from saved list");
      }
    }
  };

  if (loading) {
    return (
      <div className="saved-venues-page">
        <div className="saved-venues-container">
          <div className="loading-spinner">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p>Loading your saved venues...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-venues-page">
      <div className="saved-venues-container">
        {/* Header */}
        <div className="saved-venues-header">
          <div className="header-content">
            <div className="header-text">
              <Heart className="header-icon" size={32} />
              <h1 className="page-title">Saved Venues</h1>
              <p className="page-subtitle">
                Your favorite venues for future events ({savedVenues.length})
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {savedVenues.length === 0 ? (
          <div className="empty-state">
            <Heart className="empty-icon" size={64} />
            <h3 className="empty-title">No saved venues yet</h3>
            <p className="empty-subtitle">
              Start exploring and save venues you love for your special
              occasions
            </p>
            <Link to="/venues" className="browse-button">
              <ExternalLink size={18} />
              Browse Venues
            </Link>
          </div>
        ) : (
          <div className="venues-grid">
            {savedVenues.map((venue) => (
              <div key={venue.id} className="venue-card">
                {/* Venue Image */}
                <div className="venue-image-container">
                  <img
                    src={
                      venue.image_url ||
                      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
                    }
                    alt={venue.name}
                    className="venue-image"
                  />
                  <div className="venue-overlay">
                    <button
                      onClick={() => handleUnsave(venue.id)}
                      className="unsave-button"
                      title="Remove from saved"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="venue-category">{venue.category}</div>
                </div>

                {/* Venue Details */}
                <div className="venue-content">
                  <div className="venue-header">
                    <h3 className="venue-name">{venue.name}</h3>
                    <span className="venue-price">
                      KES {venue.price_per_day.toLocaleString()}
                    </span>
                  </div>

                  <div className="venue-info">
                    <div className="venue-location">
                      <MapPin size={16} />
                      <span>{venue.location}</span>
                    </div>
                    <div className="venue-capacity">
                      <Users size={16} />
                      <span>{venue.capacity} guests</span>
                    </div>
                  </div>

                  <Link
                    to={`/venues/${venue.id}`}
                    className="view-details-button"
                  >
                    <ExternalLink size={16} />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {savedVenues.length > 0 && (
          <div className="page-footer">
            <p>Keep exploring to find more amazing venues for your events!</p>
            <Link to="/venues" className="explore-more-button">
              Explore More Venues
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedVenues;
