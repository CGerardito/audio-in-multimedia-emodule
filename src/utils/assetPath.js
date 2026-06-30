// src/utils/assetPath.js
export function asset(path) {
    // If path is already absolute (starts with http), return as-is
    if (path.startsWith('http')) return path
    // Otherwise, prefix with base URL
    const base = import.meta.env.BASE_URL
    // Remove leading slash from path if present, to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${base}${cleanPath}`
}