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

  // Telugu Movies Data - Medium size collection with working images
  const movies = [
    {
      id: 1,
      title: "RRR",
      image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
      rating: 8.8,
      description: "A fictional story of two Indian revolutionaries and their fight against the British Raj.",
      genres: ["Action", "Drama", "Historical"],
      duration: "3h 7m",
      language: "Telugu",
      year: "2022"
    },
    {
      id: 2,
      title: "Baahubali 2",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      rating: 9.0,
      description: "The conclusion to the epic saga of Shivudu and his journey to become the king.",
      genres: ["Action", "Fantasy", "Drama"],
      duration: "2h 47m",
      language: "Telugu",
      year: "2017"
    },
    {
      id: 3,
      title: "Kalki 2898 AD",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
      rating: 8.5,
      description: "A sci-fi epic set in the future with mythological elements.",
      genres: ["Sci-Fi", "Action", "Adventure"],
      duration: "3h 0m",
      language: "Telugu",
      year: "2024"
    },
    {
      id: 4,
      title: "Salaar",
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
      rating: 8.2,
      description: "A story of friendship, betrayal, and power in a fictional city.",
      genres: ["Action", "Thriller", "Drama"],
      duration: "2h 55m",
      language: "Telugu",
      year: "2023"
    },
    {
      id: 5,
      title: "Pushpa",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=600&fit=crop",
      rating: 8.1,
      description: "The rise of a daily wage laborer in the red sandalwood smuggling world.",
      genres: ["Action", "Crime", "Drama"],
      duration: "2h 59m",
      language: "Telugu",
      year: "2021"
    },
    {
      id: 6,
      title: "Mahanati",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      rating: 8.9,
      description: "The biopic of legendary actress Savitri and her journey in cinema.",
      genres: ["Biography", "Drama", "History"],
      duration: "2h 57m",
      language: "Telugu",
      year: "2018"
    },
    {
      id: 7,
      title: "Jersey",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
      rating: 8.7,
      description: "A failed cricketer's journey to fulfill his dream of playing for India.",
      genres: ["Sports", "Drama", "Inspiration"],
      duration: "2h 37m",
      language: "Telugu",
      year: "2019"
    },
    {
      id: 8,
      title: "Ala Vaikunthapurramuloo",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400&h=600&fit=crop",
      rating: 8.4,
      description: "A man discovers his true identity and the family he never knew.",
      genres: ["Action", "Comedy", "Family"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2020"
    },
    {
      id: 9,
      title: "Dasara",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
      rating: 8.0,
      description: "A tale of friendship, love, and revenge in a rural village.",
      genres: ["Action", "Drama", "Thriller"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2023"
    },
    {
      id: 10,
      title: "Sir",
      image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=600&fit=crop",
      rating: 8.6,
      description: "A government school teacher's fight for the rights of his students.",
      genres: ["Drama", "Inspiration", "Social"],
      duration: "2h 50m",
      language: "Telugu",
      year: "2023"
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
      alert('🎉 Booking confirmed! Enjoy the movie!')
    }, 2000)
  }

  return (
    <div>
      {/* Navigation */}
      <nav style={{
        padding: '1rem 2rem',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🎬</span>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #ff6b6b, #ee5a24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>CineBook</span>
            <span style={{
              fontSize: '0.7rem',
              background: 'rgba(255, 107, 107, 0.2)',
              padding: '2px 10px',
              borderRadius: '20px',
              color: '#ff6b6b',
              marginLeft: '0.5rem'
            }}>Telugu</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#888' }}>
            <span style={{ cursor: 'pointer', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = '#ff6b6b'} onMouseLeave={e => e.target.style.color = '#888'}>Home</span>
            <span style={{ cursor: 'pointer', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = '#ff6b6b'} onMouseLeave={e => e.target.style.color = '#888'}>Movies</span>
            <span style={{ cursor: 'pointer', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = '#ff6b6b'} onMouseLeave={e => e.target.style.color = '#888'}>My Bookings</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        padding: '3rem 2rem',
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
          opacity: 0.08
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(255, 107, 107, 0.15)',
              padding: '0.3rem 1.2rem',
              borderRadius: '20px',
              color: '#ff6b6b',
              fontSize: '0.9rem'
            }}>🎥 Now Showing</span>
            <span style={{
              background: 'rgba(255, 215, 0, 0.15)',
              padding: '0.3rem 1.2rem',
              borderRadius: '20px',
              color: '#ffd700',
              fontSize: '0.9rem'
            }}>⭐ Top Rated</span>
            <span style={{
              background: 'rgba(0, 255, 200, 0.15)',
              padding: '0.3rem 1.2rem',
              borderRadius: '20px',
              color: '#00ffc8',
              fontSize: '0.9rem'
            }}>🔥 Trending</span>
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            margin: '1.5rem 0 0.5rem',
            background: 'linear-gradient(to right, #ff6b6b, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Book Your Telugu Movie Tickets
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#aaa', marginBottom: '1.5rem' }}>
            Experience the best of Tollywood in stunning quality
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ff6b6b' }}>10+</div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>Telugu Movies</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffd700' }}>8.5+</div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>Average Rating</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00ffc8' }}>50+</div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>Showtimes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{
        display: 'flex',
        gap: '0.8rem',
        flexWrap: 'wrap',
        marginBottom: '2rem',
        justifyContent: 'center'
      }}>
        <button style={{
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          cursor: 'pointer'
        }}>All Movies</button>
        <button style={{
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#888',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: '0.3s'
        }} onMouseEnter={e => { e.target.style.background = 'rgba(255, 107, 107, 0.1)'; e.target.style.color = '#ff6b6b' }} onMouseLeave={e => { e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.color = '#888' }}>Action</button>
        <button style={{
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#888',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: '0.3s'
        }} onMouseEnter={e => { e.target.style.background = 'rgba(255, 107, 107, 0.1)'; e.target.style.color = '#ff6b6b' }} onMouseLeave={e => { e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.color = '#888' }}>Drama</button>
        <button style={{
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#888',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: '0.3s'
        }} onMouseEnter={e => { e.target.style.background = 'rgba(255, 107, 107, 0.1)'; e.target.style.color = '#ff6b6b' }} onMouseLeave={e => { e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.color = '#888' }}>Comedy</button>
        <button style={{
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#888',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: '0.3s'
        }} onMouseEnter={e => { e.target.style.background = 'rgba(255, 107, 107, 0.1)'; e.target.style.color = '#ff6b6b' }} onMouseLeave={e => { e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.color = '#888' }}>Sci-Fi</button>
        <button style={{
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#888',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: '0.3s'
        }} onMouseEnter={e => { e.target.style.background = 'rgba(255, 107, 107, 0.1)'; e.target.style.color = '#ff6b6b' }} onMouseLeave={e => { e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.color = '#888' }}>Biography</button>
      </div>

      {/* Movie Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem'
      }}>
        {movies.map(movie => (
          <div key={movie.id} onClick={() => handleMovieClick(movie)} style={{
            background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
            borderRadius: '16px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative'
          }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.15)'
            e.currentTarget.style.borderColor = 'rgba(255, 107, 107, 0.3)'
          }} onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ position: 'relative' }}>
              <img src={movie.image} alt={movie.title} style={{
                width: '100%',
                height: '280px',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }} onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(255, 107, 107, 0.9)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                ⭐ {movie.rating}
              </div>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.8)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                color: '#ffd700'
              }}>
                {movie.year}
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                marginBottom: '0.3rem',
                color: '#fff'
              }}>{movie.title}</h3>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  background: 'rgba(255, 107, 107, 0.15)',
                  color: '#ff6b6b',
                  padding: '2px 10px',
                  borderRadius: '10px'
                }}>{movie.language}</span>
                <span style={{
                  fontSize: '0.7rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#888',
                  padding: '2px 10px',
                  borderRadius: '10px'
                }}>{movie.duration}</span>
              </div>
              <p style={{
                fontSize: '0.85rem',
                color: '#888',
                lineHeight: '1.4',
                marginBottom: '0.8rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>{movie.description}</p>
              <div style={{
                display: 'flex',
                gap: '0.3rem',
                flexWrap: 'wrap',
                marginBottom: '1rem'
              }}>
                {movie.genres.slice(0, 2).map((genre, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.65rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#aaa',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>{genre}</span>
                ))}
                {movie.genres.length > 2 && (
                  <span style={{
                    fontSize: '0.65rem',
                    color: '#555'
                  }}>+{movie.genres.length - 2}</span>
                )}
              </div>
              <button style={{
                width: '100%',
                padding: '0.7rem',
                fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }} onMouseEnter={e => e.target.style.transform = 'scale(1.02)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'}>
                Book Now 🎫
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBooking && selectedMovie && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }} onClick={() => setShowBooking(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '550px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative'
          }}>
            <button onClick={() => setShowBooking(false)} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: '0.3s'
            }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#888'}>✕</button>
            
            {bookingConfirmed ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                <h2 style={{ color: '#ff6b6b' }}>Booking Confirmed!</h2>
                <p style={{ color: '#888' }}>Thank you for booking with CineBook</p>
                <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '0.5rem' }}>Enjoy the movie! 🍿</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                  <img src={selectedMovie.image} alt={selectedMovie.title} style={{
                    width: '70px',
                    height: '90px',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }} />
                  <div>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '0.2rem' }}>{selectedMovie.title}</h2>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: '#ffd700' }}>⭐ {selectedMovie.rating}</span>
                      <span style={{ fontSize: '0.8rem', color: '#888' }}>• {selectedMovie.duration}</span>
                      <span style={{ fontSize: '0.8rem', color: '#ff6b6b' }}>• {selectedMovie.language}</span>
                    </div>
                  </div>
                </div>
                
                {bookingStep === 1 && (
                  <>
                    <h3 style={{ fontSize: '1rem', color: '#888', marginBottom: '0.8rem' }}>Select Showtime</h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                      gap: '10px',
                      marginBottom: '1.5rem'
                    }}>
                      {showtimes.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          style={{
                            background: selectedTime === time ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' : 'rgba(255, 255, 255, 0.05)',
                            color: selectedTime === time ? 'white' : '#888',
                            border: selectedTime === time ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '0.85rem'
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    <h3 style={{ fontSize: '1rem', color: '#888', margin: '1rem 0 0.8rem' }}>Select Seats</h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8, 1fr)',
                      gap: '6px',
                      marginBottom: '1rem'
                    }}>
                      {seats.map(seat => {
                        const isBooked = bookedSeats.includes(seat)
                        const isSelected = selectedSeats.includes(seat)
                        return (
                          <button
                            key={seat}
                            onClick={() => toggleSeat(seat)}
                            disabled={isBooked}
                            style={{
                              padding: '8px 0',
                              borderRadius: '6px 6px 0 0',
                              border: 'none',
                              cursor: isBooked ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s ease',
                              fontSize: '0.65rem',
                              background: isBooked ? '#111' : isSelected ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' : 'rgba(255, 255, 255, 0.05)',
                              color: isBooked ? '#444' : isSelected ? 'white' : '#666',
                              boxShadow: isSelected ? '0 0 20px rgba(255, 107, 107, 0.3)' : 'none'
                            }}
                          >
                            {seat}
                          </button>
                        )
                      })}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
                      <span style={{ color: '#888', fontSize: '0.8rem' }}>🟢 Available</span>
                      <span style={{ color: '#888', fontSize: '0.8rem' }}>🔴 Selected</span>
                      <span style={{ color: '#888', fontSize: '0.8rem' }}>⚫ Booked</span>
                    </div>

                    {selectedSeats.length > 0 && (
                      <div style={{ 
                        margin: '1rem 0', 
                        color: '#ff6b6b',
                        background: 'rgba(255, 107, 107, 0.1)',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        Selected: {selectedSeats.join(', ')} ({selectedSeats.length} seats)
                      </div>
                    )}

                    <button onClick={handleBooking} style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: '0.3s'
                    }}>
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
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: 'white',
                          marginBottom: '1rem',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: 'white',
                          marginBottom: '1rem',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: 'white',
                          marginBottom: '1rem',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                      />
                      
                      <div style={{ 
                        background: 'rgba(255, 255, 255, 0.05)', 
                        padding: '1rem', 
                        borderRadius: '10px',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                            <span>Movie:</span>
                            <span style={{ color: '#fff' }}>{selectedMovie.title}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                            <span>Showtime:</span>
                            <span style={{ color: '#ff6b6b' }}>{selectedTime}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                            <span>Seats:</span>
                            <span style={{ color: '#ffd700' }}>{selectedSeats.join(', ')}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <span style={{ fontSize: '1rem' }}>Total:</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff6b6b' }}>
                              ₹{selectedSeats.length * 250}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                          type="button" 
                          onClick={() => setBookingStep(1)}
                          style={{
                            flex: 1,
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#888',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '0.8rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: '0.3s'
                          }}
                        >
                          Back
                        </button>
                        <button type="submit" style={{
                          flex: 2,
                          padding: '0.8rem',
                          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                          border: 'none',
                          borderRadius: '10px',
                          color: 'white',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: '0.3s'
                        }}>
                          Confirm Booking ✅
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
