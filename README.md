# UTM Generator

Build UTM-tagged campaign URLs with live preview and a parameter breakdown table, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/seo-tools/utm-generator-online

## How It Works

`buildUrl()` reads all 6 input fields and appends non-empty UTM parameters as `encodeURIComponent`-encoded key-value pairs. The separator between the base URL and the query string is chosen as `?` if the URL contains no `?` yet, or `&` otherwise, correctly handling URLs that already have query parameters. `updateBreakdown` builds a table showing each active parameter name, its value, and a plain-English description. All inputs are wired to the `input` event so the preview and breakdown update live as the user types.

## Features

- 5 UTM parameters: utm_source, utm_medium, utm_campaign, utm_term, utm_content
- `encodeURIComponent` encoding for all parameter values
- Smart `?`/`&` separator (handles pre-existing query strings)
- Live URL preview on every keystroke
- Parameter breakdown table with descriptions
- Copy final URL to clipboard

## Browser APIs Used

- Clipboard API (`navigator.clipboard.writeText`)
- `encodeURIComponent`

## Code Structure

| File | Description |
|------|-------------|
| `utm-generator.js` | `buildUrl` (5-param assembly, `?`/`&` separator logic, `encodeURIComponent`), `updateBreakdown` table builder, live `input` event handler |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#utmBaseUrl` | Base URL input |
| `#utmSource` | utm_source value |
| `#utmMedium` | utm_medium value |
| `#utmName` | utm_campaign value |
| `#utmTerm` | utm_term value |
| `#utmContent` | utm_content value |
| `#utmPreviewUrl` | Live URL preview |
| `#utmBreakdown` | Parameter breakdown table |
| `#utmCopy` | Copy URL to clipboard |
| `#utmClear` | Reset all fields |

## License

MIT
