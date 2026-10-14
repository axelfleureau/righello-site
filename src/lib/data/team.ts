/**
 * Le persone gia' pubbliche sul sito: nome e ruolo, niente altro. "Chi siamo" le mostra,
 * i dati strutturati citano come fondatori solo chi lo e' (`founder`).
 * `pos` tiene il volto dentro il quadrato.
 */
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  pos: string;
  founder?: boolean;
}

export const team: TeamMember[] = [
  { name: 'Edis Bali', role: 'CEO e cofondatore', image: '/team/edis.webp', pos: '50% 30%', founder: true },
  { name: 'Paolo Aileni', role: 'COO e cofondatore', image: '/team/paolo.webp', pos: '50% 22%', founder: true },
  { name: 'Axel N. L. Fleureau', role: 'CTO e cofondatore', image: '/team/axel.webp', pos: '50% 18%', founder: true },
  { name: 'Omar ElKharroubi', role: 'Agente di commercio', image: '/team/omar.webp', pos: '50% 30%' },
];

export const founders = team.filter((m) => m.founder);
