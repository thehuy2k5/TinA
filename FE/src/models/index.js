/** @typedef {'admin'|'leader'|'employee'} UserRole */
/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {number} [count]
 */

/**
 * @typedef {Object} Article
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} date
 * @property {string} [time]
 * @property {string} summary
 * @property {boolean} [featured]
 * @property {number} [readTime]
 * @property {string} [author]
 * @property {'blue'|'red'} [tone]
 */

/**
 * @typedef {Object} AudioEpisode
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {number} duration
 * @property {string} durationLabel
 * @property {string} date
 * @property {string} summary
 * @property {'blue'|'red'} [tone]
 * @property {string} [audioUrl]
 */

/**
 * @typedef {Object} ListeningEntry
 * @property {AudioEpisode} episode
 * @property {number} progress
 * @property {number} updatedAt
 */

/**
 * @typedef {Object} AppUser
 * @property {string} id
 * @property {string} name
 * @property {UserRole} role
 * @property {string} roleLabel
 * @property {string} department
 * @property {boolean} active
 */

export {}
