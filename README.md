# KD-CAR Website

Eine moderne, responsive Website für KD-CAR - Autoaufbereitung und mehr. Diese Website wurde mit Next.js, React, TypeScript und Tailwind CSS erstellt und bietet eine beeindruckende Benutzererfahrung mit Animationen und modernem Design.

## 🚗 Features

- **Hero Section mit Supercar Video**: Beeindruckender Hero-Bereich mit Video-Hintergrund
- **Moderne UI/UX**: Responsive Design mit Tailwind CSS und Framer Motion
- **Professionelle Services**: Detaillierte Darstellung aller Autoaufbereitungsleistungen
- **Kontaktformular**: Funktionales Kontaktformular für Terminvereinbarungen
- **Animationen**: Smooth Animations und Hover-Effekte
- **Mobile-First**: Vollständig responsive für alle Geräte

## 🛠️ Technologien

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Next.js App Router

## 📋 Voraussetzungen

- Node.js 18+ 
- npm oder yarn

## 🚀 Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd kd-car-website
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   # oder
   yarn install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   # oder
   yarn dev
   ```

4. **Browser öffnen**
   Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

## 📁 Projektstruktur

```
kd-car-website/
├── app/                    # Next.js App Router
│   ├── globals.css        # Globale Styles
│   ├── layout.tsx         # Root Layout
│   └── page.tsx           # Hauptseite
├── components/             # React Komponenten
│   ├── Header.tsx         # Navigation Header
│   ├── HeroSection.tsx    # Hero Bereich mit Video
│   ├── ServicesSection.tsx # Services Übersicht
│   ├── AboutSection.tsx   # Über uns Sektion
│   ├── ContactSection.tsx # Kontaktformular
│   └── Footer.tsx         # Footer
├── public/                 # Statische Dateien
├── tailwind.config.js     # Tailwind Konfiguration
├── next.config.js         # Next.js Konfiguration
└── package.json           # Dependencies
```

## 🎨 Anpassungen

### Farben ändern
Bearbeiten Sie die Farben in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#0ea5e9', // Hauptfarbe
    600: '#0284c7',
  },
  accent: {
    500: '#eab308', // Akzentfarbe
  }
}
```

### Video ändern
Ersetzen Sie den Video-Link in `components/HeroSection.tsx`:

```tsx
<source src="IHRE_VIDEO_URL" type="video/mp4" />
```

### Bilder ändern
Alle Bilder sind über Unsplash URLs verlinkt. Ersetzen Sie diese mit Ihren eigenen Bildern:

```tsx
src="IHRE_BILD_URL"
```

## 📱 Responsive Design

Die Website ist vollständig responsive und funktioniert auf:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Vercel (Empfohlen)
1. Verbinden Sie Ihr GitHub Repository mit Vercel
2. Vercel erkennt automatisch Next.js und deployed die Website
3. Jeder Push auf main branch triggert ein neues Deployment

### Andere Hosting-Provider
1. Build der Produktionsversion:
   ```bash
   npm run build
   ```

2. Start der Produktionsversion:
   ```bash
   npm start
   ```

## 🔧 Verfügbare Scripts

- `npm run dev` - Startet den Entwicklungsserver
- `npm run build` - Erstellt die Produktionsversion
- `npm run start` - Startet die Produktionsversion
- `npm run lint` - Führt ESLint aus

## 📞 Support

Bei Fragen oder Problemen:
- E-Mail: info@kd-car.de
- Telefon: +49 123 456 789

## 📄 Lizenz

Dieses Projekt ist unter der MIT Lizenz lizenziert.

---

**KD-CAR** - Autoaufbereitung und mehr. Qualität, die begeistert. Service, der überzeugt.
