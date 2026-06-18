import { useState } from 'react'
import './App.css'

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  // Movie data
  const movies = [
    {
      id: 1,
      title: "Dune: Part Two",
      image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=600",
      rating: 8.5,
      description: "Paul Atreides continues his journey on Arrakis.",
      genres: ["Sci-Fi", "Action"],
      duration: "2h 46m"
    },
    {
      id: 2,
      title: "The Batman",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600",
      rating: 8.2,
      description: "Batman investigates corruption in Gotham City.",
      genres: ["Action", "Crime"],
      duration: "2h 56m"
    },
    {
      id: 3,
      title: "Oppenheimer",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600",
      rating: 8.8,
      description: "The story of J. Robert Oppenheimer.",
      genres: ["Biography", "Drama"],
      duration: "3h 0m"
    },
    {
      id: 4,
      title: "Interstellar",
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600",
      rating: 9.0,
      description: "A team explores space for humanity's survival.",
      genres: ["Sci-Fi", "Adventure"],
      duration: "2h 49m"
    }
  ]

  const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM']
  const seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
                 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8',
                 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8']
  const bookedSeats = ['A3', 'A4', 'B5', 'C7']

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    setShowBooking(true)
    setBookingStep(1)
    setSelectedSeats([])
    setSelectedTime(null)
  }

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return
    setSelectedSeats(prev => 
      prev.includes(seat) 
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    )
  }

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat')
      return
    }
    if (!selectedTime) {
      alert('Please select a showtime')
      return
    }
    setBookingStep(2)
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields')
      return
    }
    setBookingConfirmed(true)
    setTimeout(() => {
      setShowBooking(false)
      setBookingConfirmed(false)
      setSelectedMovie(null)
      setSelectedSeats([])
      setSelectedTime(null)
      setFormData({ name: '', email: '', phone: '' })
      setBookingStep(1)
      alert('Booking confirmed! Thank you for choosing CineBook.')
    }, 2000)
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        padding: '4rem 2rem',
        marginBottom: '2rem',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #e50914, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎬 Book Your Movie Tickets
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '2rem' }}>
            Experience the magic of cinema with seamless booking
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e50914' }}>100+</div>
              <div style={{ color: '#888' }}>Movies</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e50914' }}>50+</div>
              <div style={{ color: '#888' }}>Theaters</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e50914' }}>10k+</div>
              <div style={{ color: '#888' }}>Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'left' }}>
        Now Showing
      </h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
            <img src={movie.image} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <div className="movie-title">{movie.title}</div>
              <div className="movie-rating">⭐ {movie.rating}/10</div>
              <div style={{ color: '#888', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                {movie.duration} • {movie.genres.join(', ')}
              </div>
              <button className="btn-primary">Book Tickets</button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBooking && selectedMovie && (
        <div className="modal-overlay" onClick={() => setShowBooking(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBooking(false)}>✕</button>
            
            {bookingConfirmed ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h2>Booking Confirmed!</h2>
                <p style={{ color: '#888' }}>Thank you for booking with CineBook</p>
              </div>
            ) : (
              <>
                <h2 style={{ marginBottom: '1rem' }}>{selectedMovie.title}</h2>
                
                {bookingStep === 1 && (
                  <>
                    <h3 style={{ fontSize: '1rem', color: '#888', marginBottom: '0.5rem' }}>Select Showtime</h3>
                    <div className="showtime-grid">
                      {showtimes.map(time => (
                        <button
                          key={time}
                          className={`showtime-btn ${selectedTime === time ? 'active' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    <h3 style={{ fontSize: '1rem', color: '#888', margin: '1rem 0 0.5rem' }}>Select Seats</h3>
                    <div className="seat-grid">
                      {seats.map(seat => {
                        const isBooked = bookedSeats.includes(seat)
                        const isSelected = selectedSeats.includes(seat)
                        return (
                          <button
                            key={seat}
                            className={`seat ${
                              isBooked ? 'seat-booked' :
                              isSelected ? 'seat-selected' : 'seat-available'
                            }`}
                            onClick={() => toggleSeat(seat)}
                            disabled={isBooked}
                          >
                            {seat}
                          </button>
                        )
                      })}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
                      <span style={{ color: '#888', fontSize: '0.9rem' }}>🟢 Available</span>
                      <span style={{ color: '#888', fontSize: '0.9rem' }}>🔴 Selected</span>
                      <span style={{ color: '#888', fontSize: '0.9rem' }}>⚫ Booked</span>
                    </div>

                    {selectedSeats.length > 0 && (
                      <div style={{ margin: '1rem 0', color: '#e50914' }}>
                        Selected: {selectedSeats.join(', ')} ({selectedSeats.length} seats)
                      </div>
                    )}

                    <button className="btn-primary" onClick={handleBooking}>
                      Continue to Details →
                    </button>
                  </>
                )}

                {bookingStep === 2 && (
                  <>
                    <h3 style={{ fontSize: '1rem', color: '#888', marginBottom: '1rem' }}>
                      Enter Your Details
                    </h3>
                    <form onSubmit={handleConfirm}>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                      />
                      <input
                        className="input-field"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        required
                      />
                      <input
                        className="input-field"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                      
                      <div style={{ 
                        background: '#2a2a2a', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>
                          <div>Movie: {selectedMovie.title}</div>
                          <div>Showtime: {selectedTime}</div>
                          <div>Seats: {selectedSeats.join(', ')}</div>
                          <div style={{ fontSize: '1.2rem', color: '#e50914', marginTop: '0.5rem' }}>
                            Total: ₹{selectedSeats.length * 250}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                          type="button" 
                          className="btn-secondary" 
                          onClick={() => setBookingStep(1)}
                          style={{ flex: 1 }}
                        >
                          Back
                        </button>
                        <button type="submit" className="btn-primary" style={{ flex: 2 }}>
                          Confirm Booking
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
