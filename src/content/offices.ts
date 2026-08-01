/**
 * Office locations. Drives the Contact page, the footer, and the
 * PostalAddress JSON-LD emitted for local search.
 *
 * All addresses are from public listings. // VERIFY before launch.
 */

export type Office = {
  id: string;
  city: string;
  region: string;
  country: 'Canada' | 'United States';
  /** ISO 3166-1 alpha-2, for schema.org PostalAddress. */
  countryCode: 'CA' | 'US';
  street: string;
  locality: string;
  /** Province or state code. */
  regionCode: string;
  postalCode: string;
  /** IANA zone — powers the local-time readout in the office grid. */
  timeZone: string;
  /** Marks the head office. Exactly one office should set this. */
  isHeadquarters?: boolean;
};

export const offices: Office[] = [
  {
    id: 'toronto',
    city: 'Toronto',
    region: 'Ontario',
    country: 'Canada',
    countryCode: 'CA',
    street: '105 Adelaide Street West, Suite 820',
    locality: 'Toronto',
    regionCode: 'ON',
    postalCode: 'M5H 1P9',
    timeZone: 'America/Toronto',
    isHeadquarters: true,
  },
  {
    id: 'montreal',
    city: 'Montreal',
    region: 'Quebec',
    country: 'Canada',
    countryCode: 'CA',
    street: '1155 René-Lévesque Boulevard West, Suite 1005',
    locality: 'Montreal',
    regionCode: 'QC',
    postalCode: 'H3B 2J6',
    timeZone: 'America/Toronto',
  },
  {
    id: 'calgary',
    city: 'Calgary',
    region: 'Alberta',
    country: 'Canada',
    countryCode: 'CA',
    street: '215 9 Avenue SW, Suite 1920',
    locality: 'Calgary',
    regionCode: 'AB',
    postalCode: 'T2P 1K3',
    timeZone: 'America/Edmonton',
  },
  {
    id: 'vancouver',
    city: 'Vancouver',
    region: 'British Columbia',
    country: 'Canada',
    countryCode: 'CA',
    street: '543 Granville Street, Suite 1500',
    locality: 'Vancouver',
    regionCode: 'BC',
    postalCode: 'V6C 1X8',
    timeZone: 'America/Vancouver',
  },
  {
    id: 'minneapolis',
    city: 'Minneapolis',
    region: 'Minnesota',
    country: 'United States',
    countryCode: 'US',
    street: '7801 East Bush Lake Road, Suite 350',
    locality: 'Bloomington',
    regionCode: 'MN',
    postalCode: '55439',
    timeZone: 'America/Chicago',
  },
];

export const headquarters: Office =
  offices.find((office) => office.isHeadquarters) ?? (offices[0] as Office);

/** One-line address, for compact contexts like the footer. */
export function formatAddress(office: Office): string {
  return `${office.street}, ${office.locality}, ${office.regionCode} ${office.postalCode}`;
}
