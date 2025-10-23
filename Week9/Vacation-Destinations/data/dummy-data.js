import Country from "../models/Country";
import Destination from "../models/Destination";

export const COUNTRIES = [
  new Country("c1", "Italy", "#F4A261"),
  new Country("c2", "Japan", "#E76F51"),
  new Country("c3", "Australia", "#2A9D8F"),
  new Country("c4", "France", "#457B9D"),
  new Country("c5", "Greece", "#3f8da0ff"),
  new Country("c6", "Brazil", "#F6BD60"),
  new Country("c7", "Egypt", "#E9C46A"),
  new Country("c8", "Canada", "#6D6875"),
  new Country("c9", "Thailand", "#43AA8B"),
  new Country("c10", "United States", "#C44536"),
];

export const DESTINATIONS = [
  // 🇮🇹 Italy
  new Destination(
    "d1",
    "c1",
    "Venice",
    2500,
    697,
    4.8,
    "Famous for its canals and romantic gondola rides through centuries-old waterways.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqIniuus7uR7FHeRdJUNBXJnU0gz5Du8UlMeWR6lncjfQsQBtNLAhEL_Ntm3rr-v_KlWJ0XY55jOScCVFlDwfNgxYIBpB9_Iw0iEkC5SYqzl9XyePQk4QZll7uzvtHixMdjRpop=w408-h507-k-no"
  ),
  new Destination(
    "d2",
    "c1",
    "Rome",
    2200,
    -753,
    4.9,
    "The Eternal City—home to the Colosseum, Vatican City, and a wealth of ancient history.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4no2CJYEVpDE7WJTgTEWTaGFxhbEB68LBLocLruuB4gWuAA2Lt-B1mWYshhENVVURNKDfxbl0LjTe4MSba2cLfVfazxKXVeZhfXbBjeiYZFPJzyiEro6D7SS8PouR9xDnzO7eLa_=w408-h494-k-no"
  ),

  // 🇯🇵 Japan
  new Destination(
    "d3",
    "c2",
    "Kyoto",
    2100,
    794,
    4.8,
    "Historic temples, traditional tea houses, and stunning cherry blossoms in spring.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrfgglFEoCFF_0CLR6XNgvBzDS-md-aygTXv8GXdBDxDO7LjtWWFn5F5QTQmmXV1suma3srIEmXat5ji1QJBkumdhMLUxlVKsYgUP2WI3KwVMv5i5Xmot8bcyxve4fVtTobhmLw=w408-h306-k-no"
  ),
  new Destination(
    "d4",
    "c2",
    "Tokyo",
    2700,
    1603,
    4.7,
    "A dazzling mix of tradition and technology—world-class dining, shopping, and culture.",
    "https://media.istockphoto.com/id/912274822/photo/mt-fuji-and-tokyo-skyline.webp?a=1&b=1&s=612x612&w=0&k=20&c=gTm0cl-_PACp3jpysgqKLg0176yPqIEQtpnzwOrTscs="
  ),

  // 🇦🇺 Australia
  new Destination(
    "d5",
    "c3",
    "Sydney",
    2400,
    1788,
    4.8,
    "Home to the iconic Opera House and Harbour Bridge, with a vibrant coastal culture.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqatG4-egl-ab5aewD8lXtS59-b6rE3pw6cWD766BMNeBkbWDR2hxQzBRZDD1-o7zLRmzehRXnEvtllz81lsh_iu0Z5MLeMcFnx-ExKFhRtypV1xgIxPLn9zMRHRCBac00fLROXpw=w408-h255-k-no"
  ),
  new Destination(
    "d6",
    "c3",
    "Great Barrier Reef",
    2800,
    1770,
    4.9,
    "The world’s largest coral reef system—perfect for diving, snorkeling, and marine life exploration.",
    "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyUTdhDF581h-e7cuh-mS4on5JMzv4OprcIccn-Cpq2D2Ep0a2uYqQeisZxjW2B6DerUAjJ4ucQHJUugBNn_fVCm5ZJVCk6mLSRIhl4-jf9cHvJOYCkGklpUiWtoIs9vejiao_0QA=w408-h271-k-no"
  ),

  // 🇫🇷 France
  new Destination(
    "d7",
    "c4",
    "Paris",
    2600,
    -52,
    4.9,
    "The City of Light—renowned for art, fashion, gastronomy, and landmarks like the Eiffel Tower.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npJ8pwnZFxKAwCAB43NqscZ9XnF6tRll9TkOF3g5s0pt7FhNi9QK9RFAQaKm2toikVgZpzpw0oVamyRV5Rq2Jk9KmKHznTUMyNTD2WDoCSi1B0vv_x9nAk85MI6_pTjfj3o6ykl=w408-h272-k-no"
  ),
  new Destination(
    "d8",
    "c4",
    "Nice",
    2300,
    350,
    4.7,
    "A coastal gem on the French Riviera with beautiful beaches and vibrant local markets.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4no3EYNEumhwjBzQ4ISY4AF_oQXqc9jUStztQhAdt3j8dsZBR8U31quanB6ZMGSQ3nYRLmJ9HV0hgDH1cc_0mRj26k7Lw_IhyJ5R9RlBH6xkWfroBxW9Otv8eQJBlQv_UIkhPvgA=w408-h724-k-no"
  ),

  // 🇬🇷 Greece
  new Destination(
    "d9",
    "c5",
    "Santorini",
    2600,
    -3000,
    4.8,
    "Picturesque whitewashed buildings overlooking crystal-clear blue seas and sunsets to remember.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq-pGoFiDUiyQ4yUPbTvSgTngAudGJMp-93w0mDmqz85j9R1N_gfxUJRp_r7ymBRXrVcYSOLs3d-2nK1QL96KpIVEshjOqwHKu8cTx_qwUq-89a8gAtOlb90UnGwUDa_iqlKkT0Aw=w408-h544-k-no"
  ),
  new Destination(
    "d10",
    "c5",
    "Athens",
    2000,
    -508,
    4.6,
    "The cradle of Western civilization, full of ancient ruins and lively modern neighborhoods.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4no-jKucHjpz1tte049bbkuvVy-oXE2VeCkrmuGG_bNMo5hV3bqNhRXImmbqTYPwNUZibY5oDu85Dkr0Ppzql1E51lpAaHCx2llUOTzIU-MamHkyZNGda1h75Zp4jrA3mIPG8gA=w426-h240-k-no"
  ),

  // 🇧🇷 Brazil
  new Destination(
    "d11",
    "c6",
    "Rio de Janeiro",
    2300,
    1565,
    4.8,
    "Known for Copacabana Beach, Sugarloaf Mountain, and the vibrant Carnival festival.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqjzn_D09G8WLTff0P-uWWd8cT6ZhsiCEIdq3_0rW4biHUwQQk3IGyBMdAvzGLX6dU64vgsKMNbifaRBzEKtOGtDkyFMJPt3O0n-zOTVOlhgqTbZQtTlGU5MvpOVSayb5p_xMm4=w408-h503-k-no"
  ),
  new Destination(
    "d12",
    "c6",
    "Salvador",
    1900,
    1549,
    4.7,
    "Colorful streets, historic colonial architecture, and Afro-Brazilian cultural roots.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqs-5j5Nwr8r6ZlEwssdl33GAeXFeTvQ1npPhM46TFwQaq2FUxGL0jTRVwI7UJ30-LLVFyQenNHzH22Sb8eQ6xNYO79akmUaD-dmtxawb6avsRBc7ksd2kRa34tu-9VTj53ld7gzQ=w537-h240-k-no"
  ),

  // 🇪🇬 Egypt
  new Destination(
    "d13",
    "c7",
    "Cairo",
    2200,
    -3100,
    4.7,
    "Bustling capital city home to the Great Pyramids of Giza and ancient Egyptian treasures.",
    "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwOGGaE9UannOGxR9tt_DKOwN7tBKe07hqYzRnSjhooobQqIW7rUs0q_KGSdkAKz-khvMTpvcdXXZRJ9p11i9-r6xd0a_taTLhRXzemkqgi_wr32G5UMf14r4VeYX7ckYY8CDiw=w408-h550-k-no"
  ),
  new Destination(
    "d14",
    "c7",
    "Luxor",
    2100,
    -1500,
    4.8,
    "An open-air museum along the Nile—ancient temples and royal tombs await.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nopBCRTdNfzStjzaQb2lRqXPD8do4DYbIl__Y9fQNZxVeewK1R9J-PuONUAVkQ5BGgKZoXn0Uu92gVpcNm5qpCcifRSqm11qxvD5jlVcoC7r9MRUY0Ef9OEBolIvePmGHkCOBqw8Q=w408-h273-k-no"
  ),

  // 🇨🇦 Canada
  new Destination(
    "d15",
    "c8",
    "Banff",
    2500,
    1885,
    4.9,
    "Nestled in the Rocky Mountains, Banff offers stunning alpine scenery and cozy lodges.",
    "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSx6hpU4kH5sMlEUenO2UXgojvwxuywJj39egpua5_SOY4kHOOPK_nvQ17Bn0LwAmOK0hz_aZUZAOp0wLiO7L25itzQb4WZ96hCynFR9DP4jdkSgMRnpCthrbGOmFLITULNAAH72=w408-h873-k-no"
  ),
  new Destination(
    "d16",
    "c8",
    "Vancouver",
    2300,
    1886,
    4.8,
    "A coastal metropolis surrounded by mountains, with vibrant culture and outdoor adventures.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nooKXsYE0NjFlwy5lJ_qctKXq0eVHptVvHyLJ1dXkwH7z88iOzkCdQuAGDbHRWLpZq3nG5Xt_FTYpkCrh7XRmmHIJAaEHB7hh4YkmJ-uEMNgblFDdi-yAZGM6-0eV0lLHxr68n07Q=w408-h278-k-no"
  ),

  // 🇹🇭 Thailand
  new Destination(
    "d17",
    "c9",
    "Phuket",
    2100,
    1800,
    4.7,
    "An island paradise known for its beaches, nightlife, and beautiful temples.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqjFvl5yF6VazHTTjOqvsbiuv9RnJemlDBa31nNi-ow9DWIiygxL773l3nB7BYGLV_0n0Ee9vtmRzwNVnMIsp7P4yrZnyC86M2da3GrjYsjJMarbQ-5U_Z8F7MQZPCmW8ftii4yQQ=w440-h240-k-no"
  ),
  new Destination(
    "d18",
    "c9",
    "Bangkok",
    1900,
    1782,
    4.6,
    "Thailand’s bustling capital—street food, golden temples, and floating markets galore.",
    "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqhKNgXE05plrgO2ZmJ58kzCsRSlLW1WnozFMDHdrYBR9bCfgL1AXON1tSU6YCecAQAhkyLlQJ7nbmRpG3chxFpyPX8eWLNvMtGB9mhxLRO_Z0LHrdl78zbYHD06skF7YaGRbOY=w408-h272-k-no"
  ),

  // 🇺🇸 United States
  new Destination(
    "d19",
    "c10",
    "New York City",
    2800,
    1624,
    4.9,
    "The city that never sleeps—home to Broadway, skyscrapers, and endless cultural experiences.",
    "https://media.istockphoto.com/id/2178020702/photo/new-york-cityscape-aerial.webp?a=1&b=1&s=612x612&w=0&k=20&c=qQ1MPRCByNYmMhHfeMRYzW-XKtKYX7cp3JnhN_SS_po="
  ),
  new Destination(
    "d20",
    "c10",
    "Honolulu",
    2700,
    1809,
    4.8,
    "Tropical island vibes, surfing, and sunsets on the beaches of Oahu.",
    "https://plus.unsplash.com/premium_photo-1664304458186-9a67c1330d02?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9ub2x1bHUlMjBoYXdhaWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500"
  ),
];
