# Email Setup für KD-CAR Website

## 📧 E-Mail-Funktionalität einrichten

Diese Anleitung erklärt, wie Sie die E-Mail-Funktionalität für das Kontaktformular einrichten.

## 🚀 Schnellstart

### 1. Umgebungsvariablen konfigurieren

Kopieren Sie die Datei `env.example` zu `.env.local`:

```bash
cp env.example .env.local
```

### 2. .env.local bearbeiten

Öffnen Sie `.env.local` und tragen Sie Ihre E-Mail-Daten ein:

```env
# SMTP Server Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ihre-email@gmail.com
SMTP_PASS=ihr-app-passwort

# Optional: Custom from address
SMTP_FROM=noreply@kd-car.de

# Kontakt-E-Mail für Formular-Eingaben
CONTACT_EMAIL=inf@kd-car.de
```

## 🔧 Gmail-Konfiguration

### Für Gmail-Benutzer:

1. **2-Faktor-Authentifizierung aktivieren**
   - Gehen Sie zu Ihren Google-Kontoeinstellungen
   - Aktivieren Sie 2FA

2. **App-Passwort generieren**
   - Gehen Sie zu "Sicherheit" → "App-Passwörter"
   - Wählen Sie "Mail" als App
   - Kopieren Sie das generierte Passwort
   - Verwenden Sie dieses Passwort in `SMTP_PASS`

### Alternative E-Mail-Provider:

#### Outlook/Hotmail:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Yahoo:
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### Eigener SMTP-Server:
```env
SMTP_HOST=ihr-smtp-server.de
SMTP_PORT=587
SMTP_SECURE=false
```

## 🧪 Testen

1. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```

2. **Kontaktformular testen:**
   - Gehen Sie zur Kontaktseite
   - Füllen Sie das Formular aus
   - Senden Sie eine Test-Nachricht

3. **E-Mail überprüfen:**
   - Schauen Sie in den Posteingang der `CONTACT_EMAIL`
   - Überprüfen Sie den Spam-Ordner

## 📋 E-Mail-Template anpassen

Das E-Mail-Template kann in `app/api/contact/route.ts` angepasst werden:

- **HTML-Format:** Ändern Sie den `html`-Teil in `mailOptions`
- **Text-Format:** Ändern Sie den `text`-Teil in `mailOptions`
- **Betreff:** Ändern Sie die `subject`-Zeile

## 🛠️ Fehlerbehebung

### Häufige Probleme:

1. **"Authentication failed"**
   - Überprüfen Sie `SMTP_USER` und `SMTP_PASS`
   - Stellen Sie sicher, dass 2FA aktiviert ist (für Gmail)

2. **"Connection timeout"**
   - Überprüfen Sie `SMTP_HOST` und `SMTP_PORT`
   - Testen Sie die Verbindung mit einem E-Mail-Client

3. **"E-Mail wird nicht empfangen"**
   - Überprüfen Sie den Spam-Ordner
   - Überprüfen Sie `CONTACT_EMAIL`
   - Testen Sie mit einer anderen E-Mail-Adresse

### Debugging:

Fügen Sie temporär Logging hinzu:

```typescript
console.log('SMTP Config:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  // pass: '***' // Nicht loggen!
})
```

## 🔒 Sicherheit

- **Niemals** E-Mail-Passwörter in den Code einbetten
- Verwenden Sie immer `.env.local` (wird nicht ins Git-Repository hochgeladen)
- Überprüfen Sie regelmäßig Ihre App-Passwörter
- Verwenden Sie starke Passwörter

## 📞 Support

Bei Problemen:
1. Überprüfen Sie die Browser-Konsole
2. Überprüfen Sie die Server-Logs
3. Testen Sie mit einem einfachen E-Mail-Client
4. Überprüfen Sie die SMTP-Einstellungen Ihres Providers

---

**Wichtig:** Die `.env.local` Datei wird nicht ins Git-Repository hochgeladen. Stellen Sie sicher, dass Sie diese Datei auf Ihrem Server manuell erstellen.

