// IbizaItinerary.jsx
import React, { useState } from 'react';
import DocumentUpload from './DocumentUpload';
import { Calendar, MapPin, Users, Clock, Plane, Music, Utensils, Ship, Sparkles, CheckCircle, AlertCircle, Sun, Moon, Wine, Activity, Anchor, Coffee, Star } from 'lucide-react';

const IbizaItinerary = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [showOpsNotes, setShowOpsNotes] = useState(false);

  const tripData = {
    title: "Edmundos - Ibiza Escape",
    dates: "5-8 September 2025",
    location: "Villa Can Corinthia, San Rafael",
    guests: 6,
    tagline: "An Exclusive Members Experience"
  };

  const days = [
    {
      date: "Friday 05 Sept",
      title: "Opening Night at Ushuaïa",
      icon: "🎩",
      gradient: "linear-gradient(135deg, #2B1810 0%, #4A2C1A 100%)",
      events: [
        { time: "~10:05", icon: Plane, title: "Arrival in Ibiza", details: "Airport arrival & private transfer", status: "confirmed" },
        { time: "12:00", icon: Wine, title: "Welcome Champagne Reception", details: "Villa welcome with Cuban cigars & champagne", status: "confirmed" },
        { time: "12:00-16:30", icon: Sun, title: "Villa Leisure", details: "Poolside beats, light bites, premium cigars on terrace", status: "confirmed" },
        { time: "16:30", icon: MapPin, title: "Transfer to Ushuaïa", details: "Private group transportation", status: "confirmed" },
        { time: "17:00-22:30", icon: Music, title: "Calvin Harris @ Ushuaïa", details: "VIP day table experience", status: "confirmed" },
        { time: "22:45", icon: Utensils, title: "Hells Kitchen", details: "Poolside dining, prime cuts & cigars", status: "confirmed" },
        { time: "00:30+", icon: Moon, title: "Villa Nightcap", details: "Poolside chill & curated playlist", status: "confirmed" }
      ],
      ops: [
        { task: "Terrace ashtrays", owner: "Omar", status: "complete", note: "Sourced by Charles" },
        { task: "Hells Kitchen reservation", owner: "WR", status: "complete" },
        { task: "Villa midnight playlist", owner: "WR", status: "complete" }
      ]
    },
    {
      date: "Saturday 06 Sept",
      title: "Spa Zen & Black Coffee",
      icon: "🍃",
      gradient: "linear-gradient(135deg, #5D3317 0%, #7A4A1A 100%)",
      events: [
        { time: "09:00-10:00", icon: Coffee, title: "Villa Breakfast", details: "Continental & cooked options", status: "confirmed" },
        { time: "11:00-16:00", icon: Activity, title: "Atzaró Spa Day Pass", details: "Full spa access, cigars permitted in bar", status: "confirmed" },
        { time: "18:00-21:00", icon: Ship, title: "Sunset Cruise", details: "Private charter with champagne", status: "confirmed" },
        { time: "21:30", icon: Utensils, title: "TATEL Ibiza", details: "Glamorous terrace dining", status: "confirmed" },
        { time: "00:30", icon: Music, title: "Black Coffee @ Hï", details: "Deep house experience (Optional)", status: "optional" }
      ],
      ops: [
        { task: "Atzaró spa booking", owner: "WR", status: "complete", note: "6 day passes confirmed" },
        { task: "TATEL reservation", owner: "WR", status: "complete", note: "Terrace table secured" },
        { task: "Sunset cruise", owner: "WR", status: "complete", note: "Captain briefed" }
      ]
    },
    {
      date: "Sunday 07 Sept",
      title: "Blue Marlin & Stargazing",
      icon: "⭐",
      gradient: "linear-gradient(135deg, #2B1810 0%, #C9943A 100%)",
      events: [
        { time: "09:00-12:00", icon: Sun, title: "Villa Leisure", details: "Late rise, pickle ball & cricket", status: "confirmed" },
        { time: "13:00-00:00", icon: Anchor, title: "Blue Marlin Beach Club", details: "Full day experience with dinner", status: "confirmed" },
        { time: "01:00", icon: Star, title: "Rooftop Stargazing", details: "Bespoke bar setup & cigars", status: "confirmed" }
      ],
      ops: [
        { task: "Blue Marlin table", owner: "WR", status: "complete", note: "Premium beachfront secured" },
        { task: "Stargazing setup", owner: "WR", status: "complete", note: "Rooftop bar arranged" }
      ]
    },
    {
      date: "Monday 08 Sept",
      title: "Farewell in Style",
      icon: "🥂",
      gradient: "linear-gradient(135deg, #4A2C1A 0%, #5D3317 100%)",
      events: [
        { time: "10:00", icon: Wine, title: "Villa Brunch", details: "Final celebration & memories", status: "confirmed" },
        { time: "12:00-14:00", icon: Clock, title: "Free Time", details: "Packing & personal time", status: "confirmed" },
        { time: "14:30", icon: Utensils, title: "El Chiringuito", details: "Es Cavallet beachfront farewell", status: "confirmed" },
        { time: "18:00-19:00", icon: Plane, title: "Airport Transfer", details: "Departure to Ibiza airport", status: "confirmed" }
      ],
      ops: [
        { task: "El Chiringuito booking", owner: "WR", status: "complete", note: "Beachfront table reserved" },
        { task: "Villa checkout", owner: "All", status: "pending", note: "Smooth checkout procedure" }
      ]
    }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0D0806 0%, #2B1810 50%, #4A2C1A 100%)',
      fontFamily: '"Playfair Display", Georgia, serif',
      color: '#F4E6D3',
      position: 'relative',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(135deg, rgba(43, 24, 16, 0.95) 0%, rgba(74, 44, 26, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '2px solid #C9943A',
      padding: '2rem',
      position: 'relative',
      boxShadow: '0 4px 30px rgba(0,0,0,0.7)'
    },
    churchill: {
      position: 'absolute',
      right: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '60px',
      height: '60px',
      opacity: 0.4,
      background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23C9943A' d='M50 10c-20 0-35 15-35 35s15 35 35 35c15 0 28-10 33-23l-5-3c-4 10-14 18-26 18-15 0-27-12-27-27s12-27 27-27c10 0 19 5 23 13l5-3C75 18 63 10 50 10z'/%3E%3C/svg%3E")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      letterSpacing: '-0.01em',
      marginBottom: '0.5rem',
      color: '#F4E6D3',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#C9943A',
      fontStyle: 'italic',
      marginBottom: '1rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      fontWeight: '400'
    },
    details: {
      display: 'flex',
      gap: '2rem',
      fontSize: '0.95rem',
      color: '#D4B896'
    },
    nav: {
      display: 'flex',
      gap: '0.5rem',
      padding: '1.5rem',
      background: 'rgba(43, 24, 16, 0.3)',
      borderBottom: '1px solid rgba(201, 148, 58, 0.3)'
    },
    dayButton: {
      flex: 1,
      padding: '1rem',
      borderRadius: '8px',
      border: '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    dayButtonActive: {
      border: '2px solid #C9943A',
      boxShadow: '0 4px 20px rgba(201, 148, 58, 0.3)'
    },
    content: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    dayHeader: {
      padding: '2rem',
      borderRadius: '12px',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
    },
    dayTitle: {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#F4E6D3',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    eventsGrid: {
      display: 'grid',
      gap: '1rem',
      marginBottom: '2rem'
    },
    eventCard: {
      background: 'rgba(43, 24, 16, 0.4)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(201, 148, 58, 0.2)',
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative'
    },
    eventCardHover: {
      transform: 'translateX(8px)',
      background: 'rgba(43, 24, 16, 0.6)',
      borderColor: '#C9943A',
      boxShadow: '0 4px 20px rgba(201, 148, 58, 0.25)'
    },
    timeBox: {
      background: 'rgba(201, 148, 58, 0.2)',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#C9943A',
      minWidth: '100px',
      textAlign: 'center'
    },
    iconBox: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(74, 44, 26, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#D4B896'
    },
    opsSection: {
      background: 'rgba(74, 44, 26, 0.2)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(212, 184, 150, 0.3)'
    },
    opsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid rgba(201, 148, 58, 0.2)'
    },
    opsTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#C9943A',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    toggleButton: {
      background: 'rgba(201, 148, 58, 0.2)',
      border: '1px solid #C9943A',
      color: '#C9943A',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
      fontWeight: '500'
    },
    opsGrid: {
      display: 'grid',
      gap: '0.75rem'
    },
    opsItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.75rem',
      background: 'rgba(43, 24, 16, 0.3)',
      borderRadius: '8px',
      fontSize: '0.9rem',
      border: '1px solid transparent',
      transition: 'all 0.3s ease'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    completeStatus: {
      background: 'rgba(74, 44, 26, 0.4)',
      color: '#D4B896'
    },
    pendingStatus: {
      background: 'rgba(201, 148, 58, 0.3)',
      color: '#C9943A'
    },
    optionalBadge: {
      position: 'absolute',
      top: '0.75rem',
      right: '0.75rem',
      background: 'rgba(139, 69, 39, 0.4)',
      color: '#C9943A',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.7rem',
      fontWeight: '600',
      textTransform: 'uppercase'
    }
  };

  const [hoveredEvent, setHoveredEvent] = useState(null);

  return (
    <div style={styles.container}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(201, 148, 58, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.churchill} />
        <h1 style={styles.title}>{tripData.title}</h1>
        <button
          onClick={() => { localStorage.removeItem('isAuthenticated'); window.location.reload(); }}
          style={{ position: 'absolute', left: '2rem', top: '2rem', ...styles.toggleButton }}
        >
          Logout
        </button>
        <p style={styles.subtitle}>{tripData.tagline}</p>
        <div style={styles.details}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} /> {tripData.dates}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} /> {tripData.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} /> {tripData.guests} Distinguished Guests
          </span>
        </div>
      </div>

      {/* Day Navigation */}
      <div style={styles.nav}>
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index)}
            style={{
              ...styles.dayButton,
              background: day.gradient,
              opacity: activeDay === index ? 1 : 0.7,
              ...(activeDay === index ? styles.dayButtonActive : {})
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{day.icon}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#F4E6D3' }}>{day.date.split(' ')[1]} {day.date.split(' ')[2]}</div>
            <div style={{ fontSize: '0.75rem', color: '#C9943A', marginTop: '0.25rem' }}>{day.title}</div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Day Header */}
        <div style={{
          ...styles.dayHeader,
          background: days[activeDay].gradient
        }}>
          <h2 style={styles.dayTitle}>
            <span style={{ fontSize: '2rem' }}>{days[activeDay].icon}</span>
            {days[activeDay].date} — {days[activeDay].title}
          </h2>
        </div>

        {/* Events */}
        <div style={styles.eventsGrid}>
          {days[activeDay].events.map((event, index) => (
            <div
              key={index}
              style={{
                ...styles.eventCard,
                ...(hoveredEvent === index ? styles.eventCardHover : {})
              }}
              onMouseEnter={() => setHoveredEvent(index)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {event.status === 'optional' && (
                <div style={styles.optionalBadge}>Optional</div>
              )}
              <div style={styles.timeBox}>{event.time}</div>
              <div style={styles.iconBox}>
                <event.icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#F4E6D3' }}>
                  {event.title}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#D4B896' }}>
                  {event.details}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Operations Notes */}
        <div style={styles.opsSection}>
          <div style={styles.opsHeader}>
            <h3 style={styles.opsTitle}>
              <AlertCircle size={20} />
              Operations & Logistics
            </h3>
            <button
              onClick={() => setShowOpsNotes(!showOpsNotes)}
              style={{
                ...styles.toggleButton,
                background: showOpsNotes ? '#C9943A' : 'rgba(201, 148, 58, 0.2)',
                color: showOpsNotes ? '#0D0806' : '#C9943A'
              }}
            >
              {showOpsNotes ? 'Hide Details' : 'Show Details'}
            </button>
          </div>

          {showOpsNotes && (
            <div style={styles.opsGrid}>
              {days[activeDay].ops.map((op, index) => (
                <div key={index} style={styles.opsItem}>
                  <CheckCircle size={16} style={{ color: op.status === 'complete' ? '#D4B896' : '#C9943A' }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: '#F4E6D3' }}>{op.task}</strong>
                    <span style={{ color: '#D4B896', marginLeft: '0.5rem' }}>— {op.owner}</span>
                    {op.note && (
                      <div style={{ fontSize: '0.8rem', color: '#C9943A', marginTop: '0.25rem', fontStyle: 'italic' }}>
                        {op.note}
                      </div>
                    )}
                  </div>
                  <div style={{
                    ...styles.statusBadge,
                    ...(op.status === 'complete' ? styles.completeStatus : styles.pendingStatus)
                  }}>
                    {op.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Confirmations Upload */}
      <DocumentUpload />
    </div>
  );
};

export default IbizaItinerary;