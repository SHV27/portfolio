/* ============================================================================
   THE PAINTINGS INSIDE AAINA.

   Aaina contains no stock photography, no generated imagery and no human faces.
   Every image in it is a crop of a named, CC0-licensed Indian painting held by a
   museum that has waived copyright in writing, and the app prints the accession
   number under each one so you can go and look it up yourself.

   These ten sat unused in this repository for weeks, which was a waste. They are
   the most beautiful thing either project owns, and the fact that a relationship
   assessment is illustrated with Company School bird studies and Ragamala
   miniatures rather than stock vectors IS the argument about taste.

   Generated from SHV27/aaina src/plates.ts — the same data the live app renders.
   ========================================================================== */
import pParrot from '../assets/shots/aaina/parrot.jpg';
import pHoopoe from '../assets/shots/aaina/hoopoe.jpg';
import pFalcon from '../assets/shots/aaina/falcon.jpg';
import pHorse from '../assets/shots/aaina/horse.jpg';
import pShriRaga from '../assets/shots/aaina/shri-raga.jpg';
import pMaruRagini from '../assets/shots/aaina/maru-ragini.jpg';
import pDyer from '../assets/shots/aaina/dyer.jpg';
import pUtka from '../assets/shots/aaina/utka.jpg';
import pFruitBat from '../assets/shots/aaina/fruit-bat.jpg';
import pStork from '../assets/shots/aaina/stork.jpg';

export interface Painting {
  src: ImageMetadata;
  title: string;
  date: string;
  school: string;
  holder: string;
  acc: string;
  page: string;
}
type ImageMetadata = import('astro').ImageMetadata;

export const PAINTINGS: Painting[] = [
  {
    src: pParrot,
    title: "Green Parrot",
    date: "c. 1820",
    school: "Company School",
    holder: "Cleveland Museum of Art",
    acc: "1972.285",
    page: "https://clevelandart.org/art/1972.285",
  },
  {
    src: pHoopoe,
    title: "Hoopoe on a Citrus Tree Branch",
    date: "c. 1800",
    school: "Company School, Calcutta",
    holder: "Cleveland Museum of Art",
    acc: "1990.67",
    page: "https://clevelandart.org/art/1990.67",
  },
  {
    src: pFalcon,
    title: "Falcon on a Perch",
    date: "c. 1610",
    school: "Rajput Kingdom of Amber",
    holder: "Cleveland Museum of Art",
    acc: "2018.165",
    page: "https://clevelandart.org/art/2018.165",
  },
  {
    src: pHorse,
    title: "A Saddled Horse",
    date: "c. 1750",
    school: "Pahari kingdoms",
    holder: "Cleveland Museum of Art",
    acc: "1968.106",
    page: "https://clevelandart.org/art/1968.106",
  },
  {
    src: pShriRaga,
    title: "Shri Raga, from a Ragamala",
    date: "c. 1695",
    school: "Mewar",
    holder: "Cleveland Museum of Art",
    acc: "1931.451",
    page: "https://clevelandart.org/art/1931.451",
  },
  {
    src: pMaruRagini,
    title: "Maru Ragini, from a Ragamala",
    date: "1650\u201380",
    school: "Amber / Deccan",
    holder: "Cleveland Museum of Art",
    acc: "2018.168",
    page: "https://clevelandart.org/art/2018.168",
  },
  {
    src: pDyer,
    title: "Man Dyeing Cloth",
    date: "early 1830s",
    school: "Company School, Lucknow",
    holder: "Cleveland Museum of Art",
    acc: "1992.142",
    page: "https://clevelandart.org/art/1992.142",
  },
  {
    src: pUtka,
    title: "Utka Nayika \u2014 the heroine who waits",
    date: "c. 1800",
    school: "Pahari",
    holder: "Cleveland Museum of Art",
    acc: "1932.118",
    page: "https://clevelandart.org/art/1932.118",
  },
  {
    src: pFruitBat,
    title: "Great Indian Fruit Bat",
    date: "c. 1777\u201382",
    school: "Bhawani Das, Company School, Calcutta",
    holder: "The Metropolitan Museum of Art",
    acc: "2008.312",
    page: "https://www.metmuseum.org/art/collection/search/456949",
  },
  {
    src: pStork,
    title: "Black Stork in a Landscape",
    date: "c. 1780",
    school: "Company School",
    holder: "The Metropolitan Museum of Art",
    acc: "2008.313",
    page: "https://www.metmuseum.org/art/collection/search/454011",
  },
];
