import apiRequestRawHtml from "./apiRequestRawHtml";
import DomParser from "dom-parser";

/**
 * Fetches keywords for a given IMDb title ID.
 * @param {string} id - IMDb title ID (e.g., "tt10233448").
 * @returns {Promise<Object>} - JSON object with keywords.
 */
export default async function getKeywords(id) {
  const parser = new DomParser();
  const html = await apiRequestRawHtml(
    `https://www.imdb.com/title/${id}/keywords/?ref_=tt_stry_kw`
  );
  const dom = parser.parseFromString(html);
  const keywordElements = dom.getElementsByClassName(
    "ipc-metadata-list-summary-item__t"
  );

  const keywords = keywordElements.map((e) => e.textContent.trim());

  return { keywords };
}
