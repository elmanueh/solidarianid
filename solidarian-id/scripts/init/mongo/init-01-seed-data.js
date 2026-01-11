// =====================================================
// MongoDB Seed Data
// Generated: 2026-01-11T22:03:19.536Z
// Database: solidarianid
// =====================================================

db = db.getSiblingDB('solidarianid');
print('Loading seed data for solidarianid...');

// administrators (5 documents)
print('  Loading administrators...');
db.administrators.deleteMany({});
db.administrators.insertMany([
  {
    _id: "550e8400-e29b-41d4-a716-446655440001",
    fullname: "Sergio García Martínez",
    email: "sergio.garcia@solidarianid.org",
    phone: "+34612345001",
    password: "$2b$10$JfG.9oSu4kdEk8X3EVb0UO.W6dhczhEmbMeh/DFemc.C3aWWUk/2a",
    createdAt: "2026-01-11T21:56:17.530Z",
    updatedAt: "2026-01-11T21:56:17.530Z"
  },
  {
    _id: "550e8400-e29b-41d4-a716-446655440002",
    fullname: "Fabián Rodríguez López",
    email: "fabian.rodriguez@solidarianid.org",
    phone: "+34612345002",
    password: "$2b$10$KdEVcjeISvubnkzuttlClu79MJzlbkG0CGcGTsbrOK6hz8YnMWJ.6",
    createdAt: "2026-01-11T21:56:17.530Z",
    updatedAt: "2026-01-11T21:56:17.530Z"
  },
  {
    _id: "550e8400-e29b-41d4-a716-446655440003",
    fullname: "Pablo Fernández Sánchez",
    email: "pablo.fernandez@solidarianid.org",
    phone: "+34612345003",
    password: "$2b$10$7dM48dzIeh0bPlR3RYjmKekvBf12z1tRyLHwcIg6ptJoV.Tib110e",
    createdAt: "2026-01-11T21:56:17.530Z",
    updatedAt: "2026-01-11T21:56:17.530Z"
  },
  {
    _id: "550e8400-e29b-41d4-a716-446655440004",
    fullname: "Antonio Martín González",
    email: "antonio.martin@solidarianid.org",
    phone: "+34612345004",
    password: "$2b$10$3Nq1wC/3LHLlIH8RKBR13eaSUdLR7hGq6ng4FiZ9TzfommFiurpW2",
    createdAt: "2026-01-11T21:56:17.530Z",
    updatedAt: "2026-01-11T21:56:17.530Z"
  },
  {
    _id: "550e8400-e29b-41d4-a716-446655440005",
    fullname: "Manuel Pérez Ruiz",
    email: "manuel.perez@solidarianid.org",
    phone: "+34612345005",
    password: "$2b$10$Dtg1KCQDwrKSku61QSLeWOZWO.y/ZgzJItk7Xnsl/b0sBrAeQEGKa",
    createdAt: "2026-01-11T21:56:17.530Z",
    updatedAt: "2026-01-11T21:56:17.530Z"
  }
]);

// requests (696 documents)
print('  Loading requests...');
db.requests.deleteMany({});
db.requests.insertMany([
  {
    _id: "43e86991-87f5-4c1d-9989-761558d89a00",
    name: "Fundación Homenick - Roob por infancia",
    description: "Comunidad dedicada a proyectos de infancia y desarrollo sostenible. Labore curso verecundia demens tergiversatio terreo. Virtus usque perferendis in cariosus ut auctus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "e07dfe66-6f3a-4be0-8c69-41f7539dadbc",
    createdAt: "2026-01-11T21:57:10.766Z",
    updatedAt: "2026-01-11T21:57:10.766Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "1aad9544-b42e-47b9-a15d-af0e97233cac",
    name: "Campaña tercera edad 2026",
    description: "Causa benéfica enfocada en tercera edad. Occaecati aestivus quo demulceo.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "e07dfe66-6f3a-4be0-8c69-41f7539dadbc",
    createdAt: "2026-01-11T21:57:10.767Z",
    updatedAt: "2026-01-11T21:57:10.767Z",
    __v: 0,
    type: "cause",
    ods: [
      "6"
    ],
    startDate: "2026-06-12T20:57:05.630Z",
    duration: 328,
    communityId: "43e86991-87f5-4c1d-9989-761558d89a00"
  },
  {
    _id: "f67216da-1e9c-472d-bd2f-ca7673dc4a04",
    name: "Operación pobreza 2027",
    description: "Causa benéfica enfocada en pobreza. Censura utroque supra ulterius amissio subseco cotidie ventito bene. Solus quia allatus tenuis animi cinis deprimo subseco.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "e07dfe66-6f3a-4be0-8c69-41f7539dadbc",
    createdAt: "2026-01-11T21:57:10.768Z",
    updatedAt: "2026-01-11T21:57:10.768Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "1",
      "8"
    ],
    startDate: "2026-06-14T20:57:05.630Z",
    duration: 310,
    communityId: "43e86991-87f5-4c1d-9989-761558d89a00"
  },
  {
    _id: "60bd8eba-a4bb-43a5-9834-a9bcfc8fe210",
    name: "Fundación Hammes - Macejkovic por alimentación",
    description: "Comunidad dedicada a proyectos de alimentación y desarrollo sostenible. Celer stultus arto. Combibo labore claustrum autem cursus adduco vindico utrum in desipio.",
    status: "approved",
    reason: "",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:57:10.843Z",
    updatedAt: "2026-01-11T21:57:10.843Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "b7925edf-2238-42b7-b690-8c16a3422d1f",
    name: "Iniciativa infancia 2027",
    description: "Causa benéfica enfocada en infancia. Aequus conturbo adstringo. Vesper sapiente aeternus stabilis optio synagoga repudiandae accusantium.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:57:10.844Z",
    updatedAt: "2026-01-11T21:57:10.844Z",
    __v: 0,
    type: "cause",
    ods: [
      "13"
    ],
    startDate: "2026-06-03T20:57:05.770Z",
    duration: 58,
    communityId: "60bd8eba-a4bb-43a5-9834-a9bcfc8fe210"
  },
  {
    _id: "16e4b7b6-ff71-4caf-b598-3b83ad40a73e",
    name: "Movimiento salud 2027",
    description: "Causa benéfica enfocada en salud. Cohaero tabernus totam arbitro. Arbustum curvo caelum cuius bis.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:57:10.845Z",
    updatedAt: "2026-01-11T21:57:10.845Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "11"
    ],
    startDate: "2026-05-30T20:57:05.770Z",
    duration: 120,
    communityId: "60bd8eba-a4bb-43a5-9834-a9bcfc8fe210"
  },
  {
    _id: "bbeebe3e-8d39-476d-93e2-d8950a74b2e3",
    name: "Fundación Blick and Sons por educación",
    description: "Comunidad dedicada a proyectos de educación y desarrollo sostenible. Totam vilis abduco defetiscor tego spes occaecati vilis vesica provident.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "5bfa7249-e8ca-4dda-ae1e-ebf2f1c82927",
    createdAt: "2026-01-11T21:57:10.905Z",
    updatedAt: "2026-01-11T21:57:10.905Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "85c94f68-309c-44b7-8969-0a9f3ddf50b0",
    name: "Movimiento derechos humanos 2026",
    description: "Causa benéfica enfocada en derechos humanos. Sumptus saepe tamdiu.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "5bfa7249-e8ca-4dda-ae1e-ebf2f1c82927",
    createdAt: "2026-01-11T21:57:10.906Z",
    updatedAt: "2026-01-11T21:57:10.906Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "6"
    ],
    startDate: "2026-05-30T20:57:05.831Z",
    duration: 319,
    communityId: "bbeebe3e-8d39-476d-93e2-d8950a74b2e3"
  },
  {
    _id: "49c42598-bfaf-43df-8ebe-17518570bae9",
    name: "Red Schneider - Wolff por educación",
    description: "Comunidad dedicada a proyectos de educación y desarrollo sostenible. Cur corona xiphias.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:10.967Z",
    updatedAt: "2026-01-11T21:57:10.967Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "a8938810-a2e1-4498-902e-6cbf74a7af31",
    name: "Programa vivienda 2027",
    description: "Causa benéfica enfocada en vivienda. Autus consequatur subvenio cauda charisma.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:10.968Z",
    updatedAt: "2026-01-11T21:57:10.968Z",
    __v: 0,
    type: "cause",
    ods: [
      "8"
    ],
    startDate: "2026-06-11T20:57:05.894Z",
    duration: 110,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "45733a44-3699-4c52-a369-b4b4726d9ef1",
    name: "Red de apoyo salud 2027",
    description: "Causa benéfica enfocada en salud. Subiungo solio thesis paulatim ulterius itaque confero verto solutio.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:10.969Z",
    updatedAt: "2026-01-11T21:57:10.969Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "6",
      "4"
    ],
    startDate: "2026-04-01T20:57:05.894Z",
    duration: 46,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "e5844a86-6d91-4744-8a92-1eac552c2193",
    name: "Programa salud 2026",
    description: "Causa benéfica enfocada en salud. Crustulum umerus aveho tracto pecco altus. Admiratio iste acies absconditus tredecim confido excepturi.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:10.970Z",
    updatedAt: "2026-01-11T21:57:10.970Z",
    __v: 0,
    type: "cause",
    ods: [
      "14",
      "11",
      "3"
    ],
    startDate: "2026-02-25T21:57:05.894Z",
    duration: 310,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48",
    name: "Red Homenick, Shanahan and Macejkovic por discapac",
    description: "Comunidad dedicada a proyectos de discapacidad y desarrollo sostenible. Callide cohibeo adipisci arma cunabula tutamen.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:11.043Z",
    updatedAt: "2026-01-11T21:57:11.043Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "b811faf9-00e7-4b99-9f2e-b9612b359dbc",
    name: "Acción solidaria salud 2026",
    description: "Causa benéfica enfocada en salud. Validus tenetur adduco.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:11.044Z",
    updatedAt: "2026-01-11T21:57:11.044Z",
    __v: 0,
    type: "cause",
    ods: [
      "16"
    ],
    startDate: "2026-04-10T20:57:05.958Z",
    duration: 54,
    communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48"
  },
  {
    _id: "aa3ef199-1dce-408c-a4f3-eb978c2e84df",
    name: "Asociación Tromp and Sons por refugiados",
    description: "Comunidad dedicada a proyectos de refugiados y desarrollo sostenible. Debitis maiores thorax adeo vesco accommodo venio totam depopulo suadeo. Aperte defaeco tero defessus cilicium architecto umquam c",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cfccf0aa-acd9-47f0-8d06-4d595721cf49",
    createdAt: "2026-01-11T21:57:11.106Z",
    updatedAt: "2026-01-11T21:57:11.106Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "c2b6a1e3-68a3-4e95-9967-165d7d1d8a36",
    name: "Jornada refugiados 2026",
    description: "Causa benéfica enfocada en refugiados. Eaque aufero trepide aut pectus unus.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "cfccf0aa-acd9-47f0-8d06-4d595721cf49",
    createdAt: "2026-01-11T21:57:11.107Z",
    updatedAt: "2026-01-11T21:57:11.107Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "8",
      "10"
    ],
    startDate: "2026-05-23T20:57:06.020Z",
    duration: 284,
    communityId: "aa3ef199-1dce-408c-a4f3-eb978c2e84df"
  },
  {
    _id: "71a83edf-c532-41ea-867a-93e6fc190384",
    name: "Asociación Steuber, Crist and Oberbrunner por salu",
    description: "Comunidad dedicada a proyectos de salud y desarrollo sostenible. Auditor calculus denego voveo carpo. Charisma corpus sint quis vestrum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:11.169Z",
    updatedAt: "2026-01-11T21:57:11.169Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "4e79ee1b-b88e-4f86-948d-41ec25064d98",
    name: "Jornada infancia 2027",
    description: "Causa benéfica enfocada en infancia. Vinum reprehenderit aperte iure commodo. Talio sapiente tumultus aeger quisquam tonsor vix talis.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:11.170Z",
    updatedAt: "2026-01-11T21:57:11.170Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "17",
      "9"
    ],
    startDate: "2026-04-13T20:57:06.083Z",
    duration: 297,
    communityId: "71a83edf-c532-41ea-867a-93e6fc190384"
  },
  {
    _id: "f9192c73-08c5-4e86-b09e-060aa06de3d7",
    name: "Movimiento alimentación 2026",
    description: "Causa benéfica enfocada en alimentación. Vorago caecus viduo carmen cilicium sub antiquus aureus curvo admiratio.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:11.172Z",
    updatedAt: "2026-01-11T21:57:11.172Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "11",
      "6"
    ],
    startDate: "2026-06-18T20:57:06.083Z",
    duration: 151,
    communityId: "71a83edf-c532-41ea-867a-93e6fc190384"
  },
  {
    _id: "7a7bf688-a964-4f31-aa57-f2c5fd1551ad",
    name: "Programa tercera edad 2027",
    description: "Causa benéfica enfocada en tercera edad. Demergo velit adhaero vetus caste repudiandae tam.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:11.173Z",
    updatedAt: "2026-01-11T21:57:11.173Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "17",
      "5"
    ],
    startDate: "2026-07-12T20:57:06.083Z",
    duration: 145,
    communityId: "71a83edf-c532-41ea-867a-93e6fc190384"
  },
  {
    _id: "1e15234c-7f9b-4a37-b4f2-e1dbae1a665b",
    name: "Comunidad Jerde, Von and Mann por alimentación",
    description: "Comunidad dedicada a proyectos de alimentación y desarrollo sostenible. Ustilo usque aperiam conicio eaque infit. Quia trans aranea brevis utor ager ars vulnero cresco curriculum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "b765791d-8f72-46b8-a102-5413e2887aa7",
    createdAt: "2026-01-11T21:57:11.232Z",
    updatedAt: "2026-01-11T21:57:11.232Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "ff1ef43c-8813-4b25-a8d8-a392b189d47d",
    name: "Operación igualdad de género 2027",
    description: "Causa benéfica enfocada en igualdad de género. Atqui vestigium agnitio. Defessus victoria solutio totidem speculum sordeo.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "b765791d-8f72-46b8-a102-5413e2887aa7",
    createdAt: "2026-01-11T21:57:11.233Z",
    updatedAt: "2026-01-11T21:57:11.233Z",
    __v: 0,
    type: "cause",
    ods: [
      "2"
    ],
    startDate: "2026-04-23T20:57:06.145Z",
    duration: 118,
    communityId: "1e15234c-7f9b-4a37-b4f2-e1dbae1a665b"
  },
  {
    _id: "631174ef-6289-4494-9628-81760c3361b9",
    name: "Proyecto agua potable 2027",
    description: "Causa benéfica enfocada en agua potable. Nesciunt toties denuo curis sint.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "b765791d-8f72-46b8-a102-5413e2887aa7",
    createdAt: "2026-01-11T21:57:11.234Z",
    updatedAt: "2026-01-11T21:57:11.234Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "11"
    ],
    startDate: "2026-04-18T20:57:06.145Z",
    duration: 309,
    communityId: "1e15234c-7f9b-4a37-b4f2-e1dbae1a665b"
  },
  {
    _id: "8a4d7906-ff73-4503-b72e-781ade88164b",
    name: "Asociación Emmerich, Russel and Vandervort por sal",
    description: "Comunidad dedicada a proyectos de salud y desarrollo sostenible. Desino saepe vergo totam.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "b2043986-e90d-4d88-9b1d-d521c0ac57bf",
    createdAt: "2026-01-11T21:57:11.293Z",
    updatedAt: "2026-01-11T21:57:11.293Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "9a99daf0-e3db-4251-b57f-49f9f3b8036a",
    name: "Red de apoyo vivienda 2027",
    description: "Causa benéfica enfocada en vivienda. Defetiscor talus unde uberrime supplanto.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "b2043986-e90d-4d88-9b1d-d521c0ac57bf",
    createdAt: "2026-01-11T21:57:11.295Z",
    updatedAt: "2026-01-11T21:57:11.295Z",
    __v: 0,
    type: "cause",
    ods: [
      "6",
      "7",
      "9"
    ],
    startDate: "2026-03-03T21:57:06.208Z",
    duration: 224,
    communityId: "8a4d7906-ff73-4503-b72e-781ade88164b"
  },
  {
    _id: "54429cdd-a8da-45db-9841-c2b9670a9e2a",
    name: "Jornada emergencias 2027",
    description: "Causa benéfica enfocada en emergencias. Aestus vomica conturbo usus surgo ubi vir uxor textus.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "b2043986-e90d-4d88-9b1d-d521c0ac57bf",
    createdAt: "2026-01-11T21:57:11.296Z",
    updatedAt: "2026-01-11T21:57:11.296Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "3",
      "14"
    ],
    startDate: "2026-04-21T20:57:06.208Z",
    duration: 88,
    communityId: "8a4d7906-ff73-4503-b72e-781ade88164b"
  },
  {
    _id: "33193057-4ce2-4e2e-bf7a-71f720809057",
    name: "Asociación Corwin - Kuvalis por medio ambiente",
    description: "Comunidad dedicada a proyectos de medio ambiente y desarrollo sostenible. Tolero super termes absconditus uterque crapula thesis patruus calamitas. Minus aufero sopor dolorum depereo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "5958bd0e-e77f-4039-a8de-5678e4cb0de2",
    createdAt: "2026-01-11T21:57:11.371Z",
    updatedAt: "2026-01-11T21:57:11.371Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "de648fe8-734b-4ee0-80be-fa7b86f40f5c",
    name: "Movimiento salud 2026",
    description: "Causa benéfica enfocada en salud. Pecto eveniet complectus aptus deleniti vesper. Laboriosam astrum decens commodi sustineo.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "5958bd0e-e77f-4039-a8de-5678e4cb0de2",
    createdAt: "2026-01-11T21:57:11.373Z",
    updatedAt: "2026-01-11T21:57:11.373Z",
    __v: 0,
    type: "cause",
    ods: [
      "9"
    ],
    startDate: "2026-03-12T21:57:06.270Z",
    duration: 119,
    communityId: "33193057-4ce2-4e2e-bf7a-71f720809057"
  },
  {
    _id: "40054622-29aa-4ce8-97c1-8d8d6cff7878",
    name: "Fundación Kozey, Dare and Hintz por educación",
    description: "Comunidad dedicada a proyectos de educación y desarrollo sostenible. Verbera conventus congregatio. Strues aequus adiuvo alo spiritus degenero.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:11.433Z",
    updatedAt: "2026-01-11T21:57:11.433Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "8008fdf5-c3e6-4a32-bbd0-82b8328e99d7",
    name: "Programa pobreza 2027",
    description: "Causa benéfica enfocada en pobreza. Clibanus auxilium absque.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:11.434Z",
    updatedAt: "2026-01-11T21:57:11.434Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "2",
      "13"
    ],
    startDate: "2026-02-11T21:57:06.334Z",
    duration: 36,
    communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878"
  },
  {
    _id: "a2af7dd0-850b-41f7-8a52-9fcb0278a793",
    name: "Grupo Hilpert LLC por pobreza",
    description: "Comunidad dedicada a proyectos de pobreza y desarrollo sostenible. Supellex trepide cometes ea trepide sapiente tamdiu caste in tepesco.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:11.495Z",
    updatedAt: "2026-01-11T21:57:11.495Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "edb99ddd-0762-4852-907f-85c425743c81",
    name: "Operación pobreza 2026",
    description: "Causa benéfica enfocada en pobreza. Paulatim creo natus aggero sustineo attollo eaque.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:11.496Z",
    updatedAt: "2026-01-11T21:57:11.496Z",
    __v: 0,
    type: "cause",
    ods: [
      "8"
    ],
    startDate: "2026-08-01T20:57:06.396Z",
    duration: 316,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "5ca06af2-7df0-4ae4-a857-b26195fa1970",
    name: "Red de apoyo igualdad de género 2026",
    description: "Causa benéfica enfocada en igualdad de género. Usus aveho aurum sto claustrum umerus deprecator utor tempus vilitas.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:11.497Z",
    updatedAt: "2026-01-11T21:57:11.497Z",
    __v: 0,
    type: "cause",
    ods: [
      "16"
    ],
    startDate: "2026-03-11T21:57:06.396Z",
    duration: 83,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "57777ca5-3db1-4763-aff8-94c380e5297c",
    name: "Operación agua potable 2026",
    description: "Causa benéfica enfocada en agua potable. Quae surculus copia attollo calco.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:11.498Z",
    updatedAt: "2026-01-11T21:57:11.498Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "13"
    ],
    startDate: "2026-03-23T21:57:06.396Z",
    duration: 345,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "270bcccb-8cff-459d-a243-e33c878cfb6d",
    name: "Fundación Dietrich - Waters por desarrollo sosteni",
    description: "Comunidad dedicada a proyectos de desarrollo sostenible y desarrollo sostenible. Decretum adficio pecto crastinus appositus sursum subseco censura caelestis.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:57:11.560Z",
    updatedAt: "2026-01-11T21:57:11.560Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "f4360b53-6d8a-4818-a88c-570be2c839cb",
    name: "Proyecto alimentación 2026",
    description: "Causa benéfica enfocada en alimentación. Creptio ex tamquam comburo voluntarius. Cotidie dignissimos inflammatio texo deprimo conitor hic crustulum tenax.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:57:11.562Z",
    updatedAt: "2026-01-11T21:57:11.562Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "16"
    ],
    startDate: "2026-05-10T20:57:06.457Z",
    duration: 360,
    communityId: "270bcccb-8cff-459d-a243-e33c878cfb6d"
  },
  {
    _id: "9e57ef83-d35b-45b9-becf-e9e465d37ed1",
    name: "Comunidad Kuhlman - Roob por agua potable",
    description: "Comunidad dedicada a proyectos de agua potable y desarrollo sostenible. Bibo verus ceno defaeco tergum aveho canto.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:11.634Z",
    updatedAt: "2026-01-11T21:57:11.634Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "2587aff2-2a9d-404b-93c3-f3466c18f02d",
    name: "Proyecto igualdad de género 2027",
    description: "Causa benéfica enfocada en igualdad de género. Substantia contigo totidem adipisci. Delibero usque amor quis admitto aperiam caute desolo speculum.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:11.635Z",
    updatedAt: "2026-01-11T21:57:11.635Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "6"
    ],
    startDate: "2026-03-05T21:57:06.519Z",
    duration: 344,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "ada17e97-4121-4c76-9360-c9637cfae2f9",
    name: "Programa salud 2026",
    description: "Causa benéfica enfocada en salud. Colligo voluptatum truculenter aegrotatio arbustum voluptates denique demo maiores torqueo. Uxor thalassinus quibusdam.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:11.636Z",
    updatedAt: "2026-01-11T21:57:11.636Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "6"
    ],
    startDate: "2026-03-03T21:57:06.519Z",
    duration: 84,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "9c523675-68c7-4a13-a37c-39f961d71bb0",
    name: "Asociación Daugherty Inc por derechos humanos",
    description: "Comunidad dedicada a proyectos de derechos humanos y desarrollo sostenible. Vulgus creo nam soluta pauper ventosus apostolus perferendis depopulo crebro. Cohibeo libero damnatio perspiciatis suus adve",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:11.697Z",
    updatedAt: "2026-01-11T21:57:11.697Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "3610b157-e613-414c-b714-8382b1b4f236",
    name: "Jornada derechos humanos 2026",
    description: "Causa benéfica enfocada en derechos humanos. Solus saepe umquam alo infit. Comminor vilis vicinus consectetur utroque delectus vester utilis.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:11.698Z",
    updatedAt: "2026-01-11T21:57:11.698Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "10"
    ],
    startDate: "2026-03-13T21:57:06.580Z",
    duration: 124,
    communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0"
  },
  {
    _id: "924a7233-08eb-4791-9c02-c526a11da309",
    name: "Colectivo Ruecker, Halvorson and Hettinger por der",
    description: "Comunidad dedicada a proyectos de derechos humanos y desarrollo sostenible. Solus custodia charisma calcar callide distinctio aperiam amplexus theca.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "eb885d47-cd51-4450-b98c-0ca6d322d01c",
    createdAt: "2026-01-11T21:57:11.760Z",
    updatedAt: "2026-01-11T21:57:11.760Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "089986e9-df73-4522-afc8-8a46cdd6ec37",
    name: "Operación refugiados 2026",
    description: "Causa benéfica enfocada en refugiados. Vitiosus voluptates voluptatum claustrum conforto capillus tum aedificium tubineus. Stultus talio toties cenaculum communis cibus.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "eb885d47-cd51-4450-b98c-0ca6d322d01c",
    createdAt: "2026-01-11T21:57:11.761Z",
    updatedAt: "2026-01-11T21:57:11.761Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "10"
    ],
    startDate: "2026-07-22T20:57:06.643Z",
    duration: 308,
    communityId: "924a7233-08eb-4791-9c02-c526a11da309"
  },
  {
    _id: "5364f3f2-e6af-42ea-bb46-eb3a81fae8b1",
    name: "Campaña emergencias 2026",
    description: "Causa benéfica enfocada en emergencias. Vero coniecto et vulticulus adicio coadunatio conculco tempore contego. Defluo antiquus terminatio territo cultellus ipsa summopere carpo tribuo damno.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "eb885d47-cd51-4450-b98c-0ca6d322d01c",
    createdAt: "2026-01-11T21:57:11.762Z",
    updatedAt: "2026-01-11T21:57:11.762Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-05-26T20:57:06.643Z",
    duration: 292,
    communityId: "924a7233-08eb-4791-9c02-c526a11da309"
  },
  {
    _id: "dc30e256-b820-41d2-9f2f-7fda2fe46914",
    name: "Acción solidaria derechos humanos 2027",
    description: "Causa benéfica enfocada en derechos humanos. Voluptatem cohibeo decerno valeo voco agnosco amplitudo vesper deporto comminor. Textor speciosus consectetur terebro desino timidus debilito animi.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "eb885d47-cd51-4450-b98c-0ca6d322d01c",
    createdAt: "2026-01-11T21:57:11.763Z",
    updatedAt: "2026-01-11T21:57:11.763Z",
    __v: 0,
    type: "cause",
    ods: [
      "14"
    ],
    startDate: "2026-05-11T20:57:06.643Z",
    duration: 228,
    communityId: "924a7233-08eb-4791-9c02-c526a11da309"
  },
  {
    _id: "722a0243-1d7e-47c2-840d-b9b3348e8fd9",
    name: "Asociación Cartwright - Mosciski por tercera edad",
    description: "Comunidad dedicada a proyectos de tercera edad y desarrollo sostenible. Illo textilis ventito baiulus tersus adamo. Asporto reiciendis denique decerno aperio calco conventus absconditus solio.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "ea7a4ea0-48f9-403e-8bf0-62b8fd2283aa",
    createdAt: "2026-01-11T21:57:11.835Z",
    updatedAt: "2026-01-11T21:57:11.835Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "d639d957-9815-4c70-a11b-387a0a1b9212",
    name: "Movimiento infancia 2027",
    description: "Causa benéfica enfocada en infancia. Appono alter cunabula.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "ea7a4ea0-48f9-403e-8bf0-62b8fd2283aa",
    createdAt: "2026-01-11T21:57:11.836Z",
    updatedAt: "2026-01-11T21:57:11.836Z",
    __v: 0,
    type: "cause",
    ods: [
      "3"
    ],
    startDate: "2026-05-05T20:57:06.706Z",
    duration: 83,
    communityId: "722a0243-1d7e-47c2-840d-b9b3348e8fd9"
  },
  {
    _id: "a7423eea-6727-4af7-a029-22aec1314b46",
    name: "Operación alimentación 2026",
    description: "Causa benéfica enfocada en alimentación. Atrocitas eos cunae sumptus aro cupiditas vesco.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "ea7a4ea0-48f9-403e-8bf0-62b8fd2283aa",
    createdAt: "2026-01-11T21:57:11.837Z",
    updatedAt: "2026-01-11T21:57:11.837Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "8"
    ],
    startDate: "2026-06-11T20:57:06.706Z",
    duration: 145,
    communityId: "722a0243-1d7e-47c2-840d-b9b3348e8fd9"
  },
  {
    _id: "bb21e942-ebfd-45e7-9ca5-e3da915cb7c9",
    name: "Fundación Labadie Inc por infancia",
    description: "Comunidad dedicada a proyectos de infancia y desarrollo sostenible. Quis succedo depromo triumphus claustrum sponte abstergo.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:11.897Z",
    updatedAt: "2026-01-11T21:57:11.897Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "84410e1b-692e-45ce-ac37-337cef293f88",
    name: "Campaña educación 2027",
    description: "Causa benéfica enfocada en educación. Tolero culpo vilicus charisma cuppedia conicio arguo minima alias. Quae ullam vulgus adversus quod quia adaugeo acceptus.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:11.898Z",
    updatedAt: "2026-01-11T21:57:11.898Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "10"
    ],
    startDate: "2026-06-01T20:57:06.768Z",
    duration: 106,
    communityId: "bb21e942-ebfd-45e7-9ca5-e3da915cb7c9"
  },
  {
    _id: "b9026d61-05b2-4c6d-ba42-332aedc783a5",
    name: "Grupo Frami - Kuhic por salud",
    description: "Comunidad dedicada a proyectos de salud y desarrollo sostenible. Coepi crebro vix libero expedita. Deserunt ascisco demulceo perspiciatis assumenda terebro umquam officia vir.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:11.960Z",
    updatedAt: "2026-01-11T21:57:11.960Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "edc98554-4de8-4a10-9d80-3fa354355ae9",
    name: "Campaña pobreza 2026",
    description: "Causa benéfica enfocada en pobreza. Curia curia approbo commemoro iusto odit conduco decerno aequitas. Turba sordeo tenetur solutio cupiditas ambitus.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:11.961Z",
    updatedAt: "2026-01-11T21:57:11.961Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "4"
    ],
    startDate: "2026-03-29T20:57:06.830Z",
    duration: 258,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0",
    name: "Fundación Haag, Emmerich and Hermann por educación",
    description: "Comunidad dedicada a proyectos de educación y desarrollo sostenible. Doloremque nobis suffragium desipio absconditus delibero coerceo sol crepusculum.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:12.021Z",
    updatedAt: "2026-01-11T21:57:12.021Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "703348b4-c6b4-4079-8a14-02895b26b02f",
    name: "Red de apoyo vivienda 2026",
    description: "Causa benéfica enfocada en vivienda. Tergum iure delinquo supra advoco deleniti causa.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:12.023Z",
    updatedAt: "2026-01-11T21:57:12.023Z",
    __v: 0,
    type: "cause",
    ods: [
      "6"
    ],
    startDate: "2026-03-11T21:57:06.892Z",
    duration: 357,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "58c55259-195b-4e2b-b2f1-00f30b02197a",
    name: "Grupo Franey Group por refugiados",
    description: "Comunidad dedicada a proyectos de refugiados y desarrollo sostenible. Aer velociter vita quia commemoro odio acidus coruscus accusamus vigilo. Vestigium tubineus paulatim creta tepesco arcesso tolero ",
    status: "approved",
    reason: "",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:57:12.084Z",
    updatedAt: "2026-01-11T21:57:12.084Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "ca6e7c24-8333-40b3-8f1d-09bb113caea5",
    name: "Iniciativa desarrollo sostenible 2027",
    description: "Causa benéfica enfocada en desarrollo sostenible. Caste ultra vix admoveo degusto. Spargo celo pecco infit aureus paulatim curso.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:57:12.085Z",
    updatedAt: "2026-01-11T21:57:12.085Z",
    __v: 0,
    type: "cause",
    ods: [
      "6",
      "10"
    ],
    startDate: "2026-05-14T20:57:06.953Z",
    duration: 185,
    communityId: "58c55259-195b-4e2b-b2f1-00f30b02197a"
  },
  {
    _id: "d3f5fe7f-51c7-4d5d-9bdd-77e01a3f52a0",
    name: "Red Pfannerstill - Goodwin por vivienda",
    description: "Comunidad dedicada a proyectos de vivienda y desarrollo sostenible. Optio video timidus odio. Curiositas architecto adsidue.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "e76676b6-7865-4843-a16a-c38377094f28",
    createdAt: "2026-01-11T21:57:12.146Z",
    updatedAt: "2026-01-11T21:57:12.146Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "6735742c-e5af-4a49-bdbb-5742976560f7",
    name: "Acción solidaria alimentación 2027",
    description: "Causa benéfica enfocada en alimentación. Vulariter cupressus cresco.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "e76676b6-7865-4843-a16a-c38377094f28",
    createdAt: "2026-01-11T21:57:12.148Z",
    updatedAt: "2026-01-11T21:57:12.148Z",
    __v: 0,
    type: "cause",
    ods: [
      "14",
      "1"
    ],
    startDate: "2026-03-30T20:57:07.015Z",
    duration: 132,
    communityId: "d3f5fe7f-51c7-4d5d-9bdd-77e01a3f52a0"
  },
  {
    _id: "06062cc0-1aa8-4e76-9d18-8484b23161cf",
    name: "Campaña alimentación 2027",
    description: "Causa benéfica enfocada en alimentación. Vereor collum laborum approbo vulgivagus verumtamen deinde.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "e76676b6-7865-4843-a16a-c38377094f28",
    createdAt: "2026-01-11T21:57:12.149Z",
    updatedAt: "2026-01-11T21:57:12.149Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "2"
    ],
    startDate: "2026-07-02T20:57:07.015Z",
    duration: 200,
    communityId: "d3f5fe7f-51c7-4d5d-9bdd-77e01a3f52a0"
  },
  {
    _id: "f9d4dda7-8d74-48d4-b329-277418b40819",
    name: "Jornada medio ambiente 2026",
    description: "Causa benéfica enfocada en medio ambiente. Defaeco iste spiritus theca capitulus minima creo adulatio. Vulgivagus advenio cariosus umbra ara blanditiis aranea ullam eos degusto.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "e76676b6-7865-4843-a16a-c38377094f28",
    createdAt: "2026-01-11T21:57:12.150Z",
    updatedAt: "2026-01-11T21:57:12.150Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "10",
      "1"
    ],
    startDate: "2026-04-06T20:57:07.015Z",
    duration: 352,
    communityId: "d3f5fe7f-51c7-4d5d-9bdd-77e01a3f52a0"
  },
  {
    _id: "ecaf9728-b07d-4351-a00e-1637a03be6fc",
    name: "Red Beatty Inc por derechos humanos",
    description: "Comunidad dedicada a proyectos de derechos humanos y desarrollo sostenible. Nemo dedecor utpote conitor cotidie vergo quo carus id adversus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f739e981-82dd-4582-99fb-118808da769c",
    createdAt: "2026-01-11T21:57:12.221Z",
    updatedAt: "2026-01-11T21:57:12.221Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "a200273a-4d18-4261-9532-20fe8efa755b",
    name: "Red de apoyo igualdad de género 2027",
    description: "Causa benéfica enfocada en igualdad de género. Virga adhaero avarus minus praesentium.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "f739e981-82dd-4582-99fb-118808da769c",
    createdAt: "2026-01-11T21:57:12.222Z",
    updatedAt: "2026-01-11T21:57:12.222Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "10"
    ],
    startDate: "2026-07-19T20:57:07.078Z",
    duration: 325,
    communityId: "ecaf9728-b07d-4351-a00e-1637a03be6fc"
  },
  {
    _id: "e5a74f8c-37b0-4161-b17d-a8fb3450d0dd",
    name: "Acción solidaria salud 2027",
    description: "Causa benéfica enfocada en salud. Solium utpote accusamus id censura umerus.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "f739e981-82dd-4582-99fb-118808da769c",
    createdAt: "2026-01-11T21:57:12.223Z",
    updatedAt: "2026-01-11T21:57:12.223Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "14"
    ],
    startDate: "2026-07-13T20:57:07.078Z",
    duration: 347,
    communityId: "ecaf9728-b07d-4351-a00e-1637a03be6fc"
  },
  {
    _id: "186dbfe2-8292-4569-a2ba-a2ace3e76750",
    name: "Movimiento alimentación 2027",
    description: "Causa benéfica enfocada en alimentación. Conicio amoveo cibo depulso atrocitas.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "f739e981-82dd-4582-99fb-118808da769c",
    createdAt: "2026-01-11T21:57:12.224Z",
    updatedAt: "2026-01-11T21:57:12.224Z",
    __v: 0,
    type: "cause",
    ods: [
      "9"
    ],
    startDate: "2026-05-12T20:57:07.078Z",
    duration: 271,
    communityId: "ecaf9728-b07d-4351-a00e-1637a03be6fc"
  },
  {
    _id: "645a3d2c-9c30-4138-bb08-561b55173d6e",
    name: "Colectivo Lakin Group por desarrollo sostenible",
    description: "Comunidad dedicada a proyectos de desarrollo sostenible y desarrollo sostenible. Expedita aperio ara vox color quod defluo capto supra autem. Alioqui aliquam patruus exercitationem una unde vesper tot",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:57:12.285Z",
    updatedAt: "2026-01-11T21:57:12.285Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "f8e45c93-77e7-4ad0-a46c-2434aa1a4f04",
    name: "Iniciativa derechos humanos 2026",
    description: "Causa benéfica enfocada en derechos humanos. Templum vel deduco tantum coniecto arx colligo benigne.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:57:12.286Z",
    updatedAt: "2026-01-11T21:57:12.286Z",
    __v: 0,
    type: "cause",
    ods: [
      "5"
    ],
    startDate: "2026-05-08T20:57:07.141Z",
    duration: 188,
    communityId: "645a3d2c-9c30-4138-bb08-561b55173d6e"
  },
  {
    _id: "ce725747-68ef-49a1-8ef2-c6632fb29b37",
    name: "Movimiento refugiados 2026",
    description: "Causa benéfica enfocada en refugiados. Odit quasi varius defetiscor sodalitas adduco magnam.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:57:12.287Z",
    updatedAt: "2026-01-11T21:57:12.287Z",
    __v: 0,
    type: "cause",
    ods: [
      "8"
    ],
    startDate: "2026-07-23T20:57:07.141Z",
    duration: 103,
    communityId: "645a3d2c-9c30-4138-bb08-561b55173d6e"
  },
  {
    _id: "a9da4c12-fece-4eb6-99b3-324d8722dad2",
    name: "Asociación Abshire Group por alimentación",
    description: "Comunidad dedicada a proyectos de alimentación y desarrollo sostenible. Quasi sortitus sumptus sponte alveus correptius compello vulgaris conturbo defessus. Decens neque conitor pectus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c46c98ed-b979-437f-83a6-cb91826a3a23",
    createdAt: "2026-01-11T21:57:12.363Z",
    updatedAt: "2026-01-11T21:57:12.363Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "103e9534-be42-42e5-a7fa-8ee5f7d40f23",
    name: "Proyecto salud 2026",
    description: "Causa benéfica enfocada en salud. Convoco cura pectus socius arto fugit tribuo assumenda arbitro desipio. Autus aliqua inventore delinquo qui veritas.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "c46c98ed-b979-437f-83a6-cb91826a3a23",
    createdAt: "2026-01-11T21:57:12.365Z",
    updatedAt: "2026-01-11T21:57:12.365Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-05-28T20:57:07.201Z",
    duration: 89,
    communityId: "a9da4c12-fece-4eb6-99b3-324d8722dad2"
  },
  {
    _id: "87111c40-ad76-4bf9-9f52-25d0382c2633",
    name: "Campaña tercera edad 2027",
    description: "Causa benéfica enfocada en tercera edad. Conculco copiose totidem uterque conculco quia vado repudiandae cattus.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "c46c98ed-b979-437f-83a6-cb91826a3a23",
    createdAt: "2026-01-11T21:57:12.367Z",
    updatedAt: "2026-01-11T21:57:12.367Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "2"
    ],
    startDate: "2026-06-03T20:57:07.201Z",
    duration: 139,
    communityId: "a9da4c12-fece-4eb6-99b3-324d8722dad2"
  },
  {
    _id: "595d52fe-d4ff-4b1d-9faa-c939936b324a",
    name: "Red Mueller LLC por agua potable",
    description: "Comunidad dedicada a proyectos de agua potable y desarrollo sostenible. Certus tabesco turpis bibo antiquus aperiam beneficium. Voluptates cuppedia truculenter delego conventus arca creptio angustus.",
    status: "pending",
    userId: "668eae23-4257-4492-8a77-c9f899cace6f",
    createdAt: "2026-01-11T21:57:07.273Z",
    updatedAt: "2026-01-11T21:57:07.273Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "42bea3c0-47d6-4e06-a3c3-c82a8b9b8465",
    name: "Programa pobreza 2027",
    description: "Causa benéfica enfocada en pobreza. Decerno reprehenderit demulceo adicio surculus confero creber crur fugit audax.",
    status: "pending",
    userId: "668eae23-4257-4492-8a77-c9f899cace6f",
    createdAt: "2026-01-11T21:57:07.275Z",
    updatedAt: "2026-01-11T21:57:07.275Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "3"
    ],
    startDate: "2026-07-22T20:57:07.262Z",
    duration: 197,
    communityId: "595d52fe-d4ff-4b1d-9faa-c939936b324a"
  },
  {
    _id: "ced550b3-15ec-44de-bb86-51117ddbe581",
    name: "Colectivo McClure, Heller and Collins por derechos",
    description: "Comunidad dedicada a proyectos de derechos humanos y desarrollo sostenible. Virgo textilis molestias somnus delinquo tam.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:12.501Z",
    updatedAt: "2026-01-11T21:57:12.501Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "5c8551a6-2b01-4172-8905-a056c1dc3f02",
    name: "Acción solidaria discapacidad 2027",
    description: "Causa benéfica enfocada en discapacidad. Agnitio dicta annus collum bellum fugiat explicabo spiculum. Coerceo sophismata auctor virtus.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:12.502Z",
    updatedAt: "2026-01-11T21:57:12.502Z",
    __v: 0,
    type: "cause",
    ods: [
      "13"
    ],
    startDate: "2026-02-15T21:57:07.325Z",
    duration: 287,
    communityId: "ced550b3-15ec-44de-bb86-51117ddbe581"
  },
  {
    _id: "4d00e939-7fdc-4195-bf34-2f1cbf4e84af",
    name: "Grupo Ledner - Dickinson por discapacidad",
    description: "Comunidad dedicada a proyectos de discapacidad y desarrollo sostenible. Sumptus spoliatio vulnero perferendis arguo cribro.",
    status: "approved",
    reason: "",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:57:12.565Z",
    updatedAt: "2026-01-11T21:57:12.565Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "455099e8-3e28-40fd-aadb-1a1ee42df5a2",
    name: "Acción solidaria agua potable 2027",
    description: "Causa benéfica enfocada en agua potable. Armarium quo corroboro.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:57:12.565Z",
    updatedAt: "2026-01-11T21:57:12.565Z",
    __v: 0,
    type: "cause",
    ods: [
      "11",
      "1"
    ],
    startDate: "2026-04-27T20:57:07.387Z",
    duration: 327,
    communityId: "4d00e939-7fdc-4195-bf34-2f1cbf4e84af"
  },
  {
    _id: "00b75a73-f239-4162-9c90-55c4bedeb9df",
    name: "Colectivo Padberg - Barton por derechos humanos",
    description: "Comunidad dedicada a proyectos de derechos humanos y desarrollo sostenible. Nisi trepide adaugeo cognatus vorax conspergo. Corrumpo labore tibi absens viridis vitiosus atavus accedo ager doloremque.",
    status: "approved",
    reason: "",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:57:12.626Z",
    updatedAt: "2026-01-11T21:57:12.626Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "6f56f843-ff57-48e0-b809-9a26db51302b",
    name: "Iniciativa igualdad de género 2027",
    description: "Causa benéfica enfocada en igualdad de género. Argumentum tonsor sequi chirographum accendo perferendis auxilium audio aggero.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:57:12.627Z",
    updatedAt: "2026-01-11T21:57:12.627Z",
    __v: 0,
    type: "cause",
    ods: [
      "14"
    ],
    startDate: "2026-03-01T21:57:07.449Z",
    duration: 97,
    communityId: "00b75a73-f239-4162-9c90-55c4bedeb9df"
  },
  {
    _id: "9b7dfa76-8966-4e21-8bd3-26415933f7ee",
    name: "Asociación Deckow, Monahan and Hand por igualdad d",
    description: "Comunidad dedicada a proyectos de igualdad de género y desarrollo sostenible. Territo umbra altus tabernus cultura sollers. Corrigo ratione deinde urbs voluptatum crepusculum derideo terreo sui debiti",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:57:12.688Z",
    updatedAt: "2026-01-11T21:57:12.688Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "5833d490-626c-4e79-b25b-133250cf902b",
    name: "Programa agua potable 2026",
    description: "Causa benéfica enfocada en agua potable. Accusantium correptius ager.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:57:12.689Z",
    updatedAt: "2026-01-11T21:57:12.689Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "4",
      "7"
    ],
    startDate: "2026-07-30T20:57:07.512Z",
    duration: 273,
    communityId: "9b7dfa76-8966-4e21-8bd3-26415933f7ee"
  },
  {
    _id: "5178e187-45f5-4c9b-bb39-6c53faa34d62",
    name: "Comunidad Goldner - Bartoletti por infancia",
    description: "Comunidad dedicada a proyectos de infancia y desarrollo sostenible. Tibi facere voluptatem dolorem. Cibo arto summisse aestas crudelis agnosco curis consectetur terra subito.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:12.749Z",
    updatedAt: "2026-01-11T21:57:12.749Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "aa14ece2-731c-4d53-9b9a-0c82e65dcd57",
    name: "Programa infancia 2027",
    description: "Causa benéfica enfocada en infancia. Absens verus paulatim.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:12.750Z",
    updatedAt: "2026-01-11T21:57:12.750Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "4"
    ],
    startDate: "2026-03-13T21:57:07.574Z",
    duration: 80,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "8345427d-7af1-401d-9ef7-0426afb03e5b",
    name: "Red de apoyo medio ambiente 2026",
    description: "Causa benéfica enfocada en medio ambiente. Contabesco corporis beatus cibo aperte somniculosus tempora vilicus quis ager.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:12.750Z",
    updatedAt: "2026-01-11T21:57:12.750Z",
    __v: 0,
    type: "cause",
    ods: [
      "4",
      "11",
      "3"
    ],
    startDate: "2026-03-10T21:57:07.574Z",
    duration: 40,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "389e77f6-a369-4240-babb-e3e20a8624c3",
    name: "Comunidad Ruecker Group por vivienda",
    description: "Comunidad dedicada a proyectos de vivienda y desarrollo sostenible. Temperantia adipiscor tricesimus. Abutor copiose coma vociferor.",
    status: "approved",
    reason: "",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:57:12.811Z",
    updatedAt: "2026-01-11T21:57:12.811Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "5809e336-5bfa-4831-94c8-53309716646a",
    name: "Operación vivienda 2026",
    description: "Causa benéfica enfocada en vivienda. Defendo placeat utrimque textus comes dolores adimpleo aeger suffoco deduco.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:57:12.812Z",
    updatedAt: "2026-01-11T21:57:12.812Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "13",
      "3"
    ],
    startDate: "2026-05-04T20:57:07.637Z",
    duration: 92,
    communityId: "389e77f6-a369-4240-babb-e3e20a8624c3"
  },
  {
    _id: "6cd3e7f7-c1b3-47a0-948c-83060ca95b11",
    name: "Red Greenfelder LLC por refugiados",
    description: "Comunidad dedicada a proyectos de refugiados y desarrollo sostenible. Quia animi tandem tubineus veniam.",
    status: "approved",
    reason: "",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:57:12.871Z",
    updatedAt: "2026-01-11T21:57:12.871Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "b89efe33-be16-4450-9f8e-24a634945427",
    name: "Iniciativa medio ambiente 2026",
    description: "Causa benéfica enfocada en medio ambiente. Pariatur abbas tubineus in vicinus amo tremo laborum delibero.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:57:12.872Z",
    updatedAt: "2026-01-11T21:57:12.872Z",
    __v: 0,
    type: "cause",
    ods: [
      "6"
    ],
    startDate: "2026-08-04T20:57:07.698Z",
    duration: 66,
    communityId: "6cd3e7f7-c1b3-47a0-948c-83060ca95b11"
  },
  {
    _id: "76727ad3-945e-4c86-aaa6-706c07069d82",
    name: "Acción solidaria refugiados 2026",
    description: "Causa benéfica enfocada en refugiados. Asperiores quo acsi cruentus talus torqueo vomer terreo paulatim. Sunt sto pecco ambulo casus.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:57:12.873Z",
    updatedAt: "2026-01-11T21:57:12.873Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "14"
    ],
    startDate: "2026-06-22T20:57:07.698Z",
    duration: 364,
    communityId: "6cd3e7f7-c1b3-47a0-948c-83060ca95b11"
  },
  {
    _id: "f2693cb3-2172-4d6d-a3a4-e04599268e37",
    name: "Iniciativa refugiados 2027",
    description: "Causa benéfica enfocada en refugiados. Porro turpis sufficio adsidue triduana torrens.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:57:12.874Z",
    updatedAt: "2026-01-11T21:57:12.874Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "10",
      "5"
    ],
    startDate: "2026-03-04T21:57:07.698Z",
    duration: 343,
    communityId: "6cd3e7f7-c1b3-47a0-948c-83060ca95b11"
  },
  {
    _id: "bc7b53ca-4212-4601-86eb-af5cad4d98fb",
    name: "Comunidad Balistreri LLC por desarrollo sostenible",
    description: "Comunidad dedicada a proyectos de desarrollo sostenible y desarrollo sostenible. Asper ascisco teneo. Adipiscor delectus stella tremo tum terga quod caste.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:12.947Z",
    updatedAt: "2026-01-11T21:57:12.947Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "e4e71669-8c17-4868-aaf4-b4d69b29648e",
    name: "Operación derechos humanos 2026",
    description: "Causa benéfica enfocada en derechos humanos. Laborum quaerat succurro vester sonitus vacuus decet vesco. Capio asper cruentus valeo.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:12.948Z",
    updatedAt: "2026-01-11T21:57:12.948Z",
    __v: 0,
    type: "cause",
    ods: [
      "14",
      "6"
    ],
    startDate: "2026-08-04T20:57:07.759Z",
    duration: 273,
    communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb"
  },
  {
    _id: "d1489a0c-6baf-4bdb-babe-5f8142f158a6",
    name: "Proyecto desarrollo sostenible 2027",
    description: "Causa benéfica enfocada en desarrollo sostenible. Iusto amet certe laudantium cuius autem.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:12.949Z",
    updatedAt: "2026-01-11T21:57:12.949Z",
    __v: 0,
    type: "cause",
    ods: [
      "6",
      "15",
      "17"
    ],
    startDate: "2026-05-29T20:57:07.759Z",
    duration: 299,
    communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb"
  },
  {
    _id: "d607c398-a6ec-4474-a49d-de4585aeeaff",
    name: "Colectivo Turcotte LLC por salud",
    description: "Comunidad dedicada a proyectos de salud y desarrollo sostenible. Denique varietas vulgo neque agnosco. Adopto voluptates balbus.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:13.011Z",
    updatedAt: "2026-01-11T21:57:13.011Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "15615fce-661b-4c6b-b693-2d80ce3b9aef",
    name: "Iniciativa vivienda 2027",
    description: "Causa benéfica enfocada en vivienda. Temperantia tricesimus cicuta ustilo ciminatio occaecati turbo virtus distinctio amita. Possimus voluptate defleo calco comminor.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:13.012Z",
    updatedAt: "2026-01-11T21:57:13.012Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "10",
      "11"
    ],
    startDate: "2026-02-17T21:57:07.821Z",
    duration: 196,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "64dc66d7-afe1-443d-b5a5-80c17ff6f3cc",
    name: "Iniciativa tercera edad 2027",
    description: "Causa benéfica enfocada en tercera edad. Voluptate adeo triduana abutor vilicus. Turba sufficio aeneus sunt sonitus terror.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:13.013Z",
    updatedAt: "2026-01-11T21:57:13.013Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "5",
      "6"
    ],
    startDate: "2026-06-22T20:57:07.821Z",
    duration: 48,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "edc6bbf4-6374-4712-bba5-62080fb9d86e",
    name: "Operación derechos humanos 2027",
    description: "Causa benéfica enfocada en derechos humanos. Cauda soleo antiquus thorax tego tenus arcesso casso at thorax. Asper annus studio desolo vulticulus derideo chirographum.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:13.014Z",
    updatedAt: "2026-01-11T21:57:13.014Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-02-16T21:57:07.821Z",
    duration: 208,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "73017429-18ab-49fa-9783-773e1037c79a",
    name: "Grupo Denesik LLC por discapacidad",
    description: "Comunidad dedicada a proyectos de discapacidad y desarrollo sostenible. Utpote canto conatus degero vigilo. Valetudo volva trepide angelus cum volaticus comptus succurro.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "ebdd9b54-28b4-42ac-8787-d3907f3daad2",
    createdAt: "2026-01-11T21:57:13.087Z",
    updatedAt: "2026-01-11T21:57:13.087Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "d31b6946-9370-4b6f-bfc4-ff6b91499775",
    name: "Campaña educación 2027",
    description: "Causa benéfica enfocada en educación. Thema decet tepidus tergum. Absens sint totam delibero spectaculum alias ceno.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "ebdd9b54-28b4-42ac-8787-d3907f3daad2",
    createdAt: "2026-01-11T21:57:13.088Z",
    updatedAt: "2026-01-11T21:57:13.088Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "17"
    ],
    startDate: "2026-05-31T20:57:07.883Z",
    duration: 55,
    communityId: "73017429-18ab-49fa-9783-773e1037c79a"
  },
  {
    _id: "13eb69c8-a604-4c1d-b61a-9b33453140ab",
    name: "Proyecto educación 2027",
    description: "Causa benéfica enfocada en educación. Uter centum cuius conservo culpo adsum.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "ebdd9b54-28b4-42ac-8787-d3907f3daad2",
    createdAt: "2026-01-11T21:57:13.089Z",
    updatedAt: "2026-01-11T21:57:13.089Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "14"
    ],
    startDate: "2026-02-11T21:57:07.883Z",
    duration: 59,
    communityId: "73017429-18ab-49fa-9783-773e1037c79a"
  },
  {
    _id: "d91fb04b-e83d-4a37-9570-4636d55b3c29",
    name: "Acción solidaria emergencias 2027",
    description: "Causa benéfica enfocada en emergencias. Amiculum deduco ara iusto vereor. Tametsi dolores tres vero.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "ebdd9b54-28b4-42ac-8787-d3907f3daad2",
    createdAt: "2026-01-11T21:57:13.090Z",
    updatedAt: "2026-01-11T21:57:13.090Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-07-24T20:57:07.883Z",
    duration: 310,
    communityId: "73017429-18ab-49fa-9783-773e1037c79a"
  },
  {
    _id: "28429ef1-d52f-4e4f-9df3-efa33e8fc351",
    name: "Red Abernathy - Halvorson por vivienda",
    description: "Comunidad dedicada a proyectos de vivienda y desarrollo sostenible. Cattus sono defleo derelinquo solvo adipiscor eum defleo vilitas. Voluptas beneficium thesaurus tres.",
    status: "approved",
    reason: "",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:57:13.150Z",
    updatedAt: "2026-01-11T21:57:13.150Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "0c9834f2-9379-4d84-b042-e41975f05799",
    name: "Acción solidaria discapacidad 2026",
    description: "Causa benéfica enfocada en discapacidad. Debeo adulescens denuo decumbo voro confugo substantia aegrus totus.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:57:13.151Z",
    updatedAt: "2026-01-11T21:57:13.151Z",
    __v: 0,
    type: "cause",
    ods: [
      "13"
    ],
    startDate: "2026-05-01T20:57:07.945Z",
    duration: 179,
    communityId: "28429ef1-d52f-4e4f-9df3-efa33e8fc351"
  },
  {
    _id: "506559e5-9852-43dc-ab35-b1927554cf46",
    name: "Campaña salud 2026",
    description: "Causa benéfica enfocada en salud. Cupiditate vilitas pecus impedit demum vilicus aggero.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:57:13.152Z",
    updatedAt: "2026-01-11T21:57:13.152Z",
    __v: 0,
    type: "cause",
    ods: [
      "4"
    ],
    startDate: "2026-03-06T21:57:07.945Z",
    duration: 296,
    communityId: "28429ef1-d52f-4e4f-9df3-efa33e8fc351"
  },
  {
    _id: "c480d110-4dc6-4353-be4b-8085b955bba6",
    name: "Grupo Carroll and Sons por vivienda",
    description: "Comunidad dedicada a proyectos de vivienda y desarrollo sostenible. Ante tamisium uxor bonus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "b5fc6fda-03b7-4ac1-9e82-8dd0aac96b6c",
    createdAt: "2026-01-11T21:57:13.213Z",
    updatedAt: "2026-01-11T21:57:13.213Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "7e019802-6bf8-4207-bc1c-2d57d23c5bdb",
    name: "Operación educación 2027",
    description: "Causa benéfica enfocada en educación. Succurro utroque arbustum.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "b5fc6fda-03b7-4ac1-9e82-8dd0aac96b6c",
    createdAt: "2026-01-11T21:57:13.214Z",
    updatedAt: "2026-01-11T21:57:13.214Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-03-01T21:57:08.007Z",
    duration: 265,
    communityId: "c480d110-4dc6-4353-be4b-8085b955bba6"
  },
  {
    _id: "069123cb-5803-4e98-81e6-5b386fe903e4",
    name: "Movimiento refugiados 2026",
    description: "Causa benéfica enfocada en refugiados. Spiculum absens utilis inventore somnus cursim vesica administratio. Tribuo totidem combibo corpus.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "b5fc6fda-03b7-4ac1-9e82-8dd0aac96b6c",
    createdAt: "2026-01-11T21:57:13.215Z",
    updatedAt: "2026-01-11T21:57:13.215Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "13"
    ],
    startDate: "2026-08-04T20:57:08.007Z",
    duration: 323,
    communityId: "c480d110-4dc6-4353-be4b-8085b955bba6"
  },
  {
    _id: "5ef7ccd8-2fdf-4e4f-a2df-229efc651e4a",
    name: "Acción solidaria salud 2027",
    description: "Causa benéfica enfocada en salud. Sint ars assumenda sonitus amo canonicus.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "b5fc6fda-03b7-4ac1-9e82-8dd0aac96b6c",
    createdAt: "2026-01-11T21:57:13.216Z",
    updatedAt: "2026-01-11T21:57:13.216Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "8"
    ],
    startDate: "2026-04-10T20:57:08.007Z",
    duration: 119,
    communityId: "c480d110-4dc6-4353-be4b-8085b955bba6"
  },
  {
    _id: "cec05cc1-ea24-4de6-80d7-d0d21759efa3",
    name: "Fundación Haley Group por desarrollo sostenible",
    description: "Comunidad dedicada a proyectos de desarrollo sostenible y desarrollo sostenible. Cimentarius vergo umquam eius utrimque degenero cogo. Error thorax delectus adfero ager adsuesco suscipio textilis.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d2a8d8ea-5a71-4d23-916d-6b5576cd490e",
    createdAt: "2026-01-11T21:57:13.277Z",
    updatedAt: "2026-01-11T21:57:13.277Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "dd5c20f1-a249-4893-acf9-8e54261e84ac",
    name: "Movimiento infancia 2026",
    description: "Causa benéfica enfocada en infancia. Adamo tener vulariter conicio timor valetudo aro. Cohibeo tremo concedo defero atrox.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "d2a8d8ea-5a71-4d23-916d-6b5576cd490e",
    createdAt: "2026-01-11T21:57:13.278Z",
    updatedAt: "2026-01-11T21:57:13.278Z",
    __v: 0,
    type: "cause",
    ods: [
      "8"
    ],
    startDate: "2026-04-04T20:57:08.070Z",
    duration: 363,
    communityId: "cec05cc1-ea24-4de6-80d7-d0d21759efa3"
  },
  {
    _id: "7c87b42b-a45a-415c-84e3-bef8bd8451c0",
    name: "Iniciativa emergencias 2027",
    description: "Causa benéfica enfocada en emergencias. Vomer suus advoco comis tot.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "d2a8d8ea-5a71-4d23-916d-6b5576cd490e",
    createdAt: "2026-01-11T21:57:13.279Z",
    updatedAt: "2026-01-11T21:57:13.279Z",
    __v: 0,
    type: "cause",
    ods: [
      "3"
    ],
    startDate: "2026-08-08T20:57:08.070Z",
    duration: 109,
    communityId: "cec05cc1-ea24-4de6-80d7-d0d21759efa3"
  },
  {
    _id: "f593cfae-f034-4d01-bd6c-4ccb50392c31",
    name: "Colectivo Braun - Gutmann por educación",
    description: "Comunidad dedicada a proyectos de educación y desarrollo sostenible. Tot colligo credo advenio.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f51405fb-92b4-4239-80c3-ef602d934b5a",
    createdAt: "2026-01-11T21:57:13.339Z",
    updatedAt: "2026-01-11T21:57:13.339Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "c6c3a7bf-e544-441c-b451-349908586507",
    name: "Programa salud 2027",
    description: "Causa benéfica enfocada en salud. Viridis provident conor ultio tutis crinis vilitas vehemens amitto. Vereor antea appello despecto temptatio cubitum.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "f51405fb-92b4-4239-80c3-ef602d934b5a",
    createdAt: "2026-01-11T21:57:13.340Z",
    updatedAt: "2026-01-11T21:57:13.340Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "11"
    ],
    startDate: "2026-06-05T20:57:08.132Z",
    duration: 340,
    communityId: "f593cfae-f034-4d01-bd6c-4ccb50392c31"
  },
  {
    _id: "26b4fb18-3552-498a-92f2-375ad7b36862",
    name: "Iniciativa agua potable 2027",
    description: "Causa benéfica enfocada en agua potable. Verbum sub debitis cimentarius.",
    status: "rejected",
    reason: "Rejected as part of community request.",
    userId: "f51405fb-92b4-4239-80c3-ef602d934b5a",
    createdAt: "2026-01-11T21:57:13.341Z",
    updatedAt: "2026-01-11T21:57:13.341Z",
    __v: 0,
    type: "cause",
    ods: [
      "15"
    ],
    startDate: "2026-03-12T21:57:08.132Z",
    duration: 335,
    communityId: "f593cfae-f034-4d01-bd6c-4ccb50392c31"
  },
  {
    _id: "7ea16f99-d785-4624-b156-f181f3961a76",
    name: "Fundación Schumm Inc por infancia",
    description: "Comunidad dedicada a proyectos de infancia y desarrollo sostenible. Laboriosam suffoco culpo mollitia antiquus.",
    status: "approved",
    reason: "",
    userId: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    createdAt: "2026-01-11T21:57:13.403Z",
    updatedAt: "2026-01-11T21:57:13.403Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "d2cee368-b959-4b4b-ada4-e74c19847ac1",
    name: "Proyecto desarrollo sostenible 2027",
    description: "Causa benéfica enfocada en desarrollo sostenible. Incidunt stultus sponte autem carbo strenuus clarus ventus vilis. Adulescens cenaculum vero.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    createdAt: "2026-01-11T21:57:13.404Z",
    updatedAt: "2026-01-11T21:57:13.404Z",
    __v: 0,
    type: "cause",
    ods: [
      "11"
    ],
    startDate: "2026-06-13T20:57:08.193Z",
    duration: 198,
    communityId: "7ea16f99-d785-4624-b156-f181f3961a76"
  },
  {
    _id: "d3e47e79-9252-4df0-90de-f1ca68fca2eb",
    name: "Proyecto refugiados 2026",
    description: "Causa benéfica enfocada en refugiados. Alii crepusculum copiose traho paulatim solvo umbra. Adsidue taedium torrens casus cupiditas capillus confido arbitro ex adficio.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    createdAt: "2026-01-11T21:57:13.406Z",
    updatedAt: "2026-01-11T21:57:13.406Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-03-01T21:57:08.193Z",
    duration: 154,
    communityId: "7ea16f99-d785-4624-b156-f181f3961a76"
  },
  {
    _id: "df149923-f276-49e3-b828-e3c0e4ec205f",
    name: "Colectivo Schoen, Herman and Christiansen por infa",
    description: "Comunidad dedicada a proyectos de infancia y desarrollo sostenible. Assumenda ademptio numquam incidunt optio. Id vicinus admoveo.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:13.466Z",
    updatedAt: "2026-01-11T21:57:13.466Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "6bfd8462-ae78-43d3-8e0f-3c47131c5e12",
    name: "Movimiento agua potable 2026",
    description: "Causa benéfica enfocada en agua potable. Aptus conor excepturi varius iusto antea debeo.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:13.467Z",
    updatedAt: "2026-01-11T21:57:13.467Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "3",
      "13"
    ],
    startDate: "2026-02-22T21:57:08.256Z",
    duration: 191,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "4cbeb4ad-3d1e-441a-b5d4-d42f0773f4e1",
    name: "Acción solidaria medio ambiente 2027",
    description: "Causa benéfica enfocada en medio ambiente. Suus cognomen stabilis soleo. Ventosus maxime vehemens ustulo arx thermae aliqua.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:13.468Z",
    updatedAt: "2026-01-11T21:57:13.468Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "5",
      "6"
    ],
    startDate: "2026-04-24T20:57:08.256Z",
    duration: 281,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "70b00318-33b6-482d-87dd-22c518933f0e",
    name: "Fundación Kessler - Quitzon por refugiados",
    description: "Comunidad dedicada a proyectos de refugiados y desarrollo sostenible. Collum inflammatio tabesco compello.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:13.529Z",
    updatedAt: "2026-01-11T21:57:13.529Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "3f16f2a9-6715-48cf-a832-e91372806bf8",
    name: "Programa refugiados 2026",
    description: "Causa benéfica enfocada en refugiados. Vos laboriosam asporto corrupti subvenio tantum consequuntur textilis attero. Sit cibo vae.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:13.531Z",
    updatedAt: "2026-01-11T21:57:13.531Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "2",
      "10"
    ],
    startDate: "2026-02-15T21:57:08.319Z",
    duration: 144,
    communityId: "70b00318-33b6-482d-87dd-22c518933f0e"
  },
  {
    _id: "e1d655ff-44ea-4dd0-8966-5ae5cf45d3e4",
    name: "Iniciativa derechos humanos 2026",
    description: "Causa benéfica enfocada en derechos humanos. Averto stipes alienus curo derelinquo. Adduco correptius adulescens vado.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:13.532Z",
    updatedAt: "2026-01-11T21:57:13.532Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "15"
    ],
    startDate: "2026-06-02T20:57:08.319Z",
    duration: 267,
    communityId: "70b00318-33b6-482d-87dd-22c518933f0e"
  },
  {
    _id: "1bbf519c-546f-4782-8c8b-e290163a79cd",
    name: "Proyecto medio ambiente 2026",
    description: "Causa benéfica enfocada en medio ambiente. Provident ago curo arto vulgo modi. Succurro derideo denego dolorum aedificium comburo ultio.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:13.532Z",
    updatedAt: "2026-01-11T21:57:13.532Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "13",
      "9"
    ],
    startDate: "2026-07-02T20:57:08.319Z",
    duration: 193,
    communityId: "70b00318-33b6-482d-87dd-22c518933f0e"
  },
  {
    _id: "a0d04740-ffeb-4efb-9e8c-0b2a189fa150",
    name: "Comunidad Rogahn - Champlin por tercera edad",
    description: "Comunidad dedicada a proyectos de tercera edad y desarrollo sostenible. Est a cupiditas civitas crur astrum vomito cavus temperantia.",
    status: "pending",
    userId: "54b349f9-11ee-48a1-8473-fc79cdb9d675",
    createdAt: "2026-01-11T21:57:08.390Z",
    updatedAt: "2026-01-11T21:57:08.390Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "b1ff168e-b74f-4534-9e77-813f793e0b07",
    name: "Movimiento educación 2027",
    description: "Causa benéfica enfocada en educación. Conatus cursus testimonium sub corporis voco celebrer adinventitias. Alioqui animus conculco conatus tergeo alter pax speciosus.",
    status: "pending",
    userId: "54b349f9-11ee-48a1-8473-fc79cdb9d675",
    createdAt: "2026-01-11T21:57:08.392Z",
    updatedAt: "2026-01-11T21:57:08.392Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "3"
    ],
    startDate: "2026-05-11T20:57:08.381Z",
    duration: 156,
    communityId: "a0d04740-ffeb-4efb-9e8c-0b2a189fa150"
  },
  {
    _id: "38097c9c-393f-4e47-9bea-4d2d95e869fa",
    name: "Acción solidaria vivienda 2026",
    description: "Causa benéfica enfocada en vivienda. Vicissitudo stella deporto cubo vinco agnitio verbera viridis vulgivagus. Officiis laboriosam rem delectatio vulgo cilicium.",
    status: "pending",
    userId: "54b349f9-11ee-48a1-8473-fc79cdb9d675",
    createdAt: "2026-01-11T21:57:08.394Z",
    updatedAt: "2026-01-11T21:57:08.394Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "14",
      "10"
    ],
    startDate: "2026-06-04T20:57:08.381Z",
    duration: 356,
    communityId: "a0d04740-ffeb-4efb-9e8c-0b2a189fa150"
  },
  {
    _id: "0db2d9b5-ff38-479a-aaee-2b28f649cb11",
    name: "Colectivo Bode LLC por vivienda",
    description: "Comunidad dedicada a proyectos de vivienda y desarrollo sostenible. Communis velum aestus peccatus volubilis aer coadunatio dicta.",
    status: "approved",
    reason: "",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:57:13.654Z",
    updatedAt: "2026-01-11T21:57:13.654Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "a3a68f6f-1c6d-4572-b024-1b422e4c459e",
    name: "Acción solidaria salud 2027",
    description: "Causa benéfica enfocada en salud. Stips tamdiu velut acidus centum. Audacia atque tener.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:57:13.655Z",
    updatedAt: "2026-01-11T21:57:13.655Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "5",
      "4"
    ],
    startDate: "2026-07-16T20:57:08.443Z",
    duration: 249,
    communityId: "0db2d9b5-ff38-479a-aaee-2b28f649cb11"
  },
  {
    _id: "7f7864f1-f3b2-424e-9543-af99e5692ed5",
    name: "Colectivo Kemmer - Gleichner por discapacidad",
    description: "Comunidad dedicada a proyectos de discapacidad y desarrollo sostenible. Numquam vivo tamquam.",
    status: "pending",
    userId: "08eeb1ec-c76d-4389-b5c3-5c6b0b1b2253",
    createdAt: "2026-01-11T21:57:08.516Z",
    updatedAt: "2026-01-11T21:57:08.516Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "82518af4-7c1c-4aaf-803e-616e7d433aad",
    name: "Red de apoyo agua potable 2027",
    description: "Causa benéfica enfocada en agua potable. Benigne sordeo censura corrumpo cum vinum. Veritas appello cetera.",
    status: "pending",
    userId: "08eeb1ec-c76d-4389-b5c3-5c6b0b1b2253",
    createdAt: "2026-01-11T21:57:08.517Z",
    updatedAt: "2026-01-11T21:57:08.517Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "8",
      "1"
    ],
    startDate: "2026-03-13T21:57:08.506Z",
    duration: 325,
    communityId: "7f7864f1-f3b2-424e-9543-af99e5692ed5"
  },
  {
    _id: "4ed9e42a-fb82-4c90-9eb9-c280842de6a4",
    name: "Campaña infancia 2026",
    description: "Causa benéfica enfocada en infancia. Venustas vero tripudio compello consuasor sequi. Stillicidium creptio vallum vulgivagus ventus asper repudiandae cetera cursim vapulus.",
    status: "pending",
    userId: "08eeb1ec-c76d-4389-b5c3-5c6b0b1b2253",
    createdAt: "2026-01-11T21:57:08.518Z",
    updatedAt: "2026-01-11T21:57:08.518Z",
    __v: 0,
    type: "cause",
    ods: [
      "9"
    ],
    startDate: "2026-03-26T21:57:08.506Z",
    duration: 104,
    communityId: "7f7864f1-f3b2-424e-9543-af99e5692ed5"
  },
  {
    _id: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a",
    name: "Colectivo Lang Group por agua potable",
    description: "Comunidad dedicada a proyectos de agua potable y desarrollo sostenible. Suppellex cumque conforto tonsor.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:13.778Z",
    updatedAt: "2026-01-11T21:57:13.778Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "b2a4d74d-2f24-49c4-9400-f5b90f583c50",
    name: "Jornada derechos humanos 2027",
    description: "Causa benéfica enfocada en derechos humanos. Deficio creta traho. Sursum ullam voluptatem adicio defessus adimpleo textus ante cerno ultra.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:13.779Z",
    updatedAt: "2026-01-11T21:57:13.779Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-06-13T20:57:08.568Z",
    duration: 311,
    communityId: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a"
  },
  {
    _id: "fd6611d7-54e3-4fc9-a369-7585127c806a",
    name: "Fundación Weissnat, Bergnaum and Rodriguez por viv",
    description: "Comunidad dedicada a proyectos de vivienda y desarrollo sostenible. Urbs mollitia tui ultra hic. Accusator conscendo cenaculum peccatus sonitus facilis cinis.",
    status: "pending",
    userId: "b8cc95bb-e731-430b-a1f2-dfad99a64afb",
    createdAt: "2026-01-11T21:57:08.641Z",
    updatedAt: "2026-01-11T21:57:08.641Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "31697d26-9b07-47d1-a29c-e42002697625",
    name: "Iniciativa pobreza 2026",
    description: "Causa benéfica enfocada en pobreza. Audax taedium arbor coepi coruscus vinculum sortitus curia curia temeritas.",
    status: "pending",
    userId: "b8cc95bb-e731-430b-a1f2-dfad99a64afb",
    createdAt: "2026-01-11T21:57:08.643Z",
    updatedAt: "2026-01-11T21:57:08.643Z",
    __v: 0,
    type: "cause",
    ods: [
      "16"
    ],
    startDate: "2026-08-03T20:57:08.631Z",
    duration: 265,
    communityId: "fd6611d7-54e3-4fc9-a369-7585127c806a"
  },
  {
    _id: "9c097517-6212-4307-b5fb-6d82ec225687",
    name: "Operación medio ambiente 2027",
    description: "Causa benéfica enfocada en medio ambiente. Centum audacia tactus synagoga tardus vaco.",
    status: "pending",
    userId: "b8cc95bb-e731-430b-a1f2-dfad99a64afb",
    createdAt: "2026-01-11T21:57:08.644Z",
    updatedAt: "2026-01-11T21:57:08.644Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "3",
      "6"
    ],
    startDate: "2026-04-17T20:57:08.631Z",
    duration: 213,
    communityId: "fd6611d7-54e3-4fc9-a369-7585127c806a"
  },
  {
    _id: "df638cc1-d749-4b89-9448-728abf2e832a",
    name: "Jornada refugiados 2026",
    description: "Causa benéfica enfocada en refugiados. Sursum amoveo coniecto unde tribuo cibo. Terminatio nihil defero aeneus coniecto alii demonstro acies illo culpa.",
    status: "pending",
    userId: "b8cc95bb-e731-430b-a1f2-dfad99a64afb",
    createdAt: "2026-01-11T21:57:08.646Z",
    updatedAt: "2026-01-11T21:57:08.646Z",
    __v: 0,
    type: "cause",
    ods: [
      "2"
    ],
    startDate: "2026-07-09T20:57:08.631Z",
    duration: 181,
    communityId: "fd6611d7-54e3-4fc9-a369-7585127c806a"
  },
  {
    _id: "2f40cde8-4789-4616-843c-b98967b76ed1",
    name: "Asociación Witting and Sons por pobreza",
    description: "Comunidad dedicada a proyectos de pobreza y desarrollo sostenible. Perferendis omnis sopor suscipit corrigo averto volubilis desino cetera. Cursim vilicus depopulo tutis teres cohibeo audax tardus id ",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:13.900Z",
    updatedAt: "2026-01-11T21:57:13.900Z",
    __v: 0,
    type: "community"
  },
  {
    _id: "4ff05a1f-2ddf-4c2b-8ea0-03ef7f168f06",
    name: "Iniciativa tercera edad 2026",
    description: "Causa benéfica enfocada en tercera edad. Aegrotatio depulso adinventitias deinde vulnero.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:13.901Z",
    updatedAt: "2026-01-11T21:57:13.901Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "3"
    ],
    startDate: "2026-08-07T20:57:08.692Z",
    duration: 183,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "4906854f-4f8a-47a2-8f0e-4da7c9ef4292",
    name: "Movimiento igualdad de género 2027",
    description: "Causa benéfica enfocada en igualdad de género. Deprimo arx arcesso cognatus vulariter. Derideo cognomen conventus comptus causa.",
    status: "approved",
    reason: "Approved as part of community request.",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:13.902Z",
    updatedAt: "2026-01-11T21:57:13.902Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "3"
    ],
    startDate: "2026-04-14T20:57:08.692Z",
    duration: 136,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "62e3592b-abfd-4753-91b6-63b278588ff4",
    name: "Operación discapacidad 2027",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Tyrannus adopto eligendi arcus vacuus textilis abduco tertius.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:30.833Z",
    updatedAt: "2026-01-11T21:57:30.833Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "11",
      "13"
    ],
    startDate: "2026-06-30T20:57:15.985Z",
    duration: 130,
    communityId: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a"
  },
  {
    _id: "c1cead8a-3ab0-402d-bc0e-b0dfb6f1a72f",
    name: "Proyecto desarrollo sostenible 2026",
    description: "Causa benéfica para apoyar iniciativas de desarrollo sostenible. Uxor solus caecus triduana sonitus atque.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:30.894Z",
    updatedAt: "2026-01-11T21:57:30.894Z",
    __v: 0,
    type: "cause",
    ods: [
      "3"
    ],
    startDate: "2026-06-14T20:57:16.083Z",
    duration: 294,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "3f1c2650-8608-4f67-9b8c-454addeeb255",
    name: "Proyecto derechos humanos 2026",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Accendo annus vinitor nisi tres vesper soleo.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:30.958Z",
    updatedAt: "2026-01-11T21:57:30.958Z",
    __v: 0,
    type: "cause",
    ods: [
      "5",
      "6"
    ],
    startDate: "2026-03-30T20:57:16.145Z",
    duration: 313,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "3047b50c-409a-4b9a-baec-792f22245857",
    name: "Proyecto agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Bis terreo valens claudeo doloribus adulescens.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:31.020Z",
    updatedAt: "2026-01-11T21:57:31.020Z",
    __v: 0,
    type: "cause",
    ods: [
      "3"
    ],
    startDate: "2026-04-01T20:57:16.207Z",
    duration: 199,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "c62f2784-9731-4e52-9ce7-0607e19975e8",
    name: "Proyecto agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Commemoro cetera vix asporto accendo.",
    status: "pending",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:16.300Z",
    updatedAt: "2026-01-11T21:57:16.300Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "17"
    ],
    startDate: "2026-08-03T20:57:16.284Z",
    duration: 212,
    communityId: "ced550b3-15ec-44de-bb86-51117ddbe581"
  },
  {
    _id: "13653ee5-63f9-451a-8513-3121f89d3cad",
    name: "Movimiento discapacidad 2027",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Sumo correptius adduco audax.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:57:31.144Z",
    updatedAt: "2026-01-11T21:57:31.144Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "8"
    ],
    startDate: "2026-03-20T21:57:16.346Z",
    duration: 327,
    communityId: "9b7dfa76-8966-4e21-8bd3-26415933f7ee"
  },
  {
    _id: "23221843-2c2d-4d7c-864b-1d1c222bc8a6",
    name: "Jornada tercera edad 2026",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Curatio vel alienus usus magnam explicabo aliquid armarium. Anser vinum usus comburo deinde aurum amita ait nam vitiosus.",
    status: "approved",
    reason: "",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:57:31.206Z",
    updatedAt: "2026-01-11T21:57:31.206Z",
    __v: 0,
    type: "cause",
    ods: [
      "4"
    ],
    startDate: "2026-05-20T20:57:16.408Z",
    duration: 64,
    communityId: "60bd8eba-a4bb-43a5-9834-a9bcfc8fe210"
  },
  {
    _id: "225e9f96-7f05-4a8e-baa8-945c954ae62d",
    name: "Proyecto emergencias 2027",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Cupio adflicto decimus ullus compono alo. Aiunt cena dens civitas defetiscor cohaero ipsum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:31.269Z",
    updatedAt: "2026-01-11T21:57:31.269Z",
    __v: 0,
    type: "cause",
    ods: [
      "5",
      "6"
    ],
    startDate: "2026-05-26T20:57:16.472Z",
    duration: 94,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "e6b793a6-6f4b-470e-94ad-c389633bf7ad",
    name: "Red de apoyo derechos humanos 2026",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Utrimque minus degusto nostrum ara derelinquo audio vivo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:57:31.333Z",
    updatedAt: "2026-01-11T21:57:31.333Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "3"
    ],
    startDate: "2026-03-05T21:57:16.533Z",
    duration: 202,
    communityId: "0db2d9b5-ff38-479a-aaee-2b28f649cb11"
  },
  {
    _id: "1d781f74-87ed-4148-91e0-f139fbc7cf08",
    name: "Movimiento educación 2027",
    description: "Causa benéfica para apoyar iniciativas de educación. Defungo commodi surgo vis confugo defluo audeo advoco cicuta caveo. Considero caput coaegresco cupressus tabula.",
    status: "pending",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:16.614Z",
    updatedAt: "2026-01-11T21:57:16.614Z",
    __v: 0,
    type: "cause",
    ods: [
      "4",
      "14"
    ],
    startDate: "2026-06-01T20:57:16.596Z",
    duration: 315,
    communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48"
  },
  {
    _id: "f70f1d8d-19b7-44c5-ad0c-9745941d1bea",
    name: "Campaña igualdad de género 2027",
    description: "Causa benéfica para apoyar iniciativas de igualdad de género. Vere clementia acquiro.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:31.456Z",
    updatedAt: "2026-01-11T21:57:31.456Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "11",
      "5"
    ],
    startDate: "2026-02-20T21:57:16.673Z",
    duration: 87,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "69762154-7569-4e73-b276-9ab956e26f54",
    name: "Operación agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Nam advoco bene terebro. Confido mollitia turpis vulgus.",
    status: "pending",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:16.748Z",
    updatedAt: "2026-01-11T21:57:16.748Z",
    __v: 0,
    type: "cause",
    ods: [
      "14"
    ],
    startDate: "2026-03-13T21:57:16.735Z",
    duration: 71,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "ac4bf9dd-e877-48cd-b2e9-8dd16a6f614e",
    name: "Iniciativa derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Vergo admoneo bonus demo umerus patria tendo vergo versus thorax. Creator asporto candidus cena derelinquo talis calamitas celebrer magnam.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:31.578Z",
    updatedAt: "2026-01-11T21:57:31.578Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "10",
      "6"
    ],
    startDate: "2026-06-14T20:57:16.798Z",
    duration: 294,
    communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb"
  },
  {
    _id: "65141745-5a4e-4f46-91fc-f7670415fc3c",
    name: "Iniciativa tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Sed caelum corpus clarus varietas.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:31.642Z",
    updatedAt: "2026-01-11T21:57:31.642Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "4",
      "8"
    ],
    startDate: "2026-04-13T20:57:16.860Z",
    duration: 260,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "00eb9ac5-2a39-4393-882a-bd3cda254ad8",
    name: "Movimiento refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Sollers contra cattus clam tabgo consectetur. Tutis iure modi spes quis statim tersus centum reiciendis angulus.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:31.704Z",
    updatedAt: "2026-01-11T21:57:31.704Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "12"
    ],
    startDate: "2026-03-19T21:57:16.924Z",
    duration: 313,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "087127d0-eb04-49a6-b616-e10b09bdad30",
    name: "Jornada desarrollo sostenible 2027",
    description: "Causa benéfica para apoyar iniciativas de desarrollo sostenible. Ter caput deorsum dolores possimus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:31.767Z",
    updatedAt: "2026-01-11T21:57:31.767Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "17"
    ],
    startDate: "2026-04-28T20:57:16.986Z",
    duration: 93,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "4b674101-244e-4411-893f-21cac74cec77",
    name: "Movimiento infancia 2026",
    description: "Causa benéfica para apoyar iniciativas de infancia. Cito crudelis amoveo urbs contra arcesso amita. Tergiversatio vestigium coniecto argentum commodo cerno crapula animus nobis.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:31.827Z",
    updatedAt: "2026-01-11T21:57:31.827Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-04-13T20:57:17.048Z",
    duration: 63,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "873b6529-0cc9-4876-a37f-dfb1339acd78",
    name: "Programa igualdad de género 2027",
    description: "Causa benéfica para apoyar iniciativas de igualdad de género. Abbas valetudo apto claudeo beatae tempus defleo torrens.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:31.891Z",
    updatedAt: "2026-01-11T21:57:31.891Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "2",
      "5"
    ],
    startDate: "2026-04-10T20:57:17.110Z",
    duration: 187,
    communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0"
  },
  {
    _id: "a047d6ad-51d3-4f5e-97aa-771342a11c0d",
    name: "Campaña alimentación 2026",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Cursus venustas decor. Statim vulnero artificiose defendo.",
    status: "approved",
    reason: "",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:57:31.952Z",
    updatedAt: "2026-01-11T21:57:31.952Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "13",
      "15"
    ],
    startDate: "2026-06-30T20:57:17.173Z",
    duration: 270,
    communityId: "60bd8eba-a4bb-43a5-9834-a9bcfc8fe210"
  },
  {
    _id: "00540f65-607d-48fc-9886-1e1ef4f06a57",
    name: "Iniciativa educación 2027",
    description: "Causa benéfica para apoyar iniciativas de educación. Caute aspicio maiores textus repellat vilis.",
    status: "pending",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:17.250Z",
    updatedAt: "2026-01-11T21:57:17.250Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "17",
      "13"
    ],
    startDate: "2026-04-06T20:57:17.236Z",
    duration: 152,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "587b8a43-7335-43c8-a844-a1160002bdc9",
    name: "Jornada infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Vomito arbitro sint.",
    status: "approved",
    reason: "",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:57:32.078Z",
    updatedAt: "2026-01-11T21:57:32.078Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "15"
    ],
    startDate: "2026-08-01T20:57:17.298Z",
    duration: 160,
    communityId: "00b75a73-f239-4162-9c90-55c4bedeb9df"
  },
  {
    _id: "beeeec80-f1ed-4eb7-89cc-2c495b950822",
    name: "Red de apoyo igualdad de género 2027",
    description: "Causa benéfica para apoyar iniciativas de igualdad de género. Cornu ars deleo suasoria aggredior ambulo. Cubicularis stella vorax conturbo sursum volutabrum theologus ullam astrum decimus.",
    status: "approved",
    reason: "",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:57:32.140Z",
    updatedAt: "2026-01-11T21:57:32.140Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "8"
    ],
    startDate: "2026-04-09T20:57:17.359Z",
    duration: 195,
    communityId: "60bd8eba-a4bb-43a5-9834-a9bcfc8fe210"
  },
  {
    _id: "26557700-53e1-4454-a7e8-c4bf8bac28b6",
    name: "Red de apoyo pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Totus soleo laboriosam illo succedo vigilo optio clamo absorbeo vesper. Placeat comis solum conculco.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:32.203Z",
    updatedAt: "2026-01-11T21:57:32.203Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "9"
    ],
    startDate: "2026-06-03T20:57:17.422Z",
    duration: 120,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "67c378a8-8a68-4d4b-a3a7-79d2279fd434",
    name: "Proyecto agua potable 2026",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Deleo contigo curvo arguo collum defero currus. Voco patior tamen quasi verbera.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:32.266Z",
    updatedAt: "2026-01-11T21:57:32.266Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "2"
    ],
    startDate: "2026-03-25T21:57:17.485Z",
    duration: 184,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "fd8c0477-5e2d-472e-83a4-1d045d06b880",
    name: "Jornada medio ambiente 2026",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Tracto cumque thymum synagoga tot utrimque. Tepesco non adsum votum tabella carus terebro.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:32.330Z",
    updatedAt: "2026-01-11T21:57:32.330Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "4",
      "1"
    ],
    startDate: "2026-05-13T20:57:17.546Z",
    duration: 122,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "dd85c58b-1fec-4fa2-8023-3da90eb5bc6c",
    name: "Programa refugiados 2026",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Tolero suppellex cotidie nesciunt ullam arbustum.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:32.391Z",
    updatedAt: "2026-01-11T21:57:32.391Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "17",
      "5"
    ],
    startDate: "2026-03-04T21:57:17.609Z",
    duration: 174,
    communityId: "bb21e942-ebfd-45e7-9ca5-e3da915cb7c9"
  },
  {
    _id: "ffbf9875-6e0d-4307-bcab-efcf527a2a7c",
    name: "Campaña alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Provident ambitus supplanto tego sequi aeternus delego decet.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:32.453Z",
    updatedAt: "2026-01-11T21:57:32.453Z",
    __v: 0,
    type: "cause",
    ods: [
      "1"
    ],
    startDate: "2026-03-07T21:57:17.670Z",
    duration: 41,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "6a6c6254-18b5-4261-8314-15ce89916b1f",
    name: "Programa infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Spectaculum compono saepe antea. Vero summa porro astrum.",
    status: "pending",
    userId: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    createdAt: "2026-01-11T21:57:17.746Z",
    updatedAt: "2026-01-11T21:57:17.746Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "15",
      "6"
    ],
    startDate: "2026-04-11T20:57:17.733Z",
    duration: 336,
    communityId: "7ea16f99-d785-4624-b156-f181f3961a76"
  },
  {
    _id: "89d220df-687f-4033-971d-39fd82dd4f7b",
    name: "Movimiento agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Consequuntur crinis paulatim vomica super vallum umquam. Cervus aequitas adamo tamisium adeo amiculum summopere magnam copia coniecto.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:57:32.579Z",
    updatedAt: "2026-01-11T21:57:32.579Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "8",
      "10"
    ],
    startDate: "2026-07-19T20:57:17.795Z",
    duration: 300,
    communityId: "0db2d9b5-ff38-479a-aaee-2b28f649cb11"
  },
  {
    _id: "045b0094-1063-4158-bc3f-654d0e42b325",
    name: "Movimiento agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Decretum demoror defluo voluptatum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:57:32.641Z",
    updatedAt: "2026-01-11T21:57:32.641Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "15"
    ],
    startDate: "2026-07-10T20:57:17.856Z",
    duration: 145,
    communityId: "6cd3e7f7-c1b3-47a0-948c-83060ca95b11"
  },
  {
    _id: "c4b646cd-ffe6-452c-b5e7-2ded60a98ddc",
    name: "Operación alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Dolorum adulatio voveo. Communis suggero solvo dens testimonium patruus.",
    status: "approved",
    reason: "",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:57:32.703Z",
    updatedAt: "2026-01-11T21:57:32.703Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "8",
      "16"
    ],
    startDate: "2026-02-25T21:57:17.918Z",
    duration: 212,
    communityId: "4d00e939-7fdc-4195-bf34-2f1cbf4e84af"
  },
  {
    _id: "bb8ac1b9-bad1-49cf-a93c-666169265e42",
    name: "Movimiento derechos humanos 2026",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Admoveo amissio conitor.",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:32.765Z",
    updatedAt: "2026-01-11T21:57:32.765Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "12",
      "11"
    ],
    startDate: "2026-07-28T20:57:17.978Z",
    duration: 292,
    communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0"
  },
  {
    _id: "7eb47858-5993-4e99-b72f-71e340b2e175",
    name: "Campaña desarrollo sostenible 2027",
    description: "Causa benéfica para apoyar iniciativas de desarrollo sostenible. Appello ut aptus verto adhaero ad commodi sub degusto consuasor. Iste absque utique urbs amoveo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:32.831Z",
    updatedAt: "2026-01-11T21:57:32.831Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "1"
    ],
    startDate: "2026-06-26T20:57:18.042Z",
    duration: 252,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "9ff79f22-0e20-4774-842b-25a1c99fb7a8",
    name: "Jornada derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Deprecator qui vorago. Labore summisse vulgivagus tracto ulciscor.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:32.908Z",
    updatedAt: "2026-01-11T21:57:32.908Z",
    __v: 0,
    type: "cause",
    ods: [
      "13"
    ],
    startDate: "2026-06-30T20:57:18.105Z",
    duration: 81,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "a7595e89-29f9-44cb-8611-17a12344a6b7",
    name: "Movimiento medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Avaritia vulnus adstringo bos vomer exercitationem tempus uredo sum. Fuga thorax caries cubitum arma calculus ventosus audax officiis.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:32.981Z",
    updatedAt: "2026-01-11T21:57:32.981Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "4",
      "5"
    ],
    startDate: "2026-04-03T20:57:18.167Z",
    duration: 288,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "ca04471c-dece-41cc-979e-8743be3796a8",
    name: "Movimiento pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Agnosco vado validus. Alo tempora conspergo trepide temperantia ocer valde.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:33.043Z",
    updatedAt: "2026-01-11T21:57:33.043Z",
    __v: 0,
    type: "cause",
    ods: [
      "1"
    ],
    startDate: "2026-04-04T20:57:18.230Z",
    duration: 199,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "b655e10e-d452-429e-9b2c-82815adf96dd",
    name: "Campaña tercera edad 2026",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Conscendo depulso curriculum callide fugiat. Coadunatio vesper tantillus.",
    status: "approved",
    reason: "",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:57:33.106Z",
    updatedAt: "2026-01-11T21:57:33.106Z",
    __v: 0,
    type: "cause",
    ods: [
      "11"
    ],
    startDate: "2026-07-09T20:57:18.292Z",
    duration: 88,
    communityId: "58c55259-195b-4e2b-b2f1-00f30b02197a"
  },
  {
    _id: "2a762ccd-10ef-493d-8093-67a3801f012b",
    name: "Jornada desarrollo sostenible 2026",
    description: "Causa benéfica para apoyar iniciativas de desarrollo sostenible. Possimus somniculosus suspendo vivo tricesimus valetudo vester.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:57:33.169Z",
    updatedAt: "2026-01-11T21:57:33.169Z",
    __v: 0,
    type: "cause",
    ods: [
      "4",
      "5"
    ],
    startDate: "2026-04-10T20:57:18.354Z",
    duration: 362,
    communityId: "0db2d9b5-ff38-479a-aaee-2b28f649cb11"
  },
  {
    _id: "0a2b9865-d1bd-4b47-8d60-e2926e75f19e",
    name: "Iniciativa educación 2027",
    description: "Causa benéfica para apoyar iniciativas de educación. Peccatus catena carcer curatio somniculosus candidus.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:33.233Z",
    updatedAt: "2026-01-11T21:57:33.233Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "6",
      "3"
    ],
    startDate: "2026-06-22T20:57:18.417Z",
    duration: 261,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "db7adc43-dc8a-4f00-b245-77a7952aa63b",
    name: "Proyecto refugiados 2026",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Apud degenero alo. Decens aequus denuo quaerat illum adsum.",
    status: "approved",
    reason: "",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:57:33.295Z",
    updatedAt: "2026-01-11T21:57:33.295Z",
    __v: 0,
    type: "cause",
    ods: [
      "11",
      "10",
      "12"
    ],
    startDate: "2026-06-18T20:57:18.480Z",
    duration: 283,
    communityId: "4d00e939-7fdc-4195-bf34-2f1cbf4e84af"
  },
  {
    _id: "d73b58d6-f3d3-4a85-8fa2-cbc1a9e6ea40",
    name: "Campaña discapacidad 2026",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Ducimus subseco sopor amet valens deduco capio aspernatur dignissimos.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:33.356Z",
    updatedAt: "2026-01-11T21:57:33.356Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "4"
    ],
    startDate: "2026-06-23T20:57:18.543Z",
    duration: 48,
    communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48"
  },
  {
    _id: "68a15511-0907-41f1-86bd-629c6ff881df",
    name: "Red de apoyo educación 2027",
    description: "Causa benéfica para apoyar iniciativas de educación. Acerbitas tabgo delinquo volup creator bellicus varius textor. Tametsi tubineus talus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    createdAt: "2026-01-11T21:57:33.418Z",
    updatedAt: "2026-01-11T21:57:33.418Z",
    __v: 0,
    type: "cause",
    ods: [
      "11"
    ],
    startDate: "2026-02-11T21:57:18.607Z",
    duration: 43,
    communityId: "7ea16f99-d785-4624-b156-f181f3961a76"
  },
  {
    _id: "7e60e1a5-3214-4e5e-bed0-f751a291f280",
    name: "Iniciativa pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Similique avaritia id thesis utrum solitudo. Delectatio trucido aegrotatio vetus.",
    status: "pending",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:18.685Z",
    updatedAt: "2026-01-11T21:57:18.685Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-06-22T20:57:18.670Z",
    duration: 338,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "39251fc7-43fd-4368-8970-921ddcbbf104",
    name: "Iniciativa emergencias 2026",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Speculum casso usus vulgus subnecto certe velit aeger depromo. Talis ullus absque.",
    status: "approved",
    reason: "",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:57:33.543Z",
    updatedAt: "2026-01-11T21:57:33.543Z",
    __v: 0,
    type: "cause",
    ods: [
      "13"
    ],
    startDate: "2026-08-05T20:57:18.731Z",
    duration: 165,
    communityId: "60bd8eba-a4bb-43a5-9834-a9bcfc8fe210"
  },
  {
    _id: "6193a027-96f8-4e91-a01e-89def64c4500",
    name: "Iniciativa refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Vulticulus tardus ascit repudiandae circumvenio inventore audeo.",
    status: "pending",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:57:18.805Z",
    updatedAt: "2026-01-11T21:57:18.805Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-07-31T20:57:18.792Z",
    duration: 259,
    communityId: "9b7dfa76-8966-4e21-8bd3-26415933f7ee"
  },
  {
    _id: "04805d2a-1eef-40b6-9cc0-7771ee4eaa06",
    name: "Operación educación 2026",
    description: "Causa benéfica para apoyar iniciativas de educación. Argentum turpis abstergo capio acceptus vallum tenus tendo trepide. Subvenio correptius ipsa aspicio tergiversatio.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:33.667Z",
    updatedAt: "2026-01-11T21:57:33.667Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "3",
      "5"
    ],
    startDate: "2026-05-26T20:57:18.856Z",
    duration: 164,
    communityId: "70b00318-33b6-482d-87dd-22c518933f0e"
  },
  {
    _id: "5c383e5e-28ea-4d99-b5ee-d6bdf4324b13",
    name: "Operación agua potable 2026",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Adfectus cubicularis sublime bardus aperio subnecto modi deludo.",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:33.730Z",
    updatedAt: "2026-01-11T21:57:33.730Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "5",
      "2"
    ],
    startDate: "2026-05-01T20:57:18.918Z",
    duration: 37,
    communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0"
  },
  {
    _id: "d4333aed-c78a-49fb-945e-8237cd23d0a2",
    name: "Campaña medio ambiente 2026",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Asporto creator soleo valetudo.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:33.793Z",
    updatedAt: "2026-01-11T21:57:33.793Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "16"
    ],
    startDate: "2026-06-13T20:57:18.980Z",
    duration: 81,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "44e8e71e-e56a-45ad-b5de-f2e047da486d",
    name: "Campaña discapacidad 2026",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Sui creptio arcesso cunctatio harum cruciamentum. Confero vapulus aeneus compello comis desolo coniecto acceptus commodo.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:33.856Z",
    updatedAt: "2026-01-11T21:57:33.856Z",
    __v: 0,
    type: "cause",
    ods: [
      "13"
    ],
    startDate: "2026-05-10T20:57:19.044Z",
    duration: 255,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "eed87ecf-692d-4b72-b6e2-8fb3c09f23ed",
    name: "Campaña medio ambiente 2026",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Curso spiculum antepono sumptus arto bellicus sortitus. Currus vilicus bis acidus comes theologus ulciscor curvo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:33.918Z",
    updatedAt: "2026-01-11T21:57:33.918Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "7",
      "14"
    ],
    startDate: "2026-06-12T20:57:19.108Z",
    duration: 156,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "a08e4b0e-a54d-400d-b652-5d7691a32257",
    name: "Operación tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Conforto thorax tricesimus volva infit concedo vigor amita cattus.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:33.980Z",
    updatedAt: "2026-01-11T21:57:33.980Z",
    __v: 0,
    type: "cause",
    ods: [
      "15"
    ],
    startDate: "2026-03-27T21:57:19.171Z",
    duration: 82,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "6d5e9cb7-9023-49ad-ac09-2a13ce8b5f4e",
    name: "Programa salud 2027",
    description: "Causa benéfica para apoyar iniciativas de salud. Adfero fuga deporto usitas cribro paens asporto tersus cariosus. Via vaco nesciunt appello titulus.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:34.041Z",
    updatedAt: "2026-01-11T21:57:34.041Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "15"
    ],
    startDate: "2026-02-18T21:57:19.234Z",
    duration: 73,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "e49ea717-bdfb-4020-8f5f-7a4be362f9cd",
    name: "Jornada vivienda 2027",
    description: "Causa benéfica para apoyar iniciativas de vivienda. Textus thesis theca tondeo cicuta at administratio contigo tantillus. Tollo aperte perferendis ago surgo succurro crastinus.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:34.104Z",
    updatedAt: "2026-01-11T21:57:34.104Z",
    __v: 0,
    type: "cause",
    ods: [
      "11",
      "16",
      "10"
    ],
    startDate: "2026-08-09T20:57:19.297Z",
    duration: 338,
    communityId: "ced550b3-15ec-44de-bb86-51117ddbe581"
  },
  {
    _id: "0e6c6c7b-7163-400e-8c87-50ad6c332784",
    name: "Jornada infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Tamdiu adaugeo turbo thymum. Tremo eveniet cornu pariatur tribuo tonsor vilitas chirographum amplus.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:34.168Z",
    updatedAt: "2026-01-11T21:57:34.168Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "14"
    ],
    startDate: "2026-03-17T21:57:19.359Z",
    duration: 214,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "39420fe8-9661-4e82-9585-20cf8f7442a4",
    name: "Acción solidaria vivienda 2027",
    description: "Causa benéfica para apoyar iniciativas de vivienda. Appositus velit sortitus vinco defetiscor terebro. Conventus laudantium iure cupiditate aetas sono ultra.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:34.232Z",
    updatedAt: "2026-01-11T21:57:34.232Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "9",
      "1"
    ],
    startDate: "2026-03-31T20:57:19.422Z",
    duration: 316,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "2bb53149-695b-4930-b50d-9ed9f4511cc8",
    name: "Campaña derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Repellendus volva tamdiu.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:34.293Z",
    updatedAt: "2026-01-11T21:57:34.293Z",
    __v: 0,
    type: "cause",
    ods: [
      "14",
      "16"
    ],
    startDate: "2026-06-04T20:57:19.485Z",
    duration: 277,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "65743436-e912-41ee-9a79-5ef675315a39",
    name: "Iniciativa salud 2026",
    description: "Causa benéfica para apoyar iniciativas de salud. Viduo adipiscor cruentus amoveo magni cultura comitatus vomer ciminatio. Approbo cuppedia tego ulciscor tumultus iste apto.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:34.353Z",
    updatedAt: "2026-01-11T21:57:34.353Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "4"
    ],
    startDate: "2026-03-14T21:57:19.547Z",
    duration: 52,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "52a03736-855f-4626-aa43-6b546768b598",
    name: "Jornada igualdad de género 2027",
    description: "Causa benéfica para apoyar iniciativas de igualdad de género. Copiose ulciscor somnus absorbeo crur animus creber alveus magnam.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:34.416Z",
    updatedAt: "2026-01-11T21:57:34.416Z",
    __v: 0,
    type: "cause",
    ods: [
      "6"
    ],
    startDate: "2026-06-03T20:57:19.610Z",
    duration: 192,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "02971d91-89cd-486c-a397-c1956f8327e0",
    name: "Programa pobreza 2027",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Vito aranea curia ter coepi depopulo uter deprimo pel curso.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:34.481Z",
    updatedAt: "2026-01-11T21:57:34.481Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "14"
    ],
    startDate: "2026-02-12T21:57:19.672Z",
    duration: 158,
    communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb"
  },
  {
    _id: "732176d8-e9de-4ebe-ac9c-e853c4ac7260",
    name: "Programa derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Compello valeo chirographum tondeo curtus. Campana tempus vallum adnuo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:57:34.541Z",
    updatedAt: "2026-01-11T21:57:34.541Z",
    __v: 0,
    type: "cause",
    ods: [
      "6",
      "16"
    ],
    startDate: "2026-02-13T21:57:19.735Z",
    duration: 66,
    communityId: "0db2d9b5-ff38-479a-aaee-2b28f649cb11"
  },
  {
    _id: "c1950498-c36a-4e80-b30c-774c6c60e656",
    name: "Operación medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Vobis consequuntur utpote patior ademptio. Auctor volup cilicium desino.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:34.604Z",
    updatedAt: "2026-01-11T21:57:34.604Z",
    __v: 0,
    type: "cause",
    ods: [
      "17",
      "12",
      "14"
    ],
    startDate: "2026-07-22T20:57:19.798Z",
    duration: 260,
    communityId: "bb21e942-ebfd-45e7-9ca5-e3da915cb7c9"
  },
  {
    _id: "f2e090df-eacc-43ab-9cb0-ab445ff55870",
    name: "Operación vivienda 2026",
    description: "Causa benéfica para apoyar iniciativas de vivienda. Curso ustulo accedo solio. Vomica aperte magnam calco sollicito atrocitas.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:34.668Z",
    updatedAt: "2026-01-11T21:57:34.668Z",
    __v: 0,
    type: "cause",
    ods: [
      "10"
    ],
    startDate: "2026-05-09T20:57:19.859Z",
    duration: 285,
    communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb"
  },
  {
    _id: "6d0c3bf3-9c2c-4dfb-9e08-dc685e4057b1",
    name: "Iniciativa emergencias 2027",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Amicitia adamo solutio delectatio dedico quisquam cauda vespillo.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:34.732Z",
    updatedAt: "2026-01-11T21:57:34.732Z",
    __v: 0,
    type: "cause",
    ods: [
      "17",
      "2"
    ],
    startDate: "2026-03-15T21:57:19.921Z",
    duration: 104,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "a71f9595-f761-4b9b-be6a-20cc03e85d56",
    name: "Campaña infancia 2026",
    description: "Causa benéfica para apoyar iniciativas de infancia. Tepidus sum vulgus valetudo amplitudo. Atque advoco blandior adulatio sulum confido chirographum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:34.805Z",
    updatedAt: "2026-01-11T21:57:34.805Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "6"
    ],
    startDate: "2026-05-28T20:57:19.983Z",
    duration: 297,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "8f067194-1457-4d8c-ab7e-ba6c2000e1be",
    name: "Operación derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Arcesso adiuvo ago sit vester. Tondeo vulticulus aeternus totidem voro assumenda eos.",
    status: "pending",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:20.058Z",
    updatedAt: "2026-01-11T21:57:20.058Z",
    __v: 0,
    type: "cause",
    ods: [
      "16"
    ],
    startDate: "2026-07-01T20:57:20.045Z",
    duration: 349,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "90a4c145-5904-466f-814d-ed30b7e82b4a",
    name: "Jornada tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Viduo cimentarius civitas.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:34.931Z",
    updatedAt: "2026-01-11T21:57:34.931Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "12"
    ],
    startDate: "2026-06-25T20:57:20.108Z",
    duration: 269,
    communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878"
  },
  {
    _id: "7b45de62-e3bf-4a57-a4cd-e01329ba0964",
    name: "Programa discapacidad 2027",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Contabesco tactus attonbitus pectus clamo argumentum. Atqui animadverto eius verus comedo expedita capillus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:34.994Z",
    updatedAt: "2026-01-11T21:57:34.994Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-07-13T20:57:20.170Z",
    duration: 329,
    communityId: "70b00318-33b6-482d-87dd-22c518933f0e"
  },
  {
    _id: "0d8d9f00-7059-4cdc-a28d-188382cff2e5",
    name: "Red de apoyo infancia 2026",
    description: "Causa benéfica para apoyar iniciativas de infancia. Defero pel caries vita atque caritas tempora. Corrigo annus velum.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:35.057Z",
    updatedAt: "2026-01-11T21:57:35.057Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "12",
      "13"
    ],
    startDate: "2026-05-17T20:57:20.232Z",
    duration: 360,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "10680ce1-ecdc-46ba-8325-0102b39092a7",
    name: "Red de apoyo desarrollo sostenible 2027",
    description: "Causa benéfica para apoyar iniciativas de desarrollo sostenible. Tergeo admiratio cervus cunabula cupiditas caecus. Tenax fugiat dignissimos alienus unde.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:35.118Z",
    updatedAt: "2026-01-11T21:57:35.118Z",
    __v: 0,
    type: "cause",
    ods: [
      "11",
      "14",
      "17"
    ],
    startDate: "2026-08-09T20:57:20.295Z",
    duration: 90,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "6a4c5934-d75f-4e22-915a-284b43962916",
    name: "Proyecto medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Tempora teres abutor baiulus ustilo similique apto.",
    status: "approved",
    reason: "",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:57:35.181Z",
    updatedAt: "2026-01-11T21:57:35.181Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "11",
      "2"
    ],
    startDate: "2026-07-05T20:57:20.357Z",
    duration: 300,
    communityId: "00b75a73-f239-4162-9c90-55c4bedeb9df"
  },
  {
    _id: "6928d8e3-f962-4743-ba33-9c86011daaf3",
    name: "Acción solidaria salud 2027",
    description: "Causa benéfica para apoyar iniciativas de salud. Aro dicta vomica approbo ars defero deprecator tantum. Consectetur censura spoliatio aut cimentarius.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:35.243Z",
    updatedAt: "2026-01-11T21:57:35.243Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "12"
    ],
    startDate: "2026-04-04T20:57:20.419Z",
    duration: 36,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "c0658543-41ad-4c64-ad5f-88a2b64a4b62",
    name: "Red de apoyo derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Calculus thymbra spes demo copia cultellus degenero sodalitas. Harum sub animadverto avarus coma quasi textus beatae verto.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:35.307Z",
    updatedAt: "2026-01-11T21:57:35.307Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-02-18T21:57:20.481Z",
    duration: 127,
    communityId: "ced550b3-15ec-44de-bb86-51117ddbe581"
  },
  {
    _id: "522d5a1f-7f33-4b1d-ac4c-ba789908bdb4",
    name: "Campaña agua potable 2026",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Bibo accusantium capto suffoco. Pariatur civis consectetur audax pecto arcesso tardus ademptio xiphias.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:35.368Z",
    updatedAt: "2026-01-11T21:57:35.368Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "3"
    ],
    startDate: "2026-03-12T21:57:20.542Z",
    duration: 67,
    communityId: "70b00318-33b6-482d-87dd-22c518933f0e"
  },
  {
    _id: "418661a8-2342-4a4c-8733-b49a665fc775",
    name: "Proyecto educación 2026",
    description: "Causa benéfica para apoyar iniciativas de educación. Beatus convoco absorbeo contego vapulus. Rerum culpa unus vito abduco surgo volo.",
    status: "approved",
    reason: "",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:57:35.430Z",
    updatedAt: "2026-01-11T21:57:35.430Z",
    __v: 0,
    type: "cause",
    ods: [
      "11",
      "1"
    ],
    startDate: "2026-06-07T20:57:20.604Z",
    duration: 90,
    communityId: "28429ef1-d52f-4e4f-9df3-efa33e8fc351"
  },
  {
    _id: "8c8f2fea-6cf2-4573-88d8-79d60f0831f7",
    name: "Iniciativa derechos humanos 2026",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Sustineo admitto victus eum tibi enim amo. Curis ter eos utilis thymbra creta.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:35.494Z",
    updatedAt: "2026-01-11T21:57:35.494Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "2",
      "8"
    ],
    startDate: "2026-04-01T20:57:20.666Z",
    duration: 359,
    communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0"
  },
  {
    _id: "41dce303-eb8f-48f4-b9ec-111ea9a0d087",
    name: "Campaña derechos humanos 2026",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Tolero spargo ventito correptius spiritus ancilla peccatus cito quisquam patrocinor. Calco cunabula supellex quod.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:35.556Z",
    updatedAt: "2026-01-11T21:57:35.556Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "13"
    ],
    startDate: "2026-05-15T20:57:20.728Z",
    duration: 354,
    communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878"
  },
  {
    _id: "38cac9d8-00ab-4daa-9ec2-2ba94bb7d3cf",
    name: "Proyecto infancia 2026",
    description: "Causa benéfica para apoyar iniciativas de infancia. Virga tersus capto tergum ratione cumque totam tepidus coma.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:35.619Z",
    updatedAt: "2026-01-11T21:57:35.619Z",
    __v: 0,
    type: "cause",
    ods: [
      "4",
      "1",
      "6"
    ],
    startDate: "2026-06-09T20:57:20.791Z",
    duration: 62,
    communityId: "bb21e942-ebfd-45e7-9ca5-e3da915cb7c9"
  },
  {
    _id: "8ed57a88-b492-4364-ab6f-cd7cf9b588c6",
    name: "Campaña vivienda 2026",
    description: "Causa benéfica para apoyar iniciativas de vivienda. Advoco acceptus universe maiores delego defero quod canonicus causa.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:35.680Z",
    updatedAt: "2026-01-11T21:57:35.680Z",
    __v: 0,
    type: "cause",
    ods: [
      "5",
      "11",
      "3"
    ],
    startDate: "2026-03-20T21:57:20.852Z",
    duration: 267,
    communityId: "70b00318-33b6-482d-87dd-22c518933f0e"
  },
  {
    _id: "3ee5dd8c-cad5-4fcc-b4c7-ced42e398f61",
    name: "Operación igualdad de género 2027",
    description: "Causa benéfica para apoyar iniciativas de igualdad de género. Tristis odit vetus confero amiculum. Corrumpo abscido nam porro aliquid.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:35.743Z",
    updatedAt: "2026-01-11T21:57:35.743Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "4",
      "16"
    ],
    startDate: "2026-02-28T21:57:20.916Z",
    duration: 138,
    communityId: "70b00318-33b6-482d-87dd-22c518933f0e"
  },
  {
    _id: "37413a9b-5629-4c6e-8635-eab2beba6444",
    name: "Campaña infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Vitium vehemens caput turbo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:35.805Z",
    updatedAt: "2026-01-11T21:57:35.805Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "10",
      "17"
    ],
    startDate: "2026-03-20T21:57:20.978Z",
    duration: 301,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "f3430fcd-5b71-48df-a961-11c31fd7c745",
    name: "Red de apoyo refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Certe comitatus aspicio excepturi candidus sursum vigilo thalassinus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:35.865Z",
    updatedAt: "2026-01-11T21:57:35.865Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "15"
    ],
    startDate: "2026-05-27T20:57:21.041Z",
    duration: 322,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "fe249097-ae58-4991-974d-4047dde643af",
    name: "Movimiento discapacidad 2027",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Varius impedit ascisco vos cornu peior defluo patruus subnecto.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:57:35.927Z",
    updatedAt: "2026-01-11T21:57:35.927Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "10",
      "9"
    ],
    startDate: "2026-04-28T20:57:21.105Z",
    duration: 266,
    communityId: "270bcccb-8cff-459d-a243-e33c878cfb6d"
  },
  {
    _id: "6c0df724-632a-4236-b4c8-5108880c7bcd",
    name: "Iniciativa refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Demitto vorax temperantia.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:57:35.990Z",
    updatedAt: "2026-01-11T21:57:35.990Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "9",
      "11"
    ],
    startDate: "2026-03-19T21:57:21.168Z",
    duration: 340,
    communityId: "270bcccb-8cff-459d-a243-e33c878cfb6d"
  },
  {
    _id: "166f4fd8-8e58-4773-8567-41195e1dfbb3",
    name: "Acción solidaria refugiados 2026",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Iure advenio ex caterva. Vinum usus timor.",
    status: "approved",
    reason: "",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:57:36.052Z",
    updatedAt: "2026-01-11T21:57:36.052Z",
    __v: 0,
    type: "cause",
    ods: [
      "16"
    ],
    startDate: "2026-03-19T21:57:21.231Z",
    duration: 155,
    communityId: "58c55259-195b-4e2b-b2f1-00f30b02197a"
  },
  {
    _id: "574f9f27-1285-48f2-bd1d-c91a3b74a452",
    name: "Operación infancia 2026",
    description: "Causa benéfica para apoyar iniciativas de infancia. Conscendo commodo reiciendis aegrus trado. Colo urbs atrocitas.",
    status: "pending",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:21.307Z",
    updatedAt: "2026-01-11T21:57:21.307Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-03-19T21:57:21.292Z",
    duration: 96,
    communityId: "bb21e942-ebfd-45e7-9ca5-e3da915cb7c9"
  },
  {
    _id: "b422702f-6af5-4b6f-9c9e-12af29412741",
    name: "Iniciativa alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Dolores tego dolorem cogo odio desidero. Crudelis bardus certus administratio minima tamdiu.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:36.176Z",
    updatedAt: "2026-01-11T21:57:36.176Z",
    __v: 0,
    type: "cause",
    ods: [
      "15"
    ],
    startDate: "2026-08-08T20:57:21.354Z",
    duration: 202,
    communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48"
  },
  {
    _id: "841e3ab6-31d8-4b84-8a5b-5ceb188bc08b",
    name: "Red de apoyo infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Arca confido depraedor vero asper celebrer degero socius vinco arx.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:57:36.239Z",
    updatedAt: "2026-01-11T21:57:36.239Z",
    __v: 0,
    type: "cause",
    ods: [
      "5",
      "6",
      "4"
    ],
    startDate: "2026-04-13T20:57:21.416Z",
    duration: 57,
    communityId: "645a3d2c-9c30-4138-bb08-561b55173d6e"
  },
  {
    _id: "e30c0c2e-95f7-46e3-90bc-adbfd1de95fe",
    name: "Acción solidaria emergencias 2026",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Vinco vomica velociter.",
    status: "pending",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:57:21.491Z",
    updatedAt: "2026-01-11T21:57:21.491Z",
    __v: 0,
    type: "cause",
    ods: [
      "3"
    ],
    startDate: "2026-07-11T20:57:21.478Z",
    duration: 100,
    communityId: "28429ef1-d52f-4e4f-9df3-efa33e8fc351"
  },
  {
    _id: "37c41ada-bebb-4f97-a29a-d4d2519972af",
    name: "Operación refugiados 2026",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Omnis clamo amissio sublime advoco aliquid sui. Abeo amo appositus.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:36.362Z",
    updatedAt: "2026-01-11T21:57:36.362Z",
    __v: 0,
    type: "cause",
    ods: [
      "2"
    ],
    startDate: "2026-05-09T20:57:21.540Z",
    duration: 175,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "cdf1f42a-4189-4865-835a-2b2abef75ee8",
    name: "Red de apoyo tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Adulatio chirographum adhuc articulus.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:36.424Z",
    updatedAt: "2026-01-11T21:57:36.424Z",
    __v: 0,
    type: "cause",
    ods: [
      "17"
    ],
    startDate: "2026-07-31T20:57:21.602Z",
    duration: 58,
    communityId: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a"
  },
  {
    _id: "f989a411-0aa6-4825-984a-32194fcfdf5a",
    name: "Red de apoyo discapacidad 2027",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Tergo adamo bardus magnam demitto texo anser traho amaritudo. Temeritas tolero animus spero vomica cruentus virtus.",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:36.486Z",
    updatedAt: "2026-01-11T21:57:36.486Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-04-19T20:57:21.665Z",
    duration: 93,
    communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0"
  },
  {
    _id: "54b6b259-44fa-4eb2-b633-3f270a6eb78d",
    name: "Campaña medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Vis veritatis candidus. Paulatim inflammatio ademptio aeneus veniam patria suadeo alter atrox.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:36.546Z",
    updatedAt: "2026-01-11T21:57:36.546Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "2"
    ],
    startDate: "2026-03-20T21:57:21.726Z",
    duration: 287,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "04173b0c-ee51-42b5-b343-63de2c9ef026",
    name: "Campaña alimentación 2026",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Damnatio odio aufero sponte vaco calamitas dens.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:36.608Z",
    updatedAt: "2026-01-11T21:57:36.608Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-05-02T20:57:21.789Z",
    duration: 230,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "143d354e-c2df-4840-981f-e2d77baa41cc",
    name: "Movimiento agua potable 2026",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Comitatus subiungo earum enim subito ustulo dignissimos atavus ullam. Suadeo arto derideo arx absum capto.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:36.672Z",
    updatedAt: "2026-01-11T21:57:36.672Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "3",
      "4"
    ],
    startDate: "2026-03-20T21:57:21.852Z",
    duration: 161,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "668927a2-3063-4b4a-97be-ced3cc23f67b",
    name: "Acción solidaria agua potable 2026",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Supellex defleo odio spes amita aranea ustilo.",
    status: "pending",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:21.927Z",
    updatedAt: "2026-01-11T21:57:21.927Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "8",
      "9"
    ],
    startDate: "2026-07-24T20:57:21.914Z",
    duration: 51,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "e513250c-2418-426e-814c-26e3a2bf79e5",
    name: "Movimiento agua potable 2026",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Conduco odio suppellex velit creo vehemens. Impedit amplus stipes clementia.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:36.795Z",
    updatedAt: "2026-01-11T21:57:36.795Z",
    __v: 0,
    type: "cause",
    ods: [
      "5"
    ],
    startDate: "2026-06-04T20:57:21.977Z",
    duration: 32,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "96a38731-a79d-4a87-b36e-7e56e358cfbc",
    name: "Movimiento salud 2026",
    description: "Causa benéfica para apoyar iniciativas de salud. Desidero videlicet vix debilito.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:36.857Z",
    updatedAt: "2026-01-11T21:57:36.857Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "4",
      "2"
    ],
    startDate: "2026-06-16T20:57:22.039Z",
    duration: 214,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "bf941804-e1be-4c1e-8d98-5cbcb08508e0",
    name: "Acción solidaria salud 2026",
    description: "Causa benéfica para apoyar iniciativas de salud. Clarus causa termes spes vulgo debeo crapula.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:57:36.921Z",
    updatedAt: "2026-01-11T21:57:36.921Z",
    __v: 0,
    type: "cause",
    ods: [
      "6",
      "13",
      "17"
    ],
    startDate: "2026-02-11T21:57:22.102Z",
    duration: 217,
    communityId: "645a3d2c-9c30-4138-bb08-561b55173d6e"
  },
  {
    _id: "4711079a-ddf2-453e-8941-fca4a8436590",
    name: "Iniciativa refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Cum vir convoco dolore.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:36.984Z",
    updatedAt: "2026-01-11T21:57:36.984Z",
    __v: 0,
    type: "cause",
    ods: [
      "8"
    ],
    startDate: "2026-06-01T20:57:22.164Z",
    duration: 344,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "d571ef73-ae41-43a0-aa8e-5e4409c504a1",
    name: "Acción solidaria pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Crinis amita suffragium explicabo accommodo vilicus tenetur clementia. Suasoria laudantium cotidie vos ante thesaurus temeritas possimus amo.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:37.046Z",
    updatedAt: "2026-01-11T21:57:37.046Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "15"
    ],
    startDate: "2026-04-14T20:57:22.225Z",
    duration: 169,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "649dbab5-5ed9-4a26-a927-25834886b28e",
    name: "Movimiento medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Hic aufero attollo vulticulus aspernatur verus recusandae solus termes.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:37.109Z",
    updatedAt: "2026-01-11T21:57:37.109Z",
    __v: 0,
    type: "cause",
    ods: [
      "6",
      "2",
      "15"
    ],
    startDate: "2026-05-15T20:57:22.289Z",
    duration: 287,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "87fde027-206d-4e3a-9a1f-e8a63e8da174",
    name: "Iniciativa igualdad de género 2026",
    description: "Causa benéfica para apoyar iniciativas de igualdad de género. Votum ancilla aurum inventore cresco utrimque tamen. Denique perspiciatis stabilis talis absconditus tamquam cibus cultura appello timor.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:37.170Z",
    updatedAt: "2026-01-11T21:57:37.170Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "1"
    ],
    startDate: "2026-06-05T20:57:22.351Z",
    duration: 354,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "3d5de100-5801-4092-aefa-1f2eef83c5a6",
    name: "Acción solidaria tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Sapiente viridis utor.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    createdAt: "2026-01-11T21:57:37.233Z",
    updatedAt: "2026-01-11T21:57:37.233Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "5"
    ],
    startDate: "2026-03-10T21:57:22.411Z",
    duration: 229,
    communityId: "7ea16f99-d785-4624-b156-f181f3961a76"
  },
  {
    _id: "e96653ef-a46c-419b-87ce-6775ac7cffc0",
    name: "Red de apoyo salud 2027",
    description: "Causa benéfica para apoyar iniciativas de salud. Aedificium bellum recusandae ea calamitas auctor accommodo.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:37.294Z",
    updatedAt: "2026-01-11T21:57:37.294Z",
    __v: 0,
    type: "cause",
    ods: [
      "5"
    ],
    startDate: "2026-04-10T20:57:22.473Z",
    duration: 295,
    communityId: "ced550b3-15ec-44de-bb86-51117ddbe581"
  },
  {
    _id: "71421cef-8292-438a-b99a-89b4811faaf7",
    name: "Movimiento pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Curiositas strues tenuis ars.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:37.356Z",
    updatedAt: "2026-01-11T21:57:37.356Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "11"
    ],
    startDate: "2026-06-14T20:57:22.535Z",
    duration: 72,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "9ad7ceed-4151-48c0-83f1-8cc50b483c7d",
    name: "Operación discapacidad 2026",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Vereor decipio neque possimus sollers sunt fuga celo libero adsuesco.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:37.419Z",
    updatedAt: "2026-01-11T21:57:37.419Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "14"
    ],
    startDate: "2026-08-02T20:57:22.596Z",
    duration: 198,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "c12c794c-22c9-4dbe-9254-a1f21739ff4b",
    name: "Iniciativa agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Cuppedia curia ipsa vulariter.",
    status: "approved",
    reason: "",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:57:37.480Z",
    updatedAt: "2026-01-11T21:57:37.480Z",
    __v: 0,
    type: "cause",
    ods: [
      "13"
    ],
    startDate: "2026-03-15T21:57:22.657Z",
    duration: 281,
    communityId: "4d00e939-7fdc-4195-bf34-2f1cbf4e84af"
  },
  {
    _id: "9dea9f71-8094-4a36-9fe3-e3d721aa46a6",
    name: "Campaña agua potable 2026",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Deleniti aedificium virga distinctio. Bonus adstringo vicinus acsi quos sulum magnam natus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:37.541Z",
    updatedAt: "2026-01-11T21:57:37.541Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "9",
      "14"
    ],
    startDate: "2026-07-25T20:57:22.719Z",
    duration: 255,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "1dea6c95-c78b-4e17-bf51-399fe960ea53",
    name: "Programa agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Certe auctor agnitio delectus coniuratio decumbo crux. Cohors carcer valeo adopto neque somniculosus certus comparo viriliter.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:37.605Z",
    updatedAt: "2026-01-11T21:57:37.605Z",
    __v: 0,
    type: "cause",
    ods: [
      "17",
      "4",
      "16"
    ],
    startDate: "2026-07-06T20:57:22.780Z",
    duration: 154,
    communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878"
  },
  {
    _id: "05b1ca5b-adcd-4181-b438-2b0f6a5f3515",
    name: "Operación alimentación 2026",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Minus caecus suscipio abscido quaerat modi caelestis.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:37.668Z",
    updatedAt: "2026-01-11T21:57:37.668Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "1"
    ],
    startDate: "2026-07-11T20:57:22.843Z",
    duration: 275,
    communityId: "bb21e942-ebfd-45e7-9ca5-e3da915cb7c9"
  },
  {
    _id: "e2750bbb-5147-4565-b48b-b296e47cd1ae",
    name: "Campaña pobreza 2027",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Sursum apostolus villa verbum cerno quia.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:37.730Z",
    updatedAt: "2026-01-11T21:57:37.730Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "13"
    ],
    startDate: "2026-06-14T20:57:22.905Z",
    duration: 272,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "ae3eb1ec-3e16-4835-a8c9-06df78246056",
    name: "Campaña alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Vero deduco absens acquiro.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:37.794Z",
    updatedAt: "2026-01-11T21:57:37.794Z",
    __v: 0,
    type: "cause",
    ods: [
      "11",
      "15",
      "14"
    ],
    startDate: "2026-05-22T20:57:22.967Z",
    duration: 159,
    communityId: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a"
  },
  {
    _id: "c1da8a58-c13a-43a7-bd97-935656227b98",
    name: "Operación infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Provident necessitatibus peccatus viscus depono deserunt summisse.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:37.856Z",
    updatedAt: "2026-01-11T21:57:37.856Z",
    __v: 0,
    type: "cause",
    ods: [
      "4",
      "9",
      "1"
    ],
    startDate: "2026-04-18T20:57:23.029Z",
    duration: 95,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "040745db-9eaa-448d-b9fa-dbbb34444aa9",
    name: "Iniciativa alimentación 2026",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Tardus synagoga adiuvo solio aptus absconditus laudantium id cohibeo vae.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:57:37.916Z",
    updatedAt: "2026-01-11T21:57:37.916Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "14"
    ],
    startDate: "2026-03-18T21:57:23.092Z",
    duration: 280,
    communityId: "270bcccb-8cff-459d-a243-e33c878cfb6d"
  },
  {
    _id: "88f95c48-a972-47fb-b6c8-e7cc9fa074a6",
    name: "Jornada discapacidad 2027",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Tabernus accedo creo argumentum decor victus ver.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:37.977Z",
    updatedAt: "2026-01-11T21:57:37.977Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-02-18T21:57:23.154Z",
    duration: 275,
    communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878"
  },
  {
    _id: "e3ed3f33-0999-44b8-b232-e423030cbdef",
    name: "Movimiento tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Teres censura ante coadunatio vulgaris patria.",
    status: "approved",
    reason: "",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:57:38.040Z",
    updatedAt: "2026-01-11T21:57:38.040Z",
    __v: 0,
    type: "cause",
    ods: [
      "11"
    ],
    startDate: "2026-04-06T20:57:23.217Z",
    duration: 183,
    communityId: "0db2d9b5-ff38-479a-aaee-2b28f649cb11"
  },
  {
    _id: "013d6f54-f5d0-4694-a443-1f34c871a7e5",
    name: "Red de apoyo alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Delectus conitor civis colo viduo.",
    status: "pending",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:57:23.293Z",
    updatedAt: "2026-01-11T21:57:23.293Z",
    __v: 0,
    type: "cause",
    ods: [
      "14"
    ],
    startDate: "2026-03-08T21:57:23.278Z",
    duration: 98,
    communityId: "28429ef1-d52f-4e4f-9df3-efa33e8fc351"
  },
  {
    _id: "be834cc1-361c-45ef-bd96-4753166da60d",
    name: "Red de apoyo derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Earum truculenter conventus argentum viduo. Alveus video celebrer adulatio supplanto.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:38.165Z",
    updatedAt: "2026-01-11T21:57:38.165Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "4"
    ],
    startDate: "2026-05-22T20:57:23.341Z",
    duration: 291,
    communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0"
  },
  {
    _id: "f8b59a9a-bacf-4909-ad22-aa5a69507c93",
    name: "Programa derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Ambulo curia aperte ago.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:38.227Z",
    updatedAt: "2026-01-11T21:57:38.227Z",
    __v: 0,
    type: "cause",
    ods: [
      "9",
      "6"
    ],
    startDate: "2026-06-30T20:57:23.404Z",
    duration: 122,
    communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878"
  },
  {
    _id: "75df7309-beae-4ce2-aeb7-d32e7b155998",
    name: "Red de apoyo pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Denique civitas vapulus sonitus tui arbustum synagoga. Cubo voveo confugo ubi.",
    status: "approved",
    reason: "",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:57:38.289Z",
    updatedAt: "2026-01-11T21:57:38.289Z",
    __v: 0,
    type: "cause",
    ods: [
      "6",
      "9"
    ],
    startDate: "2026-05-21T20:57:23.467Z",
    duration: 31,
    communityId: "28429ef1-d52f-4e4f-9df3-efa33e8fc351"
  },
  {
    _id: "8cd4efe2-d7d7-4068-b308-235ceb1a7798",
    name: "Iniciativa medio ambiente 2026",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Angustus laboriosam depopulo sophismata considero acerbitas denique viridis expedita. Autus ocer vir dolorem brevis.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:57:38.353Z",
    updatedAt: "2026-01-11T21:57:38.353Z",
    __v: 0,
    type: "cause",
    ods: [
      "17",
      "2",
      "7"
    ],
    startDate: "2026-04-18T20:57:23.530Z",
    duration: 139,
    communityId: "645a3d2c-9c30-4138-bb08-561b55173d6e"
  },
  {
    _id: "e2e8c24d-1985-460e-86d0-07a94b21ef3e",
    name: "Operación educación 2026",
    description: "Causa benéfica para apoyar iniciativas de educación. Omnis comptus infit spiculum utrimque cur centum est cito pecco.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:38.414Z",
    updatedAt: "2026-01-11T21:57:38.414Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "13"
    ],
    startDate: "2026-06-09T20:57:23.593Z",
    duration: 204,
    communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48"
  },
  {
    _id: "42927a39-5226-416d-8cbf-143950cfbafd",
    name: "Proyecto derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Tamen expedita venia cubo aeneus capillus textilis. Compello libero facere perspiciatis nobis addo aptus porro vilis terra.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:38.477Z",
    updatedAt: "2026-01-11T21:57:38.477Z",
    __v: 0,
    type: "cause",
    ods: [
      "17",
      "11"
    ],
    startDate: "2026-07-22T20:57:23.655Z",
    duration: 354,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "7084e785-fe61-4952-b85f-dbf216af476b",
    name: "Red de apoyo medio ambiente 2026",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Similique via confugo soleo ipsa appono soleo video desolo abscido. Commemoro cunae tantillus alo tenus voluptatibus ullus.",
    status: "pending",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:23.732Z",
    updatedAt: "2026-01-11T21:57:23.732Z",
    __v: 0,
    type: "cause",
    ods: [
      "16"
    ],
    startDate: "2026-05-24T20:57:23.716Z",
    duration: 203,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "cf3fd465-4b92-4541-9d25-6fd2e14910de",
    name: "Movimiento tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Appello callide denuo cenaculum vero infit. Statim thesaurus aggero vere distinctio utroque aqua amissio vulariter.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:38.601Z",
    updatedAt: "2026-01-11T21:57:38.601Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "11"
    ],
    startDate: "2026-04-21T20:57:23.778Z",
    duration: 67,
    communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0"
  },
  {
    _id: "17966f2e-bf54-47f1-b860-a8aebd129c34",
    name: "Movimiento derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Rem canis acquiro audeo coepi ustulo.",
    status: "approved",
    reason: "",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:57:38.666Z",
    updatedAt: "2026-01-11T21:57:38.666Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-07-12T20:57:23.839Z",
    duration: 327,
    communityId: "00b75a73-f239-4162-9c90-55c4bedeb9df"
  },
  {
    _id: "c1eddc8c-2252-415e-a7cf-c78bca867a29",
    name: "Red de apoyo infancia 2026",
    description: "Causa benéfica para apoyar iniciativas de infancia. Repellat deorsum creber argumentum damnatio auxilium cauda curtus totus summa. Patior voluptatem thesis quae subseco.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:57:38.727Z",
    updatedAt: "2026-01-11T21:57:38.727Z",
    __v: 0,
    type: "cause",
    ods: [
      "14"
    ],
    startDate: "2026-02-15T21:57:23.901Z",
    duration: 71,
    communityId: "645a3d2c-9c30-4138-bb08-561b55173d6e"
  },
  {
    _id: "6632c65a-7e07-4590-ae1f-f2c92af19be4",
    name: "Movimiento desarrollo sostenible 2026",
    description: "Causa benéfica para apoyar iniciativas de desarrollo sostenible. Curvo curto dedico antepono asperiores agnitio voluptatibus adimpleo voluptatum spectaculum. Antea solus venustas tubineus.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:38.787Z",
    updatedAt: "2026-01-11T21:57:38.787Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "13"
    ],
    startDate: "2026-07-18T20:57:23.964Z",
    duration: 263,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "5fe69a07-8fd4-41c5-82b3-581f2a2198d8",
    name: "Acción solidaria medio ambiente 2026",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Tardus bene atque armarium cohors laudantium thymbra tollo. Consequuntur vix brevis nisi adhuc defetiscor solitudo.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:57:38.848Z",
    updatedAt: "2026-01-11T21:57:38.848Z",
    __v: 0,
    type: "cause",
    ods: [
      "11",
      "9"
    ],
    startDate: "2026-06-20T20:57:24.028Z",
    duration: 246,
    communityId: "270bcccb-8cff-459d-a243-e33c878cfb6d"
  },
  {
    _id: "e00c1a10-c59e-4640-9261-245bbbb55a95",
    name: "Red de apoyo refugiados 2026",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Caecus blanditiis adipisci vero altus.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:38.912Z",
    updatedAt: "2026-01-11T21:57:38.912Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "15"
    ],
    startDate: "2026-02-12T21:57:24.089Z",
    duration: 70,
    communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878"
  },
  {
    _id: "46a08711-cef4-4ede-acf4-606a5442b200",
    name: "Movimiento alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Vinculum armarium tergiversatio conicio dolorum vulnero.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:38.973Z",
    updatedAt: "2026-01-11T21:57:38.973Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "5"
    ],
    startDate: "2026-02-19T21:57:24.153Z",
    duration: 295,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "c82880c0-d9b4-49f6-929b-730fd0fc8ee5",
    name: "Acción solidaria vivienda 2027",
    description: "Causa benéfica para apoyar iniciativas de vivienda. Repellendus vaco verumtamen id decumbo defero uxor admoneo confero voluptatum.",
    status: "pending",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:57:24.229Z",
    updatedAt: "2026-01-11T21:57:24.229Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-05-06T20:57:24.215Z",
    duration: 39,
    communityId: "9b7dfa76-8966-4e21-8bd3-26415933f7ee"
  },
  {
    _id: "659b1085-aa3f-4dfa-9f2e-c829c0c503f0",
    name: "Red de apoyo alimentación 2026",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Acerbitas officiis chirographum sonitus. Ea carcer tabula.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:39.099Z",
    updatedAt: "2026-01-11T21:57:39.099Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "3",
      "13"
    ],
    startDate: "2026-04-25T20:57:24.277Z",
    duration: 199,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "9f79eb86-7933-4d2a-8f05-90026f5c7c3c",
    name: "Proyecto agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Conventus amiculum natus dicta deripio.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:39.164Z",
    updatedAt: "2026-01-11T21:57:39.164Z",
    __v: 0,
    type: "cause",
    ods: [
      "14",
      "16"
    ],
    startDate: "2026-07-20T20:57:24.339Z",
    duration: 332,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "a0feb2ed-79c3-4126-b672-520f20b133ec",
    name: "Campaña agua potable 2026",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Qui quisquam caelestis villa. Ultra valeo supellex depulso ventosus adflicto.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:39.225Z",
    updatedAt: "2026-01-11T21:57:39.225Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "11",
      "7"
    ],
    startDate: "2026-06-24T20:57:24.402Z",
    duration: 358,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "70b47bee-154f-44b1-990f-49edd0deea59",
    name: "Movimiento pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Arceo uberrime vinum brevis tergeo voluptatum ventito volubilis bellicus cognatus. Arbustum tepidus vox defessus decor territo.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:39.288Z",
    updatedAt: "2026-01-11T21:57:39.288Z",
    __v: 0,
    type: "cause",
    ods: [
      "14",
      "11",
      "12"
    ],
    startDate: "2026-06-29T20:57:24.463Z",
    duration: 268,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "017d3208-aa1c-4e89-834c-0de8cdb77ebc",
    name: "Operación refugiados 2026",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Trans cavus dolorem votum derideo. Solutio vinculum deficio cumque vulgus umerus cruentus inventore.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:39.350Z",
    updatedAt: "2026-01-11T21:57:39.350Z",
    __v: 0,
    type: "cause",
    ods: [
      "11",
      "16",
      "17"
    ],
    startDate: "2026-03-04T21:57:24.524Z",
    duration: 193,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "f56df5d9-20b4-4e66-99dc-54418546e559",
    name: "Movimiento medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Adimpleo ustulo volo textus arto.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:39.412Z",
    updatedAt: "2026-01-11T21:57:39.412Z",
    __v: 0,
    type: "cause",
    ods: [
      "14",
      "17"
    ],
    startDate: "2026-07-30T20:57:24.586Z",
    duration: 164,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "c27cccf1-a8d4-425a-b1d2-59f06d09f3cd",
    name: "Acción solidaria emergencias 2027",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Facere nesciunt coerceo aranea cribro patruus. Angustus commemoro uredo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:39.475Z",
    updatedAt: "2026-01-11T21:57:39.475Z",
    __v: 0,
    type: "cause",
    ods: [
      "4"
    ],
    startDate: "2026-06-23T20:57:24.647Z",
    duration: 185,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "e1ebfa68-c818-4096-a50a-65dda6e7c05a",
    name: "Programa refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Circumvenio terga texo usque aspernatur.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:39.538Z",
    updatedAt: "2026-01-11T21:57:39.538Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "17",
      "5"
    ],
    startDate: "2026-02-19T21:57:24.708Z",
    duration: 303,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "6d80ccfe-4d0d-4657-a00f-9ae3c6ef5e61",
    name: "Red de apoyo medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Terebro vis ab curtus.",
    status: "pending",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:24.786Z",
    updatedAt: "2026-01-11T21:57:24.786Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "17",
      "12"
    ],
    startDate: "2026-02-27T21:57:24.770Z",
    duration: 306,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "e2f98a82-7137-496a-a53c-b92f016142d0",
    name: "Operación desarrollo sostenible 2027",
    description: "Causa benéfica para apoyar iniciativas de desarrollo sostenible. Dolores dolor amor tenus unus. Thorax illum exercitationem cedo consequatur vito defendo deorsum utrum cohaero.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:39.664Z",
    updatedAt: "2026-01-11T21:57:39.664Z",
    __v: 0,
    type: "cause",
    ods: [
      "5",
      "7",
      "12"
    ],
    startDate: "2026-06-26T20:57:24.832Z",
    duration: 293,
    communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48"
  },
  {
    _id: "8f5709f4-749d-4379-af54-68f1d648035e",
    name: "Proyecto infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Perspiciatis veritatis causa vilis delibero blanditiis admiratio utpote.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:39.727Z",
    updatedAt: "2026-01-11T21:57:39.727Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-03-03T21:57:24.893Z",
    duration: 364,
    communityId: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a"
  },
  {
    _id: "b936ac6d-412f-4721-89eb-e0df728e483d",
    name: "Movimiento desarrollo sostenible 2026",
    description: "Causa benéfica para apoyar iniciativas de desarrollo sostenible. Vae alo sapiente tersus tolero cultura vero.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:39.790Z",
    updatedAt: "2026-01-11T21:57:39.790Z",
    __v: 0,
    type: "cause",
    ods: [
      "16"
    ],
    startDate: "2026-06-04T20:57:24.957Z",
    duration: 353,
    communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48"
  },
  {
    _id: "80cef382-61dc-4fc6-ae14-b41260b73a68",
    name: "Red de apoyo salud 2027",
    description: "Causa benéfica para apoyar iniciativas de salud. Ara benigne tepidus adduco adeo error suppono aestus aduro arcesso.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:57:39.850Z",
    updatedAt: "2026-01-11T21:57:39.850Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "12",
      "9"
    ],
    startDate: "2026-06-05T20:57:25.019Z",
    duration: 294,
    communityId: "270bcccb-8cff-459d-a243-e33c878cfb6d"
  },
  {
    _id: "b0d2f424-441c-46f6-a8a3-67169233fe37",
    name: "Jornada discapacidad 2027",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Uredo coerceo dedecor asperiores vilitas placeat pectus talio. Dedecor curatio textor venio abstergo consectetur.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:39.914Z",
    updatedAt: "2026-01-11T21:57:39.914Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "4"
    ],
    startDate: "2026-06-02T20:57:25.081Z",
    duration: 282,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "ca340f10-079e-4817-af37-8e55bc205ae8",
    name: "Acción solidaria emergencias 2027",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Degusto delinquo sufficio balbus territo. Titulus commemoro aspernatur accusamus soleo aureus repellendus paens celebrer amitto.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:39.977Z",
    updatedAt: "2026-01-11T21:57:39.977Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "5",
      "6"
    ],
    startDate: "2026-03-08T21:57:25.143Z",
    duration: 153,
    communityId: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a"
  },
  {
    _id: "3c371a32-f967-4075-bbc5-4e7133b345ea",
    name: "Red de apoyo infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Tego quisquam calamitas aperte accendo eligendi crapula vinitor vulgo speculum.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:40.039Z",
    updatedAt: "2026-01-11T21:57:40.039Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "5"
    ],
    startDate: "2026-07-20T20:57:25.205Z",
    duration: 272,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "004b0ca6-17d2-4bbe-a068-1fdee288a0f4",
    name: "Programa emergencias 2027",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Delicate defleo vaco sulum tot turpis terebro arma. Crepusculum subiungo sordeo carus capitulus tum vulgo.",
    status: "pending",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:57:25.282Z",
    updatedAt: "2026-01-11T21:57:25.282Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "9"
    ],
    startDate: "2026-04-08T20:57:25.268Z",
    duration: 287,
    communityId: "58c55259-195b-4e2b-b2f1-00f30b02197a"
  },
  {
    _id: "c96f87e1-26c3-4925-94f8-538145cbc249",
    name: "Movimiento medio ambiente 2026",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Corroboro argentum uxor tollo tabgo.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:40.164Z",
    updatedAt: "2026-01-11T21:57:40.164Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "2",
      "8"
    ],
    startDate: "2026-07-31T20:57:25.331Z",
    duration: 270,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "bd005edc-d71b-4b19-82cf-0f4574a8c85a",
    name: "Jornada infancia 2026",
    description: "Causa benéfica para apoyar iniciativas de infancia. Somniculosus suffoco damno porro consequatur amet spoliatio umquam ait aspicio. Acquiro vir comptus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:57:40.226Z",
    updatedAt: "2026-01-11T21:57:40.226Z",
    __v: 0,
    type: "cause",
    ods: [
      "6",
      "2"
    ],
    startDate: "2026-07-28T20:57:25.392Z",
    duration: 196,
    communityId: "389e77f6-a369-4240-babb-e3e20a8624c3"
  },
  {
    _id: "35fce5d7-da0b-43fa-8bb7-a2786eb71046",
    name: "Programa pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Approbo contra desino nulla cultellus corrigo. Versus cultura alo.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:40.289Z",
    updatedAt: "2026-01-11T21:57:40.289Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "17",
      "13"
    ],
    startDate: "2026-04-10T20:57:25.454Z",
    duration: 313,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "77fd8a77-5054-4e8f-8e2d-2e17665992ee",
    name: "Red de apoyo educación 2027",
    description: "Causa benéfica para apoyar iniciativas de educación. Fugiat vitiosus non despecto quis charisma sunt argumentum summisse arbitro.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:40.353Z",
    updatedAt: "2026-01-11T21:57:40.353Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "10",
      "5"
    ],
    startDate: "2026-03-27T21:57:25.515Z",
    duration: 38,
    communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793"
  },
  {
    _id: "7c63eb8c-46c0-4f8d-91fe-c98ec4d15455",
    name: "Programa refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Adnuo soleo depulso nulla at patria tollo averto comburo.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:57:40.415Z",
    updatedAt: "2026-01-11T21:57:40.415Z",
    __v: 0,
    type: "cause",
    ods: [
      "4",
      "13"
    ],
    startDate: "2026-08-06T20:57:25.577Z",
    duration: 56,
    communityId: "9b7dfa76-8966-4e21-8bd3-26415933f7ee"
  },
  {
    _id: "1f892f51-33ae-48d4-880c-4f56b7dc763c",
    name: "Proyecto emergencias 2027",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Sopor curatio civitas stabilis. Demum omnis ambulo spiculum valde annus cito.",
    status: "approved",
    reason: "",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:57:40.476Z",
    updatedAt: "2026-01-11T21:57:40.476Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-03-23T21:57:25.639Z",
    duration: 152,
    communityId: "6cd3e7f7-c1b3-47a0-948c-83060ca95b11"
  },
  {
    _id: "b67bac49-a5b9-4ec7-b37d-9eab4e638109",
    name: "Movimiento refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Adversus vomito argumentum iste tunc suppono exercitationem.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:40.540Z",
    updatedAt: "2026-01-11T21:57:40.540Z",
    __v: 0,
    type: "cause",
    ods: [
      "3"
    ],
    startDate: "2026-05-07T20:57:25.702Z",
    duration: 328,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "3c6b3e84-66a9-46f9-a89d-611e6f80e91c",
    name: "Iniciativa medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Autem suppellex textus quidem.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:40.601Z",
    updatedAt: "2026-01-11T21:57:40.601Z",
    __v: 0,
    type: "cause",
    ods: [
      "6"
    ],
    startDate: "2026-08-05T20:57:25.762Z",
    duration: 32,
    communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb"
  },
  {
    _id: "832b5160-c556-420e-8e7c-b64e4a0bf937",
    name: "Operación discapacidad 2026",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Pecco triduana comis somnus audentia super spiculum deripio demonstro. Admoneo tabesco angelus.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:57:40.665Z",
    updatedAt: "2026-01-11T21:57:40.665Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "16",
      "11"
    ],
    startDate: "2026-07-09T20:57:25.824Z",
    duration: 176,
    communityId: "9b7dfa76-8966-4e21-8bd3-26415933f7ee"
  },
  {
    _id: "5bdbb0ca-449c-4afa-ae09-34b91ce3b50d",
    name: "Movimiento vivienda 2027",
    description: "Causa benéfica para apoyar iniciativas de vivienda. Despecto calcar debitis ciminatio.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:40.727Z",
    updatedAt: "2026-01-11T21:57:40.727Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "6",
      "9"
    ],
    startDate: "2026-03-07T21:57:25.887Z",
    duration: 168,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "6a722c83-8517-4996-aa0a-0c82d390355b",
    name: "Proyecto pobreza 2027",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Quis ipsa alioqui arto. Dolorum articulus terga civitas tum debilito defungo sollicito omnis.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:57:40.787Z",
    updatedAt: "2026-01-11T21:57:40.787Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "14",
      "9"
    ],
    startDate: "2026-03-13T21:57:25.948Z",
    duration: 169,
    communityId: "4d00e939-7fdc-4195-bf34-2f1cbf4e84af"
  },
  {
    _id: "7a184747-ac2c-4244-912b-7e39c1d79d78",
    name: "Programa tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Adhuc cuius facilis una cursim repudiandae tandem. Vulticulus sublime venia facilis varius ventosus spiculum adversus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:40.850Z",
    updatedAt: "2026-01-11T21:57:40.850Z",
    __v: 0,
    type: "cause",
    ods: [
      "12",
      "8"
    ],
    startDate: "2026-08-04T20:57:26.010Z",
    duration: 239,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "a79c10e3-302c-48ef-9aa8-11d8be212421",
    name: "Iniciativa agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Capio uberrime vulgo cognatus vinitor dicta talio despecto eum. Teres volaticus tepidus similique civitas vetus curvo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:57:40.913Z",
    updatedAt: "2026-01-11T21:57:40.913Z",
    __v: 0,
    type: "cause",
    ods: [
      "5",
      "2",
      "8"
    ],
    startDate: "2026-06-07T20:57:26.071Z",
    duration: 359,
    communityId: "4d00e939-7fdc-4195-bf34-2f1cbf4e84af"
  },
  {
    _id: "a1f4eb96-e668-47e4-97b3-f8e63f188314",
    name: "Jornada medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Voluptates urbanus necessitatibus vomer. Strenuus urbanus error cum.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:40.976Z",
    updatedAt: "2026-01-11T21:57:40.976Z",
    __v: 0,
    type: "cause",
    ods: [
      "15"
    ],
    startDate: "2026-05-20T20:57:26.134Z",
    duration: 77,
    communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb"
  },
  {
    _id: "0fef9872-e641-4cd4-a423-9527531f7480",
    name: "Proyecto discapacidad 2026",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Laudantium casus thalassinus laudantium careo audacia architecto alo verumtamen.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:41.037Z",
    updatedAt: "2026-01-11T21:57:41.037Z",
    __v: 0,
    type: "cause",
    ods: [
      "11"
    ],
    startDate: "2026-02-17T21:57:26.197Z",
    duration: 143,
    communityId: "2f40cde8-4789-4616-843c-b98967b76ed1"
  },
  {
    _id: "39b05582-ad63-4358-a2bc-41a0ef673d45",
    name: "Programa medio ambiente 2027",
    description: "Causa benéfica para apoyar iniciativas de medio ambiente. Celo aspernatur vitium voluptatibus. Benigne velociter tergo agnosco currus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:57:41.098Z",
    updatedAt: "2026-01-11T21:57:41.098Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "6"
    ],
    startDate: "2026-06-10T20:57:26.259Z",
    duration: 341,
    communityId: "4d00e939-7fdc-4195-bf34-2f1cbf4e84af"
  },
  {
    _id: "46a9615f-da73-4c22-b03a-0feb2d43a378",
    name: "Red de apoyo discapacidad 2027",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Vitae crastinus coaegresco apostolus advoco coaegresco argentum thymbra. Enim dedecor laborum sufficio sum.",
    status: "approved",
    reason: "",
    userId: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    createdAt: "2026-01-11T21:57:41.162Z",
    updatedAt: "2026-01-11T21:57:41.162Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "17"
    ],
    startDate: "2026-02-18T21:57:26.320Z",
    duration: 209,
    communityId: "7ea16f99-d785-4624-b156-f181f3961a76"
  },
  {
    _id: "5667686a-872d-4b48-a1a4-71f9d9ddf3c9",
    name: "Jornada infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Atqui cumque administratio decens consequatur urbanus umerus degusto crapula. Tollo supplanto canis damno suadeo claro tabella vesica.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:41.223Z",
    updatedAt: "2026-01-11T21:57:41.223Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "7",
      "13"
    ],
    startDate: "2026-05-29T20:57:26.382Z",
    duration: 193,
    communityId: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a"
  },
  {
    _id: "8deed214-243c-4123-9873-c26bcc8809d8",
    name: "Movimiento pobreza 2027",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Ab careo audax ducimus cohaero timidus animus iste consuasor. Caste amo argentum vulgus arbustum peior dedico victus.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:41.287Z",
    updatedAt: "2026-01-11T21:57:41.287Z",
    __v: 0,
    type: "cause",
    ods: [
      "1"
    ],
    startDate: "2026-06-09T20:57:26.445Z",
    duration: 192,
    communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48"
  },
  {
    _id: "897c9408-6a84-446b-883a-74635fbeae2b",
    name: "Proyecto igualdad de género 2027",
    description: "Causa benéfica para apoyar iniciativas de igualdad de género. Iure audentia bene. Cupiditate ademptio carcer supplanto ipsam creptio benevolentia consequuntur delego curatio.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:41.349Z",
    updatedAt: "2026-01-11T21:57:41.349Z",
    __v: 0,
    type: "cause",
    ods: [
      "4",
      "16"
    ],
    startDate: "2026-06-08T20:57:26.508Z",
    duration: 250,
    communityId: "bb21e942-ebfd-45e7-9ca5-e3da915cb7c9"
  },
  {
    _id: "41a0f8da-010e-4843-99fc-3a96bcc1d1d3",
    name: "Movimiento derechos humanos 2026",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Culpo aliquam dolor.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:41.410Z",
    updatedAt: "2026-01-11T21:57:41.410Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "12"
    ],
    startDate: "2026-04-19T20:57:26.570Z",
    duration: 214,
    communityId: "70b00318-33b6-482d-87dd-22c518933f0e"
  },
  {
    _id: "c994f24b-c76c-4338-835c-fe3a1f8642e7",
    name: "Proyecto refugiados 2026",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Conicio demo auctus creo versus paens carcer desolo allatus. Clam solus vere curtus non asper.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:41.475Z",
    updatedAt: "2026-01-11T21:57:41.475Z",
    __v: 0,
    type: "cause",
    ods: [
      "8",
      "11"
    ],
    startDate: "2026-03-02T21:57:26.632Z",
    duration: 173,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "93f56390-5bff-4b37-a990-dbc806f8c39c",
    name: "Campaña tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Claro venio dolore valde laboriosam attollo defero uredo soleo. Desino accendo nemo cura depulso amplexus.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:41.534Z",
    updatedAt: "2026-01-11T21:57:41.534Z",
    __v: 0,
    type: "cause",
    ods: [
      "10",
      "3"
    ],
    startDate: "2026-06-04T20:57:26.694Z",
    duration: 149,
    communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48"
  },
  {
    _id: "c465ff85-a592-4f42-bcfb-6dc83c28db81",
    name: "Iniciativa salud 2026",
    description: "Causa benéfica para apoyar iniciativas de salud. Toties suppono sperno vomer adeptio vae addo nobis. Cogo accusator verbum vesper stips cado deporto cras auctor.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:57:41.597Z",
    updatedAt: "2026-01-11T21:57:41.597Z",
    __v: 0,
    type: "cause",
    ods: [
      "11",
      "2",
      "3"
    ],
    startDate: "2026-05-18T20:57:26.755Z",
    duration: 339,
    communityId: "9b7dfa76-8966-4e21-8bd3-26415933f7ee"
  },
  {
    _id: "533a4788-4be8-43bd-8115-bf8ac9f6f9ae",
    name: "Acción solidaria alimentación 2026",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Vulgo ipsum accedo tristis cohibeo cupiditate adsum.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:41.661Z",
    updatedAt: "2026-01-11T21:57:41.661Z",
    __v: 0,
    type: "cause",
    ods: [
      "1"
    ],
    startDate: "2026-04-13T20:57:26.817Z",
    duration: 270,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "679524e3-79ea-4cea-814c-6140d1fa624b",
    name: "Acción solidaria educación 2026",
    description: "Causa benéfica para apoyar iniciativas de educación. Catena sint vinculum. Attonbitus depereo tepesco aperio.",
    status: "approved",
    reason: "",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:57:41.723Z",
    updatedAt: "2026-01-11T21:57:41.723Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "8"
    ],
    startDate: "2026-02-12T21:57:26.878Z",
    duration: 65,
    communityId: "389e77f6-a369-4240-babb-e3e20a8624c3"
  },
  {
    _id: "b39d6801-1499-467d-8bbf-490eb3f89ada",
    name: "Campaña derechos humanos 2026",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Cervus timidus tempus civis molestias. Conforto distinctio decipio tabgo conforto eos volutabrum talus comedo.",
    status: "pending",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:57:26.955Z",
    updatedAt: "2026-01-11T21:57:26.955Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "11"
    ],
    startDate: "2026-04-25T20:57:26.941Z",
    duration: 317,
    communityId: "58c55259-195b-4e2b-b2f1-00f30b02197a"
  },
  {
    _id: "4a24930f-3e81-4f66-b419-e5f4225c707f",
    name: "Programa alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Spes pel decet vulpes votum. Viriliter corporis accusator summisse.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:57:41.850Z",
    updatedAt: "2026-01-11T21:57:41.850Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-02-16T21:57:27.003Z",
    duration: 86,
    communityId: "389e77f6-a369-4240-babb-e3e20a8624c3"
  },
  {
    _id: "148b5118-7485-4385-af3d-5fa1c82abe19",
    name: "Programa desarrollo sostenible 2027",
    description: "Causa benéfica para apoyar iniciativas de desarrollo sostenible. Aliquam sulum vinum tracto blanditiis appono undique callide iure.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:41.913Z",
    updatedAt: "2026-01-11T21:57:41.913Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "17"
    ],
    startDate: "2026-06-05T20:57:27.065Z",
    duration: 130,
    communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff"
  },
  {
    _id: "e6d8fba9-5d70-45f3-9373-1a8777048283",
    name: "Red de apoyo emergencias 2026",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Arma angulus vinco decumbo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:57:41.974Z",
    updatedAt: "2026-01-11T21:57:41.974Z",
    __v: 0,
    type: "cause",
    ods: [
      "2"
    ],
    startDate: "2026-07-22T20:57:27.127Z",
    duration: 69,
    communityId: "49c42598-bfaf-43df-8ebe-17518570bae9"
  },
  {
    _id: "76869ea9-14bc-446d-84d6-03cf9cb4cf2f",
    name: "Operación agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Ambulo acceptus sui carcer.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:42.035Z",
    updatedAt: "2026-01-11T21:57:42.035Z",
    __v: 0,
    type: "cause",
    ods: [
      "4",
      "13",
      "10"
    ],
    startDate: "2026-04-06T20:57:27.189Z",
    duration: 203,
    communityId: "ced550b3-15ec-44de-bb86-51117ddbe581"
  },
  {
    _id: "46576523-a36d-433a-9dce-e08dda7db15c",
    name: "Iniciativa tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Ocer suasoria deripio accendo aperiam voluptatum sperno autus.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:42.098Z",
    updatedAt: "2026-01-11T21:57:42.098Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "6"
    ],
    startDate: "2026-03-21T21:57:27.250Z",
    duration: 305,
    communityId: "ced550b3-15ec-44de-bb86-51117ddbe581"
  },
  {
    _id: "27164304-9536-4505-afc2-28f636aee474",
    name: "Proyecto derechos humanos 2026",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Apparatus adhuc bos appositus. Asporto titulus viduo demoror campana accusantium voro accusator vitae adeo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:42.161Z",
    updatedAt: "2026-01-11T21:57:42.161Z",
    __v: 0,
    type: "cause",
    ods: [
      "11"
    ],
    startDate: "2026-07-30T20:57:27.312Z",
    duration: 182,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "1e2cf277-13a3-4ffa-85dc-f89220a23f97",
    name: "Operación pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Qui depereo est abeo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:42.223Z",
    updatedAt: "2026-01-11T21:57:42.223Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "16"
    ],
    startDate: "2026-06-30T20:57:27.374Z",
    duration: 354,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "0131fa6c-8a92-4ede-93f8-c863c624bcae",
    name: "Proyecto emergencias 2027",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Veniam vitae carmen thesaurus aperte callide casus vinum suus viridis. Cometes xiphias corrigo valens curo unde volutabrum.",
    status: "approved",
    reason: "",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:57:42.285Z",
    updatedAt: "2026-01-11T21:57:42.285Z",
    __v: 0,
    type: "cause",
    ods: [
      "16",
      "17"
    ],
    startDate: "2026-03-07T21:57:27.436Z",
    duration: 44,
    communityId: "389e77f6-a369-4240-babb-e3e20a8624c3"
  },
  {
    _id: "f660aefe-680f-47bb-9832-f6c2bd5408a3",
    name: "Acción solidaria emergencias 2027",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Audacia fugiat soleo pecto adfectus ulciscor coma suppono tripudio.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:42.347Z",
    updatedAt: "2026-01-11T21:57:42.347Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "11"
    ],
    startDate: "2026-04-07T20:57:27.499Z",
    duration: 50,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "c7321708-8819-4381-8b2c-cbc5e052aeb7",
    name: "Iniciativa refugiados 2026",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Ab reiciendis incidunt.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:42.409Z",
    updatedAt: "2026-01-11T21:57:42.409Z",
    __v: 0,
    type: "cause",
    ods: [
      "17"
    ],
    startDate: "2026-07-25T20:57:27.561Z",
    duration: 95,
    communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb"
  },
  {
    _id: "c5e82832-9fc8-43bc-9f9e-4ae52e16124b",
    name: "Proyecto emergencias 2026",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Cubicularis dolorum vespillo candidus tondeo delicate cicuta absconditus.",
    status: "pending",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:27.637Z",
    updatedAt: "2026-01-11T21:57:27.637Z",
    __v: 0,
    type: "cause",
    ods: [
      "7",
      "11"
    ],
    startDate: "2026-02-12T21:57:27.624Z",
    duration: 281,
    communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878"
  },
  {
    _id: "2e38834b-dd6f-4170-afce-c57d59212223",
    name: "Jornada emergencias 2026",
    description: "Causa benéfica para apoyar iniciativas de emergencias. Auctus defungo volubilis rerum curtus deprimo traho libero ustilo cura. Veritas derideo demergo.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:57:42.533Z",
    updatedAt: "2026-01-11T21:57:42.533Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "14"
    ],
    startDate: "2026-03-07T21:57:27.686Z",
    duration: 253,
    communityId: "645a3d2c-9c30-4138-bb08-561b55173d6e"
  },
  {
    _id: "075b7337-53dc-46d4-a1cd-307ab07469ab",
    name: "Operación alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Tracto voluntarius sol ars constans cetera.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:42.595Z",
    updatedAt: "2026-01-11T21:57:42.595Z",
    __v: 0,
    type: "cause",
    ods: [
      "7"
    ],
    startDate: "2026-06-09T20:57:27.749Z",
    duration: 82,
    communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878"
  },
  {
    _id: "dd8c27f8-923a-40e8-8232-1fae09997075",
    name: "Campaña vivienda 2027",
    description: "Causa benéfica para apoyar iniciativas de vivienda. Tametsi architecto iure doloribus vespillo demulceo tenetur tutis. Argentum demergo bestia autus coniuratio crustulum adulatio condico claro cras.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:42.657Z",
    updatedAt: "2026-01-11T21:57:42.657Z",
    __v: 0,
    type: "cause",
    ods: [
      "13"
    ],
    startDate: "2026-02-13T21:57:27.813Z",
    duration: 67,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "b8e47d09-fe0b-4d3a-b8e2-07f8c7f10003",
    name: "Jornada alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Coma inventore calculus itaque. Vulariter magni vitiosus.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:42.719Z",
    updatedAt: "2026-01-11T21:57:42.719Z",
    __v: 0,
    type: "cause",
    ods: [
      "15"
    ],
    startDate: "2026-04-30T20:57:27.876Z",
    duration: 340,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "4db56792-f2cf-440a-a7bc-5a3b63584e42",
    name: "Acción solidaria agua potable 2027",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Stillicidium concedo dolore arma tricesimus vero suggero nam vado. Tubineus vix corporis terror cornu condico.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:42.783Z",
    updatedAt: "2026-01-11T21:57:42.783Z",
    __v: 0,
    type: "cause",
    ods: [
      "17",
      "14",
      "7"
    ],
    startDate: "2026-03-18T21:57:27.940Z",
    duration: 220,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "5e9ec5a6-b438-41ec-9986-abcc23f2995f",
    name: "Campaña pobreza 2026",
    description: "Causa benéfica para apoyar iniciativas de pobreza. Somniculosus tardus quis vinum admoveo. Accusator degenero beatae enim.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:42.845Z",
    updatedAt: "2026-01-11T21:57:42.845Z",
    __v: 0,
    type: "cause",
    ods: [
      "2"
    ],
    startDate: "2026-04-14T20:57:28.002Z",
    duration: 359,
    communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1"
  },
  {
    _id: "ba3e6d2d-3559-481f-9751-9c1559140e4f",
    name: "Iniciativa educación 2027",
    description: "Causa benéfica para apoyar iniciativas de educación. Sint tergiversatio demulceo ultra antepono currus. Cupio nobis totidem venustas aetas fuga utrimque sub.",
    status: "pending",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:28.078Z",
    updatedAt: "2026-01-11T21:57:28.078Z",
    __v: 0,
    type: "cause",
    ods: [
      "13",
      "7"
    ],
    startDate: "2026-07-01T20:57:28.065Z",
    duration: 112,
    communityId: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a"
  },
  {
    _id: "34f65879-2f09-40f6-b949-6c13a70700bf",
    name: "Movimiento alimentación 2027",
    description: "Causa benéfica para apoyar iniciativas de alimentación. Truculenter curriculum angelus ultra conitor conduco victoria aurum voluntarius conspergo.",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:57:42.971Z",
    updatedAt: "2026-01-11T21:57:42.971Z",
    __v: 0,
    type: "cause",
    ods: [
      "11"
    ],
    startDate: "2026-04-27T20:57:28.127Z",
    duration: 90,
    communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0"
  },
  {
    _id: "896ea89a-8bec-47d8-aad5-5686e71bebd6",
    name: "Jornada infancia 2026",
    description: "Causa benéfica para apoyar iniciativas de infancia. Curso vilitas enim bardus caecus deduco defero sponte triduana.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:57:43.035Z",
    updatedAt: "2026-01-11T21:57:43.035Z",
    __v: 0,
    type: "cause",
    ods: [
      "1"
    ],
    startDate: "2026-06-06T20:57:28.189Z",
    duration: 347,
    communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62"
  },
  {
    _id: "4c108c8b-8cc8-4bd8-8ca7-fbe7eb662bdc",
    name: "Proyecto discapacidad 2026",
    description: "Causa benéfica para apoyar iniciativas de discapacidad. Tubineus aegre cohibeo custodia terebro nostrum voco asporto. Spes caelestis cauda curtus celo admoneo patria clibanus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:57:43.097Z",
    updatedAt: "2026-01-11T21:57:43.097Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "1",
      "17"
    ],
    startDate: "2026-06-26T20:57:28.253Z",
    duration: 88,
    communityId: "645a3d2c-9c30-4138-bb08-561b55173d6e"
  },
  {
    _id: "6e85b55a-c65d-4cb3-a6df-94df7de08db6",
    name: "Programa salud 2027",
    description: "Causa benéfica para apoyar iniciativas de salud. Uxor velut nemo sunt.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:57:43.159Z",
    updatedAt: "2026-01-11T21:57:43.159Z",
    __v: 0,
    type: "cause",
    ods: [
      "12"
    ],
    startDate: "2026-06-11T20:57:28.317Z",
    duration: 310,
    communityId: "270bcccb-8cff-459d-a243-e33c878cfb6d"
  },
  {
    _id: "c2219f93-d86a-4911-a994-1d0ce4c6c654",
    name: "Programa tercera edad 2027",
    description: "Causa benéfica para apoyar iniciativas de tercera edad. Suscipit acies communis patrocinor. Tactus aequitas ciminatio claudeo desino.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:43.222Z",
    updatedAt: "2026-01-11T21:57:43.222Z",
    __v: 0,
    type: "cause",
    ods: [
      "4",
      "6",
      "8"
    ],
    startDate: "2026-05-29T20:57:28.380Z",
    duration: 177,
    communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb"
  },
  {
    _id: "8911b3ff-9a54-403b-b4b2-08bbf07d6686",
    name: "Movimiento refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Celer beneficium bis labore derelinquo enim asporto abutor vilis denuncio.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:57:43.283Z",
    updatedAt: "2026-01-11T21:57:43.283Z",
    __v: 0,
    type: "cause",
    ods: [
      "2",
      "16",
      "14"
    ],
    startDate: "2026-03-23T21:57:28.443Z",
    duration: 186,
    communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5"
  },
  {
    _id: "440b056a-172f-4b8f-81f0-8bee879bf277",
    name: "Programa refugiados 2027",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Ocer solitudo accusamus tutis volup. Atrocitas ulciscor cogito alii stella demergo coepi vito doloribus succurro.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:43.346Z",
    updatedAt: "2026-01-11T21:57:43.346Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "4"
    ],
    startDate: "2026-05-06T20:57:28.505Z",
    duration: 236,
    communityId: "df149923-f276-49e3-b828-e3c0e4ec205f"
  },
  {
    _id: "f3048f6e-6be6-456a-b365-b8fe4d25c329",
    name: "Iniciativa refugiados 2026",
    description: "Causa benéfica para apoyar iniciativas de refugiados. Cras repudiandae denego reprehenderit. Arceo consequatur coruscus esse voluptates aliqua caste careo tantum ambulo.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:43.407Z",
    updatedAt: "2026-01-11T21:57:43.407Z",
    __v: 0,
    type: "cause",
    ods: [
      "17"
    ],
    startDate: "2026-02-11T21:57:28.567Z",
    duration: 303,
    communityId: "ced550b3-15ec-44de-bb86-51117ddbe581"
  },
  {
    _id: "1655f209-6028-4d1f-ad9b-85f5cf0d4626",
    name: "Iniciativa derechos humanos 2027",
    description: "Causa benéfica para apoyar iniciativas de derechos humanos. Soluta conor tremo tenax decor cura. Dedecor via curso officia certus deficio.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:43.470Z",
    updatedAt: "2026-01-11T21:57:43.470Z",
    __v: 0,
    type: "cause",
    ods: [
      "1",
      "8",
      "7"
    ],
    startDate: "2026-04-09T20:57:28.629Z",
    duration: 46,
    communityId: "ced550b3-15ec-44de-bb86-51117ddbe581"
  },
  {
    _id: "22ec3d3b-2d97-4294-bf61-a0f9f50313e7",
    name: "Iniciativa infancia 2027",
    description: "Causa benéfica para apoyar iniciativas de infancia. Defleo aetas cognatus vorago despecto ipsa verbera amiculum velit arx. Viridis callide depromo decretum est commodo.",
    status: "pending",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:57:28.706Z",
    updatedAt: "2026-01-11T21:57:28.706Z",
    __v: 0,
    type: "cause",
    ods: [
      "3",
      "1"
    ],
    startDate: "2026-04-30T20:57:28.690Z",
    duration: 326,
    communityId: "28429ef1-d52f-4e4f-9df3-efa33e8fc351"
  },
  {
    _id: "b4d89350-9c25-4c53-82f0-9a2f7d07902e",
    name: "Movimiento agua potable 2026",
    description: "Causa benéfica para apoyar iniciativas de agua potable. Comedo armarium suggero dens doloremque audeo consequuntur.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:57:43.597Z",
    updatedAt: "2026-01-11T21:57:43.597Z",
    __v: 0,
    type: "cause",
    ods: [
      "15",
      "4",
      "16"
    ],
    startDate: "2026-06-18T20:57:28.752Z",
    duration: 95,
    communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0"
  },
  {
    _id: "95810303-d4bc-4bcc-8545-906b2f667b91",
    name: "Jornada igualdad de género 2027",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Calculus cognatus ater audax vitiosus amo virgo.",
    status: "pending",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:45.688Z",
    updatedAt: "2026-01-11T21:57:45.688Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 229,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 688,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - salud",
        description: "Evento presencial para salud. Voluptatum adinventitias tum arceo textor accommodo amplus.",
        initialDate: "2026-02-08T21:57:45.667Z",
        place: {
          direction: "488 W State Street, 166",
          city: "Valparaíso",
          countryCode: "CL"
        }
      },
      {
        name: "Taller formativo - discapacidad",
        description: "Evento presencial para discapacidad. Cura considero demergo viscus audeo utilis pectus creo aliquid volubilis.",
        initialDate: "2026-04-17T20:57:45.667Z",
        place: {
          direction: "8331 Jast Highway, 746",
          city: "Maracaibo",
          countryCode: "VE"
        }
      }
    ],
    causeId: "1655f209-6028-4d1f-ad9b-85f5cf0d4626"
  },
  {
    _id: "e65a730a-66e7-4f26-86b6-f4c4ab81a0da",
    name: "Red de apoyo infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Admitto tepidus depromo vox expedita sollers comes soleo vinco baiulus.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:19.380Z",
    updatedAt: "2026-01-11T21:58:19.380Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 662,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 699,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 345,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - pobreza",
        description: "Evento presencial para pobreza. Verbum victus currus magnam venia chirographum.",
        initialDate: "2026-05-27T20:57:45.982Z",
        place: {
          direction: "39710 Berge Motorway, 94977",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "b936ac6d-412f-4721-89eb-e0df728e483d"
  },
  {
    _id: "9e43826b-0eec-46d0-9e80-3dd47ba7b360",
    name: "Iniciativa desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Quis unde admitto utique adsuesco officia tristis suggero cuppedia virgo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:58:19.441Z",
    updatedAt: "2026-01-11T21:58:19.441Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 257,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 243,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 686,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - discapacidad",
        description: "Evento presencial para discapacidad. Urbs virga curatio color anser aequus clementia sono. Quibusdam defero cenaculum coadunatio vitiosus baiulus turbo desipio aranea canonicus.",
        initialDate: "2026-05-02T20:57:46.059Z",
        place: {
          direction: "405 Eliza Freeway, 72370",
          city: "Murcia",
          countryCode: "ES"
        }
      },
      {
        name: "Evento benéfico - agua potable",
        description: "Evento presencial para agua potable. Volo vero cultellus votum enim deleo.",
        initialDate: "2026-01-20T21:57:46.059Z",
        place: {
          direction: "210 W Pine Street, 9584",
          city: "Ciudad de México",
          countryCode: "MX"
        }
      }
    ],
    causeId: "587b8a43-7335-43c8-a844-a1160002bdc9"
  },
  {
    _id: "8c1ab376-f8ad-4b9d-b2ef-7cc18daccd60",
    name: "Programa educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Conventus tergum facere advoco sono cenaculum comprehendo similique astrum.",
    status: "pending",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:57:46.137Z",
    updatedAt: "2026-01-11T21:57:46.137Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 548,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 950,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - derechos humanos",
        description: "Evento presencial para derechos humanos. Ullam votum derelinquo cruentus balbus dapifer nam. Accendo adsidue varius summa iusto terga bellum debitis.",
        initialDate: "2026-05-06T20:57:46.121Z",
        place: {
          direction: "59358 Gislason Brooks, 2831",
          city: "La Plata",
          countryCode: "AR"
        }
      },
      {
        name: "Reunión de coordinación - pobreza",
        description: "Evento presencial para pobreza. Odio paens thesaurus sodalitas occaecati subseco beatae. Acer ad torqueo vir cetera aetas alienus.",
        initialDate: "2026-06-23T20:57:46.122Z",
        place: {
          direction: "208 Broadway Avenue, 97315",
          city: "Stuttgart",
          countryCode: "DE"
        }
      }
    ],
    causeId: "8ed57a88-b492-4364-ab6f-cd7cf9b588c6"
  },
  {
    _id: "08771fa5-7b3d-4e14-892b-3689fdefded0",
    name: "Operación igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Calcar succedo provident dicta vociferor aqua enim cinis.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:19.566Z",
    updatedAt: "2026-01-11T21:58:19.566Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 57,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 697,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - derechos humanos",
        description: "Evento presencial para derechos humanos. Tenus venia confero.",
        initialDate: "2026-03-24T21:57:46.184Z",
        place: {
          direction: "2097 Bergstrom Passage, 92463",
          city: "Bucaramanga",
          countryCode: "CO"
        }
      }
    ],
    causeId: "a08e4b0e-a54d-400d-b652-5d7691a32257"
  },
  {
    _id: "c52ecce2-9324-483c-9ac7-c0efde828a86",
    name: "Programa emergencias 2027",
    description: "Acción concreta para emergencias con objetivos cuantificables. Ex conservo officiis vacuus vespillo sit magni vallum utrimque.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:19.627Z",
    updatedAt: "2026-01-11T21:58:19.627Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 649,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Abstergo dicta corrupti earum vix.",
        initialDate: "2026-03-01T21:57:46.246Z",
        place: {
          direction: "7802 Loyce Mill, 2668",
          city: "Barranquilla",
          countryCode: "CO"
        }
      },
      {
        name: "Jornada solidaria - discapacidad",
        description: "Evento presencial para discapacidad. Suffoco rerum verto curo convoco textor talus suggero.",
        initialDate: "2026-04-13T20:57:46.246Z",
        place: {
          direction: "6729 Edison Pike, 183",
          city: "Berlin",
          countryCode: "DE"
        }
      }
    ],
    causeId: "832b5160-c556-420e-8e7c-b64e4a0bf937"
  },
  {
    _id: "a29e6225-1a3a-4558-82eb-a1d5b9fafb05",
    name: "Operación discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Admiratio accedo cerno dens decimus corroboro taceo. Tunc doloremque quas assentator nesciunt.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:19.690Z",
    updatedAt: "2026-01-11T21:58:19.690Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 63,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - pobreza",
        description: "Evento presencial para pobreza. Stultus circumvenio degero vos deprecator virgo comminor desino.",
        initialDate: "2026-05-17T20:57:46.308Z",
        place: {
          direction: "4095 Polly Centers, 76723",
          city: "Valparaíso",
          countryCode: "CL"
        }
      },
      {
        name: "Jornada solidaria - salud",
        description: "Evento presencial para salud. Damnatio summisse totidem.",
        initialDate: "2026-05-21T20:57:46.308Z",
        place: {
          direction: "69827 S 6th Street, 853",
          city: "Bogotá",
          countryCode: "CO"
        }
      }
    ],
    causeId: "ca04471c-dece-41cc-979e-8743be3796a8"
  },
  {
    _id: "9e051326-43b8-4ba7-8ade-6f531485d078",
    name: "Acción solidaria tercera edad 2026",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Via caecus aspicio itaque.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:19.751Z",
    updatedAt: "2026-01-11T21:58:19.751Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 304,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - pobreza",
        description: "Evento presencial para pobreza. Ars cilicium confero aestus benigne attero cetera libero causa.",
        initialDate: "2026-05-27T20:57:46.369Z",
        place: {
          direction: "4682 Cremin Prairie, 267",
          city: "La Serena",
          countryCode: "CL"
        }
      }
    ],
    causeId: "017d3208-aa1c-4e89-834c-0de8cdb77ebc"
  },
  {
    _id: "38e97fee-71cb-4e32-9fcf-246c607a5015",
    name: "Jornada alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Urbanus anser umbra cattus damnatio aptus. Peccatus viriliter placeat baiulus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:19.812Z",
    updatedAt: "2026-01-11T21:58:19.812Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 55,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 707,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Molestias nulla thesaurus vapulus ipsum animi custodia surculus.",
        initialDate: "2026-05-29T20:57:46.430Z",
        place: {
          direction: "9358 Richmond Close, 177",
          city: "London",
          countryCode: "GB"
        }
      }
    ],
    causeId: "b8e47d09-fe0b-4d3a-b8e2-07f8c7f10003"
  },
  {
    _id: "a75f3bfd-9473-4138-8dc4-f04c6eae3fa4",
    name: "Jornada tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Cogito vir sollers carbo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:19.876Z",
    updatedAt: "2026-01-11T21:58:19.876Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 977,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 47,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - derechos humanos",
        description: "Evento presencial para derechos humanos. Aranea cribro cilicium conventus tamquam cerno laborum.",
        initialDate: "2026-02-24T21:57:46.492Z",
        place: {
          direction: "529 Johnson Manors, 10399",
          city: "Cusco",
          countryCode: "PE"
        }
      }
    ],
    causeId: "6d0c3bf3-9c2c-4dfb-9e08-dc685e4057b1"
  },
  {
    _id: "1074276d-9287-4a4d-a4f8-94a6882cd435",
    name: "Proyecto educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Molestiae cupressus timor.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:19.938Z",
    updatedAt: "2026-01-11T21:58:19.938Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 11,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 459,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - pobreza",
        description: "Evento presencial para pobreza. At caelum corroboro acidus aegre denuo utroque dolorum rem ago. Assentator sursum acsi.",
        initialDate: "2026-07-07T20:57:46.554Z",
        place: {
          direction: "3499 Jude Crest, 146",
          city: "Barquisimeto",
          countryCode: "VE"
        }
      }
    ],
    causeId: "ca04471c-dece-41cc-979e-8743be3796a8"
  },
  {
    _id: "511f70e8-9114-46d4-b76a-25fefc054da0",
    name: "Movimiento derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Coma communis strenuus cultellus surgo eum. Admiratio aeneus statim ex utor.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:20.063Z",
    updatedAt: "2026-01-11T21:58:20.063Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 592,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - salud",
        description: "Evento presencial para salud. Iusto tendo confido autus subnecto cubo video audio.",
        initialDate: "2026-01-28T21:57:46.679Z",
        place: {
          direction: "3874 E Park Avenue, 4022",
          city: "Murcia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "6e85b55a-c65d-4cb3-a6df-94df7de08db6"
  },
  {
    _id: "f7d2693c-ec16-49b4-bd87-8d2e0bb3e148",
    name: "Operación emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Aliquam certe asporto commodi decor.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:20.125Z",
    updatedAt: "2026-01-11T21:58:20.125Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 556,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 952,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - medio ambiente",
        description: "Evento presencial para medio ambiente. Statim summopere apud velut ciminatio thorax spectaculum subnecto sodalitas. Utor nam excepturi beneficium summa canonicus.",
        initialDate: "2026-03-16T21:57:46.742Z",
        place: {
          direction: "57374 N Lincoln Street, 75981",
          city: "Valencia",
          countryCode: "VE"
        }
      }
    ],
    causeId: "0fef9872-e641-4cd4-a423-9527531f7480"
  },
  {
    _id: "6f47c240-197f-4911-9142-43107fda67be",
    name: "Campaña alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Patruus amicitia magni comes vomer confero bos iure alter numquam.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:20.190Z",
    updatedAt: "2026-01-11T21:58:20.190Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 169,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 16,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - refugiados",
        description: "Evento presencial para refugiados. Torrens arbustum constans sortitus culpa arbustum confido quasi. Tribuo depraedor vallum.",
        initialDate: "2026-06-19T20:57:46.819Z",
        place: {
          direction: "39628 Stephen Radial, 68514",
          city: "Ciudad de México",
          countryCode: "MX"
        }
      }
    ],
    causeId: "c1da8a58-c13a-43a7-bd97-935656227b98"
  },
  {
    _id: "8aaeda35-a331-4213-8e7b-b11ded4af0cb",
    name: "Operación discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Articulus tametsi cunabula dedecor creator vulgus congregatio. Celebrer trepide amitto.",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:58:20.252Z",
    updatedAt: "2026-01-11T21:58:20.252Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 74,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - medio ambiente",
        description: "Evento presencial para medio ambiente. Contra vilicus corpus fugiat tolero accommodo catena antepono. Accusator tribuo audacia absens apud.",
        initialDate: "2026-04-08T20:57:46.880Z",
        place: {
          direction: "185 S Jackson Street, 9558",
          city: "Puebla",
          countryCode: "MX"
        }
      },
      {
        name: "Actividad de voluntariado - discapacidad",
        description: "Evento presencial para discapacidad. Substantia conicio auctor. Usitas vomica corporis cubitum.",
        initialDate: "2026-03-03T21:57:46.880Z",
        place: {
          direction: "729 Jordane Cliff, 63958",
          city: "Manchester",
          countryCode: "GB"
        }
      }
    ],
    causeId: "f989a411-0aa6-4825-984a-32194fcfdf5a"
  },
  {
    _id: "e4fdca7e-56c5-4b38-8ee8-cc386751da2e",
    name: "Acción solidaria infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Assumenda vesica ventus amita. Currus concido illo abundans.",
    status: "approved",
    reason: "",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:58:20.377Z",
    updatedAt: "2026-01-11T21:58:20.377Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 121,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 893,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 755,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - derechos humanos",
        description: "Evento presencial para derechos humanos. Sui vesco delicate conitor verbera derideo.",
        initialDate: "2026-05-15T20:57:47.006Z",
        place: {
          direction: "188 Juvenal Alley, 401",
          city: "Tucumán",
          countryCode: "AR"
        }
      }
    ],
    causeId: "39251fc7-43fd-4368-8970-921ddcbbf104"
  },
  {
    _id: "9a5b7ca8-200d-42b9-81c7-1d7cca85465d",
    name: "Jornada educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Bibo iste cultellus calcar apud veritas tabella verus temperantia antea. Texo terga absum inventore undique clementia adhaero.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:20.438Z",
    updatedAt: "2026-01-11T21:58:20.438Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 370,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 888,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 358,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - pobreza",
        description: "Evento presencial para pobreza. Summisse reprehenderit caries earum.",
        initialDate: "2026-03-27T21:57:47.068Z",
        place: {
          direction: "928 Katrina Cape, 8914",
          city: "Munich",
          countryCode: "DE"
        }
      }
    ],
    causeId: "832b5160-c556-420e-8e7c-b64e4a0bf937"
  },
  {
    _id: "8db93533-4892-4042-a03a-752945bbe0b6",
    name: "Jornada infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Vomer damnatio venia tristis suus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:20.500Z",
    updatedAt: "2026-01-11T21:58:20.500Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 462,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - discapacidad",
        description: "Evento presencial para discapacidad. Vacuus tum cernuus vulnero vomito arguo solitudo quod. Decens illo cresco talus pauci voluptates abeo stultus desparatus.",
        initialDate: "2026-04-14T20:57:47.132Z",
        place: {
          direction: "19665 Crist Trafficway, 7742",
          city: "Nice",
          countryCode: "FR"
        }
      }
    ],
    causeId: "3c6b3e84-66a9-46f9-a89d-611e6f80e91c"
  },
  {
    _id: "b91055f4-d5d6-45d0-8727-c7cb861d6669",
    name: "Acción solidaria pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Error animi stillicidium tantum corpus suus thorax cresco.",
    status: "approved",
    reason: "",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:58:20.563Z",
    updatedAt: "2026-01-11T21:58:20.563Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 917,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 66,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 13,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Sodalitas cura utrimque volubilis caelum subseco textus audeo uberrime. Cernuus capto creptio.",
        initialDate: "2026-03-12T21:57:47.193Z",
        place: {
          direction: "6170 Lolita Lodge, 44949",
          city: "Venezia",
          countryCode: "IT"
        }
      },
      {
        name: "Taller formativo - pobreza",
        description: "Evento presencial para pobreza. Cibus vomito terebro balbus demoror ut. Terreo spargo magnam cenaculum denuo suscipio reiciendis virgo.",
        initialDate: "2026-04-20T20:57:47.194Z",
        place: {
          direction: "38879 Park Place, 64663",
          city: "Caracas",
          countryCode: "VE"
        }
      }
    ],
    causeId: "17966f2e-bf54-47f1-b860-a8aebd129c34"
  },
  {
    _id: "db40e11b-d35f-4880-b655-db3677d231d4",
    name: "Iniciativa medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Amet audio cursim suppellex terror sponte templum timor.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:20.686Z",
    updatedAt: "2026-01-11T21:58:20.686Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 719,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 365,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 221,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Curto tepesco minus. Uter varius vesco torrens arbor audax casus summa claudeo.",
        initialDate: "2026-05-02T20:57:47.319Z",
        place: {
          direction: "311 Ashlynn Views, 204",
          city: "Rosario",
          countryCode: "AR"
        }
      }
    ],
    causeId: "3f1c2650-8608-4f67-9b8c-454addeeb255"
  },
  {
    _id: "d8323fdd-b802-4b07-8886-53134fd8200a",
    name: "Red de apoyo vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Adnuo beatus verecundia ambitus desparatus unus crustulum.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:20.751Z",
    updatedAt: "2026-01-11T21:58:20.751Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 272,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 596,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 377,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - salud",
        description: "Evento presencial para salud. Tum torqueo deripio comitatus civitas surgo coerceo.",
        initialDate: "2026-02-04T21:57:47.382Z",
        place: {
          direction: "56380 Sandringham Road, 75542",
          city: "Tijuana",
          countryCode: "MX"
        }
      },
      {
        name: "Jornada solidaria - derechos humanos",
        description: "Evento presencial para derechos humanos. Laborum at ad terebro.",
        initialDate: "2026-05-31T20:57:47.382Z",
        place: {
          direction: "31955 Selina Walk, 6374",
          city: "Sevilla",
          countryCode: "ES"
        }
      }
    ],
    causeId: "017d3208-aa1c-4e89-834c-0de8cdb77ebc"
  },
  {
    _id: "8ee53e3c-004e-42c4-9773-d1e956ee60ec",
    name: "Movimiento agua potable 2026",
    description: "Acción concreta para agua potable con objetivos cuantificables. Reiciendis accusantium neque cum thesaurus suffoco et abeo vero veniam. Cattus trepide ulterius beatae.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:20.827Z",
    updatedAt: "2026-01-11T21:58:20.827Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 565,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 877,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - igualdad de género",
        description: "Evento presencial para igualdad de género. Aestivus vociferor trucido amicitia. Ad suppellex crinis deporto.",
        initialDate: "2026-04-04T20:57:47.445Z",
        place: {
          direction: "9191 Crist Ports, 3616",
          city: "Cartagena",
          countryCode: "CO"
        }
      },
      {
        name: "Actividad de voluntariado - discapacidad",
        description: "Evento presencial para discapacidad. Tenax utrimque curiositas vester solutio doloribus calculus victoria.",
        initialDate: "2026-07-08T20:57:47.446Z",
        place: {
          direction: "3819 Gordon Street, 298",
          city: "Stuttgart",
          countryCode: "DE"
        }
      }
    ],
    causeId: "832b5160-c556-420e-8e7c-b64e4a0bf937"
  },
  {
    _id: "1c150e1c-d1d4-465a-bf69-0d9361957622",
    name: "Programa salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Sodalitas voluntarius suffragium adfero sufficio aedificium.",
    status: "pending",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:47.523Z",
    updatedAt: "2026-01-11T21:57:47.523Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 368,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - agua potable",
        description: "Evento presencial para agua potable. Tamisium inflammatio crur patruus vergo virtus victoria. Volo umbra demulceo.",
        initialDate: "2026-01-23T21:57:47.508Z",
        place: {
          direction: "8043 Mertz Lock, 95336",
          city: "Toulouse",
          countryCode: "FR"
        }
      },
      {
        name: "Reunión de coordinación - educación",
        description: "Evento presencial para educación. Caelum volutabrum excepturi vulgo varietas. Attero corpus adsidue vestrum cogito.",
        initialDate: "2026-03-14T21:57:47.508Z",
        place: {
          direction: "5354 Court Street, 692",
          city: "Córdoba",
          countryCode: "AR"
        }
      }
    ],
    causeId: "075b7337-53dc-46d4-a1cd-307ab07469ab"
  },
  {
    _id: "0df3dd1b-cb6d-453a-b714-31472facc12e",
    name: "Campaña pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Ustilo ante ratione audeo uterque. Facere taceo accedo speculum trucido.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:58:20.950Z",
    updatedAt: "2026-01-11T21:58:20.950Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 74,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 323,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Centum vado cedo.",
        initialDate: "2026-06-16T20:57:47.571Z",
        place: {
          direction: "820 Center Avenue, 9563",
          city: "Zaragoza",
          countryCode: "ES"
        }
      },
      {
        name: "Reunión de coordinación - derechos humanos",
        description: "Evento presencial para derechos humanos. Amplitudo atqui solum deputo ademptio aperte creptio coniecto cursus.",
        initialDate: "2026-07-08T20:57:47.571Z",
        place: {
          direction: "55925 Reichel Cliff, 28354",
          city: "Munich",
          countryCode: "DE"
        }
      }
    ],
    causeId: "beeeec80-f1ed-4eb7-89cc-2c495b950822"
  },
  {
    _id: "4f841674-d64e-40cc-84b9-325bcfbb339b",
    name: "Operación derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Animadverto cuius vis necessitatibus occaecati ambulo. Suspendo dignissimos tolero calcar odio circumvenio aetas crustulum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:21.076Z",
    updatedAt: "2026-01-11T21:58:21.076Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 142,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 553,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 34,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - discapacidad",
        description: "Evento presencial para discapacidad. Vapulus ipsam aperiam trans.",
        initialDate: "2026-05-21T20:57:47.698Z",
        place: {
          direction: "167 O'Reilly Points, 8396",
          city: "Antofagasta",
          countryCode: "CL"
        }
      },
      {
        name: "Jornada solidaria - discapacidad",
        description: "Evento presencial para discapacidad. Audacia deprimo torrens subito vigor vulariter. Viduo vigor adulescens thalassinus barba conduco vestrum cernuus corrupti.",
        initialDate: "2026-05-24T20:57:47.698Z",
        place: {
          direction: "6538 Iliana Key, 821",
          city: "Marseille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "6d5e9cb7-9023-49ad-ac09-2a13ce8b5f4e"
  },
  {
    _id: "440d524e-6f8b-4f76-a76d-a6a025e63ec6",
    name: "Operación emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Auctor cetera sol.",
    status: "approved",
    reason: "",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:58:21.138Z",
    updatedAt: "2026-01-11T21:58:21.138Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 750,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 235,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - agua potable",
        description: "Evento presencial para agua potable. Convoco stultus officiis.",
        initialDate: "2026-05-20T20:57:47.761Z",
        place: {
          direction: "736 Jerrold Way, 934",
          city: "Puebla",
          countryCode: "MX"
        }
      }
    ],
    causeId: "166f4fd8-8e58-4773-8567-41195e1dfbb3"
  },
  {
    _id: "f8999045-1e83-474b-8784-b9e73827fa13",
    name: "Operación desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Amet vomer aduro spero suadeo.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:21.261Z",
    updatedAt: "2026-01-11T21:58:21.261Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 352,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - infancia",
        description: "Evento presencial para infancia. Cilicium vesco enim spiculum triumphus nesciunt vallum. Vesica iste cunctatio vulgus.",
        initialDate: "2026-03-31T20:57:47.886Z",
        place: {
          direction: "39522 Turner Prairie, 503",
          city: "Marseille",
          countryCode: "FR"
        }
      },
      {
        name: "Evento benéfico - infancia",
        description: "Evento presencial para infancia. Ambulo arcesso amplexus nihil pel alias appello comminor animi. Comparo atrox adficio.",
        initialDate: "2026-01-25T21:57:47.886Z",
        place: {
          direction: "16202 W 1st Street, 5654",
          city: "Toulouse",
          countryCode: "FR"
        }
      }
    ],
    causeId: "a0feb2ed-79c3-4126-b672-520f20b133ec"
  },
  {
    _id: "bb149053-47c6-4569-bb8f-89779c78687c",
    name: "Iniciativa salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Angelus vinitor canonicus temporibus demoror curriculum deripio.",
    status: "pending",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:57:47.961Z",
    updatedAt: "2026-01-11T21:57:47.961Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 465,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 616,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 965,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - derechos humanos",
        description: "Evento presencial para derechos humanos. Calculus valde patrocinor modi optio despecto.",
        initialDate: "2026-04-04T20:57:47.948Z",
        place: {
          direction: "5961 Bruen Trail, 66684",
          city: "Lima",
          countryCode: "PE"
        }
      },
      {
        name: "Actividad de voluntariado - salud",
        description: "Evento presencial para salud. Voveo comminor basium ter adeptio benigne uter. Adulatio saepe vinitor auctor talis volaticus.",
        initialDate: "2026-01-19T21:57:47.948Z",
        place: {
          direction: "3943 Third Avenue, 862",
          city: "Stuttgart",
          countryCode: "DE"
        }
      }
    ],
    causeId: "c12c794c-22c9-4dbe-9254-a1f21739ff4b"
  },
  {
    _id: "662f3a60-68c5-41d7-9631-9e95e11761b3",
    name: "Programa pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Similique admitto vere in tertius corrumpo ubi hic. Tui arca vito.",
    status: "pending",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:48.025Z",
    updatedAt: "2026-01-11T21:57:48.025Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 384,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 233,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - discapacidad",
        description: "Evento presencial para discapacidad. Beatae amplus absque accusator benigne combibo crudelis demoror velut. Nulla tabernus timidus terminatio dolores cultellus cribro uredo sortitus chirographum.",
        initialDate: "2026-01-26T21:57:48.010Z",
        place: {
          direction: "41234 Howard Road, 2913",
          city: "Santiago",
          countryCode: "CL"
        }
      },
      {
        name: "Taller formativo - educación",
        description: "Evento presencial para educación. Demum accendo cometes vir. Adimpleo tot umquam alii viriliter veritas.",
        initialDate: "2026-05-20T20:57:48.010Z",
        place: {
          direction: "12848 Rempel Prairie, 39531",
          city: "Antofagasta",
          countryCode: "CL"
        }
      }
    ],
    causeId: "93f56390-5bff-4b37-a990-dbc806f8c39c"
  },
  {
    _id: "6561ff73-b76e-4817-a0b1-094ff4e44aba",
    name: "Campaña vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Beneficium spoliatio sordeo iusto. Labore conqueror somniculosus cuius campana dolorum via assumenda odio.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:21.445Z",
    updatedAt: "2026-01-11T21:58:21.445Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 396,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - tercera edad",
        description: "Evento presencial para tercera edad. Vomica uberrime administratio.",
        initialDate: "2026-01-23T21:57:48.072Z",
        place: {
          direction: "830 Bednar Lock, 3576",
          city: "Maracay",
          countryCode: "VE"
        }
      }
    ],
    causeId: "70b47bee-154f-44b1-990f-49edd0deea59"
  },
  {
    _id: "3afc2b46-1fe7-4580-89fa-6dcf1f3e172c",
    name: "Campaña discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Compono cupressus quaerat cribro natus cubitum decumbo debilito verbera in.",
    status: "pending",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:48.148Z",
    updatedAt: "2026-01-11T21:57:48.148Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 719,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 471,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 554,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - educación",
        description: "Evento presencial para educación. Sublime varietas asperiores acervus stipes deprecator urbs quaerat.",
        initialDate: "2026-03-14T21:57:48.134Z",
        place: {
          direction: "1130 Lola Wells, 3046",
          city: "Murcia",
          countryCode: "ES"
        }
      },
      {
        name: "Jornada solidaria - tercera edad",
        description: "Evento presencial para tercera edad. Turpis contra vel aequus culpo. Utor repellendus turbo sustineo confugo collum denuncio.",
        initialDate: "2026-05-05T20:57:48.134Z",
        place: {
          direction: "340 S Elm Street, 3442",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "c1950498-c36a-4e80-b30c-774c6c60e656"
  },
  {
    _id: "b919fa4e-1234-4a01-9dd1-11468a6b36fd",
    name: "Red de apoyo educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Cometes expedita solitudo deorsum confero aeternus.",
    status: "pending",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:57:48.211Z",
    updatedAt: "2026-01-11T21:57:48.211Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 836,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 949,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - discapacidad",
        description: "Evento presencial para discapacidad. Audax amaritudo xiphias verbum vulgus quia sodalitas.",
        initialDate: "2026-02-22T21:57:48.197Z",
        place: {
          direction: "417 E Washington Avenue, 508",
          city: "Cartagena",
          countryCode: "CO"
        }
      }
    ],
    causeId: "a7595e89-29f9-44cb-8611-17a12344a6b7"
  },
  {
    _id: "b57faecd-25ae-4308-896a-2b81e1ad3a99",
    name: "Acción solidaria desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Supplanto coepi soleo suffoco attonbitus nisi defendo teneo validus. Depereo defetiscor astrum voluptatibus claro considero.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:21.633Z",
    updatedAt: "2026-01-11T21:58:21.633Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 38,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Conturbo cribro numquam cura pecco stipes ademptio combibo. Socius comburo volo theca cibus qui magnam deludo aperiam despecto.",
        initialDate: "2026-05-28T20:57:48.258Z",
        place: {
          direction: "942 Hermann Courts, 81728",
          city: "Venezia",
          countryCode: "IT"
        }
      }
    ],
    causeId: "d73b58d6-f3d3-4a85-8fa2-cbc1a9e6ea40"
  },
  {
    _id: "d8761621-72eb-4f33-9e8a-d58136fcf0c3",
    name: "Proyecto salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Voluptatum comitatus volutabrum ara utpote temporibus pecto. Laudantium colo praesentium capto succedo sursum.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:21.694Z",
    updatedAt: "2026-01-11T21:58:21.694Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 35,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - pobreza",
        description: "Evento presencial para pobreza. Absum auctor minus derideo stips ascit a. Tum super animadverto.",
        initialDate: "2026-04-03T20:57:48.323Z",
        place: {
          direction: "1739 Jo River, 897",
          city: "Monterrey",
          countryCode: "MX"
        }
      }
    ],
    causeId: "c2219f93-d86a-4911-a994-1d0ce4c6c654"
  },
  {
    _id: "66bbd3d9-26f4-486c-a1b8-16c7144aeb5b",
    name: "Programa tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Cubo campana delectatio urbs conqueror contra.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:21.756Z",
    updatedAt: "2026-01-11T21:58:21.756Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 92,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 54,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Enim vomito adsidue utrum vehemens textor.",
        initialDate: "2026-04-12T20:57:48.385Z",
        place: {
          direction: "1000 Turner Mall, 2400",
          city: "Salvador",
          countryCode: "BR"
        }
      },
      {
        name: "Encuentro comunitario - refugiados",
        description: "Evento presencial para refugiados. Vinco depono damnatio audio libero.",
        initialDate: "2026-05-13T20:57:48.385Z",
        place: {
          direction: "969 Harris Summit, 39331",
          city: "London",
          countryCode: "GB"
        }
      }
    ],
    causeId: "ca04471c-dece-41cc-979e-8743be3796a8"
  },
  {
    _id: "e4aa6171-13eb-4c00-b7b6-5379370de8e2",
    name: "Operación vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Ancilla textilis tepesco totam. Terebro animus fugiat templum contra arto brevis reprehenderit arto.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:21.818Z",
    updatedAt: "2026-01-11T21:58:21.818Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 997,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 925,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - medio ambiente",
        description: "Evento presencial para medio ambiente. Suggero tenus magnam virgo spoliatio tenetur cohors. Itaque esse cunctatio uter canto adiuvo.",
        initialDate: "2026-05-20T20:57:48.449Z",
        place: {
          direction: "9943 Ward Estate, 72446",
          city: "Málaga",
          countryCode: "ES"
        }
      },
      {
        name: "Jornada solidaria - refugiados",
        description: "Evento presencial para refugiados. Hic crustulum cena.",
        initialDate: "2026-05-15T20:57:48.449Z",
        place: {
          direction: "359 Mosciski Shores, 348",
          city: "Madrid",
          countryCode: "ES"
        }
      }
    ],
    causeId: "c2219f93-d86a-4911-a994-1d0ce4c6c654"
  },
  {
    _id: "3d53b526-999a-46cd-9e56-5f66b42336d4",
    name: "Iniciativa discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Calculus civitas cupiditate trucido veniam.",
    status: "pending",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:57:48.585Z",
    updatedAt: "2026-01-11T21:57:48.585Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 541,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - agua potable",
        description: "Evento presencial para agua potable. Constans calcar vos.",
        initialDate: "2026-03-20T21:57:48.572Z",
        place: {
          direction: "952 Vesta Island, 5653",
          city: "Nice",
          countryCode: "FR"
        }
      },
      {
        name: "Reunión de coordinación - emergencias",
        description: "Evento presencial para emergencias. Tamquam vesica antea conscendo benigne colligo adiuvo defero cimentarius adaugeo. Verbera vociferor curriculum crux audax vestrum synagoga.",
        initialDate: "2026-07-01T20:57:48.572Z",
        place: {
          direction: "421 Klein Lake, 61150",
          city: "Birmingham",
          countryCode: "GB"
        }
      }
    ],
    causeId: "ae3eb1ec-3e16-4835-a8c9-06df78246056"
  },
  {
    _id: "6f466004-0960-482b-932e-b04b406d301d",
    name: "Campaña agua potable 2026",
    description: "Acción concreta para agua potable con objetivos cuantificables. Caritas ulciscor defluo. Abutor canto torqueo uterque taceo.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:22.005Z",
    updatedAt: "2026-01-11T21:58:22.005Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 929,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - tercera edad",
        description: "Evento presencial para tercera edad. Vos corpus solvo.",
        initialDate: "2026-06-01T20:57:48.633Z",
        place: {
          direction: "1811 N Broad Street, 40309",
          city: "Glasgow",
          countryCode: "GB"
        }
      }
    ],
    causeId: "b936ac6d-412f-4721-89eb-e0df728e483d"
  },
  {
    _id: "32d1848b-f6e3-46b1-973e-157e6d5571ac",
    name: "Movimiento pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Approbo delectus corpus casus verus. Tandem barba adimpleo thymbra totam caelum doloremque abscido.",
    status: "approved",
    reason: "",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:58:22.068Z",
    updatedAt: "2026-01-11T21:58:22.068Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 607,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 440,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 619,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - salud",
        description: "Evento presencial para salud. Desipio taedium thymbra caecus advoco cattus tabella armarium deficio. Una vulnero cetera constans in dapifer turpis sublime asper thymbra.",
        initialDate: "2026-06-09T20:57:48.696Z",
        place: {
          direction: "414 Ortiz Ports, 93257",
          city: "Madrid",
          countryCode: "ES"
        }
      }
    ],
    causeId: "db7adc43-dc8a-4f00-b245-77a7952aa63b"
  },
  {
    _id: "46af3234-c702-4d27-bfcd-edcb68a21433",
    name: "Red de apoyo pobreza 2027",
    description: "Acción concreta para pobreza con objetivos cuantificables. Usque placeat umquam. Clam tertius vero tutamen caute spiculum tamen verbera cresco.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:22.130Z",
    updatedAt: "2026-01-11T21:58:22.130Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 780,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 40,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 646,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - infancia",
        description: "Evento presencial para infancia. Blanditiis dicta vitiosus tui alii deputo alter curto.",
        initialDate: "2026-07-01T20:57:48.757Z",
        place: {
          direction: "2539 McCullough Gateway, 7059",
          city: "Frankfurt",
          countryCode: "DE"
        }
      }
    ],
    causeId: "b936ac6d-412f-4721-89eb-e0df728e483d"
  },
  {
    _id: "be902ddd-5ba8-4740-9c15-890763ee9523",
    name: "Acción solidaria vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Aestas hic valetudo pax crustulum sub adhaero summisse campana.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:22.190Z",
    updatedAt: "2026-01-11T21:58:22.190Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 56,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 934,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - igualdad de género",
        description: "Evento presencial para igualdad de género. Amita suus vesica cotidie crur. Desparatus neque demum corporis.",
        initialDate: "2026-02-16T21:57:48.818Z",
        place: {
          direction: "54244 W Church Street, 37569",
          city: "Cologne",
          countryCode: "DE"
        }
      },
      {
        name: "Jornada solidaria - tercera edad",
        description: "Evento presencial para tercera edad. Quasi vomica careo conventus defaeco.",
        initialDate: "2026-03-16T21:57:48.818Z",
        place: {
          direction: "46062 Chapel Road, 83925",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "8911b3ff-9a54-403b-b4b2-08bbf07d6686"
  },
  {
    _id: "1342b265-d8a6-422f-ba9d-1a85f746757b",
    name: "Acción solidaria medio ambiente 2027",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Verus stillicidium cattus numquam vesco decet vilis acceptus video.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:22.253Z",
    updatedAt: "2026-01-11T21:58:22.253Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 747,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - discapacidad",
        description: "Evento presencial para discapacidad. Accedo adicio minima colo speculum desolo. Thesaurus labore solus testimonium.",
        initialDate: "2026-04-08T20:57:48.880Z",
        place: {
          direction: "9118 Reinger Fields, 57504",
          city: "Trujillo",
          countryCode: "PE"
        }
      },
      {
        name: "Jornada solidaria - discapacidad",
        description: "Evento presencial para discapacidad. Admitto adnuo validus venia vinum amiculum apto angulus laborum. Vallum volutabrum accusamus talis ut vulpes clarus.",
        initialDate: "2026-03-07T21:57:48.880Z",
        place: {
          direction: "5795 Fay Land, 6490",
          city: "Sevilla",
          countryCode: "ES"
        }
      }
    ],
    causeId: "d73b58d6-f3d3-4a85-8fa2-cbc1a9e6ea40"
  },
  {
    _id: "c47b8313-884d-4385-bd98-023fd46a725f",
    name: "Programa salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Currus ademptio antiquus virtus adficio suscipit.",
    status: "approved",
    reason: "",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:58:22.376Z",
    updatedAt: "2026-01-11T21:58:22.376Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 294,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - tercera edad",
        description: "Evento presencial para tercera edad. Conduco casso odit subnecto distinctio antiquus alias. Spes toties voluptate somnus cultellus.",
        initialDate: "2026-07-12T20:57:49.003Z",
        place: {
          direction: "704 Blanche Ramp, 198",
          city: "Maracaibo",
          countryCode: "VE"
        }
      },
      {
        name: "Jornada solidaria - derechos humanos",
        description: "Evento presencial para derechos humanos. Anser crux antea ascisco deduco.",
        initialDate: "2026-05-23T20:57:49.003Z",
        place: {
          direction: "67172 McDermott Dale, 730",
          city: "Napoli",
          countryCode: "IT"
        }
      }
    ],
    causeId: "679524e3-79ea-4cea-814c-6140d1fa624b"
  },
  {
    _id: "98300546-5ac0-48a8-9f63-0323647edc53",
    name: "Iniciativa discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Voluptate atque acervus torqueo canis.",
    status: "approved",
    reason: "",
    userId: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    createdAt: "2026-01-11T21:58:22.438Z",
    updatedAt: "2026-01-11T21:58:22.438Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 602,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - pobreza",
        description: "Evento presencial para pobreza. Quo conicio vir pecco tabernus custodia voluptatem vestrum curiositas. Deleo inventore tendo abeo ver.",
        initialDate: "2026-02-11T21:57:49.066Z",
        place: {
          direction: "357 Moore Dam, 5525",
          city: "Antofagasta",
          countryCode: "CL"
        }
      },
      {
        name: "Reunión de coordinación - alimentación",
        description: "Evento presencial para alimentación. Cras vespillo aperte ventito video tenus aequus adamo cena audio.",
        initialDate: "2026-07-08T20:57:49.066Z",
        place: {
          direction: "274 Franco Parkway, 2299",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "46a9615f-da73-4c22-b03a-0feb2d43a378"
  },
  {
    _id: "61f16c76-cef4-4ed7-8c94-7ba2ef9df573",
    name: "Operación desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Ara suus illo. Calculus spiritus absum expedita asperiores utrimque textilis officiis.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:22.563Z",
    updatedAt: "2026-01-11T21:58:22.563Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 827,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - alimentación",
        description: "Evento presencial para alimentación. Antepono auxilium desidero capillus conservo calco. Adfectus argentum titulus speculum.",
        initialDate: "2026-02-09T21:57:49.190Z",
        place: {
          direction: "199 Kaylee Fords, 105",
          city: "La Serena",
          countryCode: "CL"
        }
      },
      {
        name: "Evento benéfico - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Copiose crepusculum abstergo certus vicissitudo spoliatio vaco demitto. Antepono urbs attero clarus vereor veniam.",
        initialDate: "2026-06-03T20:57:49.190Z",
        place: {
          direction: "909 Cyrus Fields, 9376",
          city: "Paris",
          countryCode: "FR"
        }
      }
    ],
    causeId: "46a08711-cef4-4ede-acf4-606a5442b200"
  },
  {
    _id: "00d935c5-19a5-4bad-b42d-eafc198e1ead",
    name: "Campaña infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Amoveo venustas pax defluo.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:22.625Z",
    updatedAt: "2026-01-11T21:58:22.625Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 283,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - educación",
        description: "Evento presencial para educación. Curiositas sperno vinum. Doloremque sono tempora victoria cogo arbustum.",
        initialDate: "2026-02-17T21:57:49.252Z",
        place: {
          direction: "7205 Cavendish Road, 88939",
          city: "Lille",
          countryCode: "FR"
        }
      },
      {
        name: "Jornada solidaria - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Cogo cicuta cervus omnis appello solum.",
        initialDate: "2026-05-31T20:57:49.252Z",
        place: {
          direction: "2674 Armstrong Points, 7266",
          city: "Napoli",
          countryCode: "IT"
        }
      }
    ],
    causeId: "841e3ab6-31d8-4b84-8a5b-5ceb188bc08b"
  },
  {
    _id: "3c8cb28f-acae-44bb-b216-663242c86950",
    name: "Programa emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Consectetur impedit creptio omnis quaerat torrens carmen ago. Vapulus candidus alii utique sono cupiditate astrum.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:22.750Z",
    updatedAt: "2026-01-11T21:58:22.750Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 764,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - igualdad de género",
        description: "Evento presencial para igualdad de género. Ara dolor atque pecco peccatus crur cur cicuta.",
        initialDate: "2026-07-02T20:57:49.378Z",
        place: {
          direction: "79309 Reichert Way, 40770",
          city: "Edinburgh",
          countryCode: "GB"
        }
      }
    ],
    causeId: "90a4c145-5904-466f-814d-ed30b7e82b4a"
  },
  {
    _id: "ebd1ee7d-6437-4e2c-bcb9-04a2d80b677d",
    name: "Red de apoyo medio ambiente 2027",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Impedit vinitor ipsam pecus denego conatus. Tabesco vulariter modi.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:22.814Z",
    updatedAt: "2026-01-11T21:58:22.814Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 195,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 178,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Adflicto titulus voluptatum corpus umquam aliquid traho.",
        initialDate: "2026-05-07T20:57:49.441Z",
        place: {
          direction: "5169 Central Avenue, 42398",
          city: "Cali",
          countryCode: "CO"
        }
      }
    ],
    causeId: "b936ac6d-412f-4721-89eb-e0df728e483d"
  },
  {
    _id: "cc775db2-8d2c-492e-a4b3-d1216cc55bdf",
    name: "Movimiento tercera edad 2026",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Defero claro caecus vulgus compello cultellus denuo aufero speculum quisquam. Antiquus strenuus eveniet eveniet volutabrum allatus conte",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:22.875Z",
    updatedAt: "2026-01-11T21:58:22.875Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 778,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 234,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - agua potable",
        description: "Evento presencial para agua potable. Comedo deficio aliquid credo degenero comburo ducimus vehemens non. Ultio stella versus ustilo aegre comburo sto reprehenderit.",
        initialDate: "2026-03-05T21:57:49.504Z",
        place: {
          direction: "40789 Maymie Cape, 5431",
          city: "Bogotá",
          countryCode: "CO"
        }
      }
    ],
    causeId: "ca340f10-079e-4817-af37-8e55bc205ae8"
  },
  {
    _id: "2eced1e3-b67d-4297-a682-9f7e79c7f4fa",
    name: "Movimiento derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Ab vespillo subito maxime.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:22.936Z",
    updatedAt: "2026-01-11T21:58:22.936Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 205,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 825,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 814,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Ager versus minus adnuo. Earum vivo spes caelestis nemo impedit subiungo quibusdam.",
        initialDate: "2026-05-26T20:57:49.566Z",
        place: {
          direction: "941 Susana Junction, 90468",
          city: "Bucaramanga",
          countryCode: "CO"
        }
      },
      {
        name: "Taller formativo - salud",
        description: "Evento presencial para salud. Admoneo soluta admiratio abduco terror tui sustineo dolor omnis.",
        initialDate: "2026-05-28T20:57:49.566Z",
        place: {
          direction: "8246 Western Road, 124",
          city: "Toulouse",
          countryCode: "FR"
        }
      }
    ],
    causeId: "05b1ca5b-adcd-4181-b438-2b0f6a5f3515"
  },
  {
    _id: "d2e3e5f8-fbff-47c3-afc6-b100ca764f68",
    name: "Acción solidaria vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Summisse quae colligo tremo vomer voluptates decor thesaurus tersus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:58:23.123Z",
    updatedAt: "2026-01-11T21:58:23.123Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 343,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 725,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 59,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - educación",
        description: "Evento presencial para educación. Animadverto commodo thermae acer quaerat comburo terreo vix. Cubo ademptio sollicito pariatur cuppedia sperno.",
        initialDate: "2026-02-11T21:57:49.752Z",
        place: {
          direction: "3420 Brown Heights, 96036",
          city: "Milano",
          countryCode: "IT"
        }
      }
    ],
    causeId: "db7adc43-dc8a-4f00-b245-77a7952aa63b"
  },
  {
    _id: "a2ef8de4-9b7f-4fb2-a485-f301985a3a7f",
    name: "Red de apoyo medio ambiente 2027",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Theatrum adflicto aegrotatio balbus vulpes doloribus aestas dolor territo.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:23.249Z",
    updatedAt: "2026-01-11T21:58:23.249Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 26,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 212,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - emergencias",
        description: "Evento presencial para emergencias. Timidus catena teres anser. Spiritus pauper sonitus tricesimus undique.",
        initialDate: "2026-03-21T21:57:49.878Z",
        place: {
          direction: "92722 Haylie Mountains, 3088",
          city: "Munich",
          countryCode: "DE"
        }
      }
    ],
    causeId: "71421cef-8292-438a-b99a-89b4811faaf7"
  },
  {
    _id: "212b9186-9f94-46bb-9ee2-c3359108ea50",
    name: "Operación educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Decipio omnis censura cariosus.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:23.313Z",
    updatedAt: "2026-01-11T21:58:23.313Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 451,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - vivienda",
        description: "Evento presencial para vivienda. Bibo vitae carmen.",
        initialDate: "2026-05-19T20:57:49.939Z",
        place: {
          direction: "4337 Korbin Union, 854",
          city: "Milano",
          countryCode: "IT"
        }
      }
    ],
    causeId: "ffbf9875-6e0d-4307-bcab-efcf527a2a7c"
  },
  {
    _id: "d0a66c83-136a-4655-a335-6f8785e9e207",
    name: "Red de apoyo educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Deleo deleniti conscendo. Conqueror deorsum rem depopulo reiciendis.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:23.437Z",
    updatedAt: "2026-01-11T21:58:23.437Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 406,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 89,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 837,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - infancia",
        description: "Evento presencial para infancia. Eaque capto avarus vero veritas unde.",
        initialDate: "2026-06-25T20:57:50.067Z",
        place: {
          direction: "965 William Street, 8648",
          city: "Córdoba",
          countryCode: "AR"
        }
      }
    ],
    causeId: "6c0df724-632a-4236-b4c8-5108880c7bcd"
  },
  {
    _id: "9a65980a-30d1-4f11-8866-5323c3e10ae4",
    name: "Programa medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Summopere absorbeo urbanus suffragium territo volo thalassinus paens arcus vestrum.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:23.561Z",
    updatedAt: "2026-01-11T21:58:23.561Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 59,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - discapacidad",
        description: "Evento presencial para discapacidad. Arto repudiandae artificiose inventore.",
        initialDate: "2026-04-15T20:57:50.192Z",
        place: {
          direction: "2624 E Union Street, 232",
          city: "Venezia",
          countryCode: "IT"
        }
      },
      {
        name: "Encuentro comunitario - vivienda",
        description: "Evento presencial para vivienda. Demulceo vergo careo vomito suppellex delectus argumentum vado cupressus nobis.",
        initialDate: "2026-02-26T21:57:50.193Z",
        place: {
          direction: "430 Howard Road, 21714",
          city: "Mar del Plata",
          countryCode: "AR"
        }
      }
    ],
    causeId: "e2f98a82-7137-496a-a53c-b92f016142d0"
  },
  {
    _id: "d8bf2b29-fd1c-4a3f-9784-a0c4b5f1f96d",
    name: "Campaña emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Currus aranea calco clibanus. Ipsam vox tergiversatio absens.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:23.687Z",
    updatedAt: "2026-01-11T21:58:23.687Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 673,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - agua potable",
        description: "Evento presencial para agua potable. Minima adimpleo beatus ante curatio universe conculco. Conforto demoror universe claudeo speciosus tollo alioqui validus.",
        initialDate: "2026-04-03T20:57:50.316Z",
        place: {
          direction: "172 Laurianne Keys, 5014",
          city: "Concepción",
          countryCode: "CL"
        }
      },
      {
        name: "Evento benéfico - vivienda",
        description: "Evento presencial para vivienda. Depraedor tamdiu alveus deinde denique ascit abduco subseco.",
        initialDate: "2026-03-30T20:57:50.317Z",
        place: {
          direction: "98908 Mohr Dam, 21114",
          city: "Cusco",
          countryCode: "PE"
        }
      }
    ],
    causeId: "c1da8a58-c13a-43a7-bd97-935656227b98"
  },
  {
    _id: "918c83a9-14f0-4a84-a564-3326994ec8da",
    name: "Movimiento educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Vulgus compello titulus. Crur sufficio alter cariosus utroque.",
    status: "approved",
    reason: "",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:58:23.871Z",
    updatedAt: "2026-01-11T21:58:23.871Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 812,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 745,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 841,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - tercera edad",
        description: "Evento presencial para tercera edad. Compello caute aetas audacia coaegresco delibero beatus tum usitas.",
        initialDate: "2026-02-21T21:57:50.503Z",
        place: {
          direction: "59659 Frederic Greens, 839",
          city: "Tijuana",
          countryCode: "MX"
        }
      }
    ],
    causeId: "c4b646cd-ffe6-452c-b5e7-2ded60a98ddc"
  },
  {
    _id: "aec8402d-b0f9-48f4-8511-c4ff36ebaa3b",
    name: "Campaña igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Ascit curto umbra curiositas.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:23.998Z",
    updatedAt: "2026-01-11T21:58:23.998Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 343,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 786,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 250,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Vapulus cicuta cimentarius vinum tribuo vita deprimo. Alias inventore dolore vulariter verbera vilis adfero similique consectetur dedecor.",
        initialDate: "2026-03-09T21:57:50.628Z",
        place: {
          direction: "3217 Stamm Underpass, 4715",
          city: "Toulouse",
          countryCode: "FR"
        }
      }
    ],
    causeId: "2bb53149-695b-4930-b50d-9ed9f4511cc8"
  },
  {
    _id: "2b9c73c1-2c0f-444e-ae12-28f5c3419767",
    name: "Red de apoyo pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Custodia necessitatibus suggero aiunt asporto abscido ipsa crudelis una considero.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:24.059Z",
    updatedAt: "2026-01-11T21:58:24.059Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 62,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 448,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - derechos humanos",
        description: "Evento presencial para derechos humanos. Sum vallum vulticulus atque vesica coruscus catena cunabula perferendis ulciscor.",
        initialDate: "2026-04-19T20:57:50.691Z",
        place: {
          direction: "74552 Lind Terrace, 107",
          city: "Manchester",
          countryCode: "GB"
        }
      }
    ],
    causeId: "2e38834b-dd6f-4170-afce-c57d59212223"
  },
  {
    _id: "9f5d617e-bd73-4fae-a149-21fe70c97cf8",
    name: "Programa alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Aut nisi conitor iure cogo benevolentia patrocinor.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:58:24.121Z",
    updatedAt: "2026-01-11T21:58:24.121Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 312,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 416,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - discapacidad",
        description: "Evento presencial para discapacidad. Patruus adfectus admoveo textus totus minus cedo barba. Aeneus corporis coniecto auxilium ait utique voluptate tero.",
        initialDate: "2026-04-11T20:57:50.753Z",
        place: {
          direction: "190 Johnson Street, 91489",
          city: "Guadalajara",
          countryCode: "MX"
        }
      }
    ],
    causeId: "04805d2a-1eef-40b6-9cc0-7771ee4eaa06"
  },
  {
    _id: "326716e5-ad81-4a1d-9159-70a74a6f6417",
    name: "Acción solidaria agua potable 2026",
    description: "Acción concreta para agua potable con objetivos cuantificables. Coruscus approbo turpis video conatus.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:24.183Z",
    updatedAt: "2026-01-11T21:58:24.183Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 204,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 844,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - medio ambiente",
        description: "Evento presencial para medio ambiente. Culpa desino cur condico ulterius capitulus caveo atrocitas. Vetus nobis una trucido.",
        initialDate: "2026-06-27T20:57:50.815Z",
        place: {
          direction: "499 O'Hara Unions, 131",
          city: "Nice",
          countryCode: "FR"
        }
      },
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Cursim usque nostrum defaeco conculco derelinquo maiores sopor vero.",
        initialDate: "2026-06-09T20:57:50.815Z",
        place: {
          direction: "46311 Birch Avenue, 8817",
          city: "Málaga",
          countryCode: "ES"
        }
      }
    ],
    causeId: "b4d89350-9c25-4c53-82f0-9a2f7d07902e"
  },
  {
    _id: "d4ec5d59-2c82-4fc9-9226-1de76eca9658",
    name: "Iniciativa medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Assumenda spargo modi alii. Audax combibo cognomen causa calamitas verto argumentum tabesco carbo explicabo.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:24.246Z",
    updatedAt: "2026-01-11T21:58:24.246Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 214,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 425,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 335,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Colo cuppedia benevolentia. Tamdiu desidero vado.",
        initialDate: "2026-07-05T20:57:50.877Z",
        place: {
          direction: "18946 W Market Street, 73306",
          city: "Murcia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "c1cead8a-3ab0-402d-bc0e-b0dfb6f1a72f"
  },
  {
    _id: "0684dd4c-9842-4101-a0f6-502a7aff2f43",
    name: "Red de apoyo tercera edad 2026",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Concido conatus curo somniculosus ago tardus defendo blandior aequus. Vallum odit utrimque barba.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:24.371Z",
    updatedAt: "2026-01-11T21:58:24.371Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 946,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 618,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 686,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - vivienda",
        description: "Evento presencial para vivienda. Centum torqueo una consequatur. Ex urbs textor quod totam talus defessus cribro cibo.",
        initialDate: "2026-01-22T21:57:51.002Z",
        place: {
          direction: "42813 E North Street, 797",
          city: "Madrid",
          countryCode: "ES"
        }
      }
    ],
    causeId: "c7321708-8819-4381-8b2c-cbc5e052aeb7"
  },
  {
    _id: "197460a9-03a9-4bdf-84de-d177ff04da1a",
    name: "Jornada igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Caste dens ulterius.",
    status: "approved",
    reason: "",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:58:24.436Z",
    updatedAt: "2026-01-11T21:58:24.436Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 251,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 316,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - tercera edad",
        description: "Evento presencial para tercera edad. Tendo celo vomer adfectus curia vinum. Textilis culpa aeger bene ancilla abutor.",
        initialDate: "2026-04-04T20:57:51.066Z",
        place: {
          direction: "3595 Mikayla Rue, 767",
          city: "Roma",
          countryCode: "IT"
        }
      },
      {
        name: "Taller formativo - refugiados",
        description: "Evento presencial para refugiados. Ascit labore alter depraedor adsum uberrime. Atrox viriliter ambitus tabesco.",
        initialDate: "2026-07-09T20:57:51.066Z",
        place: {
          direction: "65510 E Front Street, 8315",
          city: "Barquisimeto",
          countryCode: "VE"
        }
      }
    ],
    causeId: "a047d6ad-51d3-4f5e-97aa-771342a11c0d"
  },
  {
    _id: "62fb6f3b-b15a-431f-a7e6-f082801d3862",
    name: "Red de apoyo derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Accusamus altus tertius aiunt triduana adipisci ventosus caterva.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:58:24.510Z",
    updatedAt: "2026-01-11T21:58:24.510Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 552,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 977,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 263,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - pobreza",
        description: "Evento presencial para pobreza. Vito apostolus pauper ullam nisi iusto amplexus tricesimus dolor templum. Tempus vae argentum tenus studio soleo molestiae caput provident.",
        initialDate: "2026-03-31T20:57:51.128Z",
        place: {
          direction: "42769 Haley Place, 28983",
          city: "Madrid",
          countryCode: "ES"
        }
      },
      {
        name: "Jornada solidaria - alimentación",
        description: "Evento presencial para alimentación. Repudiandae uter vero. Alveus laboriosam cervus crapula bonus ceno utrimque abundans.",
        initialDate: "2026-07-08T20:57:51.128Z",
        place: {
          direction: "1298 Hauck Corners, 12486",
          city: "Medellín",
          countryCode: "CO"
        }
      }
    ],
    causeId: "418661a8-2342-4a4c-8733-b49a665fc775"
  },
  {
    _id: "346d555c-53ad-412e-82f9-ff338ac109f8",
    name: "Proyecto igualdad de género 2027",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Textilis voluptatum comburo nobis caste cedo.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:24.635Z",
    updatedAt: "2026-01-11T21:58:24.635Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 840,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 547,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - pobreza",
        description: "Evento presencial para pobreza. Creo sodalitas tutamen.",
        initialDate: "2026-06-25T20:57:51.251Z",
        place: {
          direction: "15368 N Broadway Street, 4225",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      },
      {
        name: "Jornada solidaria - igualdad de género",
        description: "Evento presencial para igualdad de género. Aeneus tutis desidero ad temptatio trado pecus. Crepusculum depopulo quae caelum coadunatio degenero vero.",
        initialDate: "2026-07-14T20:57:51.251Z",
        place: {
          direction: "73574 Brandt Underpass, 930",
          city: "Napoli",
          countryCode: "IT"
        }
      }
    ],
    causeId: "897c9408-6a84-446b-883a-74635fbeae2b"
  },
  {
    _id: "75be6e61-cbd7-45e5-92c2-a08b7a5be043",
    name: "Campaña derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Ait conqueror deprimo viscus acsi spectaculum ventus itaque compono triumphus. Allatus amaritudo turbo deputo atqui.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:58:24.696Z",
    updatedAt: "2026-01-11T21:58:24.696Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 464,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - salud",
        description: "Evento presencial para salud. Valde cubo aliquid nulla temptatio ultio caute caelestis.",
        initialDate: "2026-01-19T21:57:51.312Z",
        place: {
          direction: "9236 Lueilwitz Land, 2463",
          city: "Munich",
          countryCode: "DE"
        }
      }
    ],
    causeId: "679524e3-79ea-4cea-814c-6140d1fa624b"
  },
  {
    _id: "b61e0727-6bbc-43f5-adb0-12e99f7a8443",
    name: "Red de apoyo discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Vetus uredo magni quisquam atrox explicabo.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:24.760Z",
    updatedAt: "2026-01-11T21:58:24.760Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 204,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - emergencias",
        description: "Evento presencial para emergencias. In alo succurro canto eos armarium ambulo creptio absque architecto. Attonbitus nostrum voro.",
        initialDate: "2026-04-06T20:57:51.374Z",
        place: {
          direction: "36233 River Road, 96012",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "9ff79f22-0e20-4774-842b-25a1c99fb7a8"
  },
  {
    _id: "7057a4e2-dfe4-4a7d-8ff6-e0ac79429a92",
    name: "Operación refugiados 2027",
    description: "Acción concreta para refugiados con objetivos cuantificables. Audacia audax amissio ciminatio commodo umquam vergo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:24.885Z",
    updatedAt: "2026-01-11T21:58:24.885Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 821,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 624,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 345,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - pobreza",
        description: "Evento presencial para pobreza. Admitto ademptio cometes alioqui contra soleo videlicet. Thema confero comes eum suspendo confugo vir.",
        initialDate: "2026-02-24T21:57:51.499Z",
        place: {
          direction: "673 N Pine Street, 5537",
          city: "Rio de Janeiro",
          countryCode: "BR"
        }
      },
      {
        name: "Taller formativo - medio ambiente",
        description: "Evento presencial para medio ambiente. Cotidie vociferor alii cubicularis vester consequatur umbra timidus concido. Alo clamo aeneus fugiat exercitationem.",
        initialDate: "2026-07-06T20:57:51.499Z",
        place: {
          direction: "691 Roscoe Trafficway, 75772",
          city: "Barcelona",
          countryCode: "ES"
        }
      }
    ],
    causeId: "8deed214-243c-4123-9873-c26bcc8809d8"
  },
  {
    _id: "715cfd09-c3d4-451f-a6c7-c23beb4d2565",
    name: "Operación medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Aufero curso calculus alter timor thorax solutio.",
    status: "pending",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:57:51.573Z",
    updatedAt: "2026-01-11T21:57:51.573Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 50,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 809,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - infancia",
        description: "Evento presencial para infancia. Territo decumbo vulgivagus pecco solum coniecto claustrum degenero. Versus vilitas tripudio curis.",
        initialDate: "2026-02-25T21:57:51.560Z",
        place: {
          direction: "429 Connor Throughway, 8300",
          city: "León",
          countryCode: "MX"
        }
      }
    ],
    causeId: "f2e090df-eacc-43ab-9cb0-ab445ff55870"
  },
  {
    _id: "76def9fa-b3cf-4454-b3ed-3101026d920f",
    name: "Iniciativa igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Conculco teneo veniam laboriosam contabesco alius articulus tergeo una acies.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:25.010Z",
    updatedAt: "2026-01-11T21:58:25.010Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 811,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 853,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 570,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - derechos humanos",
        description: "Evento presencial para derechos humanos. Acquiro bene videlicet trado vallum caelum eos creo. Sublime suggero deleo adflicto sponte curia vae tum viridis aliqua.",
        initialDate: "2026-01-25T21:57:51.623Z",
        place: {
          direction: "60461 Hagenes Isle, 263",
          city: "Stuttgart",
          countryCode: "DE"
        }
      }
    ],
    causeId: "e513250c-2418-426e-814c-26e3a2bf79e5"
  },
  {
    _id: "b8d82936-cdff-433d-a538-65769f04fb94",
    name: "Acción solidaria medio ambiente 2027",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Addo theatrum sequi solutio cum adinventitias tero cui denego artificiose.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:25.072Z",
    updatedAt: "2026-01-11T21:58:25.072Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 651,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 907,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 422,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - medio ambiente",
        description: "Evento presencial para medio ambiente. Cariosus pel tabella. Conqueror supra auctor admoneo voluptate cresco valetudo claustrum.",
        initialDate: "2026-01-23T21:57:51.685Z",
        place: {
          direction: "574 Effertz Plain, 1259",
          city: "Valencia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "a1f4eb96-e668-47e4-97b3-f8e63f188314"
  },
  {
    _id: "8db19452-57d1-4ec0-9108-ac3846bea9d1",
    name: "Operación derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Vulgo utilis subvenio. Antiquus acies vicissitudo consequuntur thalassinus curvo corrumpo absconditus suggero allatus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:25.199Z",
    updatedAt: "2026-01-11T21:58:25.199Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 572,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Utor ocer arx.",
        initialDate: "2026-07-11T20:57:51.808Z",
        place: {
          direction: "44919 E 14th Street, 2907",
          city: "Stuttgart",
          countryCode: "DE"
        }
      },
      {
        name: "Jornada solidaria - alimentación",
        description: "Evento presencial para alimentación. Capitulus pauci corrigo adopto vita theologus vorago absorbeo clamo.",
        initialDate: "2026-06-28T20:57:51.809Z",
        place: {
          direction: "8792 Katarina River, 15089",
          city: "Birmingham",
          countryCode: "GB"
        }
      }
    ],
    causeId: "ca04471c-dece-41cc-979e-8743be3796a8"
  },
  {
    _id: "1fc45078-2a09-4c02-8d35-73a0dc34b7f6",
    name: "Campaña discapacidad 2026",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Tersus vomer tribuo.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:25.383Z",
    updatedAt: "2026-01-11T21:58:25.383Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 96,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 856,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 679,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - salud",
        description: "Evento presencial para salud. Demens urbanus tametsi comedo amiculum error tempus vere. Vulnero correptius vomito.",
        initialDate: "2026-04-23T20:57:51.994Z",
        place: {
          direction: "87070 Yost Meadow, 5906",
          city: "Nice",
          countryCode: "FR"
        }
      }
    ],
    causeId: "4db56792-f2cf-440a-a7bc-5a3b63584e42"
  },
  {
    _id: "3eb7aa44-f548-496c-bb91-8a7a5a1b8369",
    name: "Programa refugiados 2027",
    description: "Acción concreta para refugiados con objetivos cuantificables. Amor consectetur despecto altus magni cattus crepusculum. Ceno cultellus viscus viscus adamo versus.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:25.448Z",
    updatedAt: "2026-01-11T21:58:25.448Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 830,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - emergencias",
        description: "Evento presencial para emergencias. Porro ago cupio thalassinus tutis timidus.",
        initialDate: "2026-04-21T20:57:52.056Z",
        place: {
          direction: "668 Kaylee Route, 188",
          city: "Lille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "e49ea717-bdfb-4020-8f5f-7a4be362f9cd"
  },
  {
    _id: "87517a2e-b6bf-4e31-876c-52d2746ab746",
    name: "Red de apoyo vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Compono aestus subnecto. Concedo necessitatibus ambitus dapifer.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:25.646Z",
    updatedAt: "2026-01-11T21:58:25.646Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 814,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 947,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Avarus vitae cattus tutis contigo.",
        initialDate: "2026-06-10T20:57:52.244Z",
        place: {
          direction: "87870 Lewis Greens, 911",
          city: "Glasgow",
          countryCode: "GB"
        }
      }
    ],
    causeId: "148b5118-7485-4385-af3d-5fa1c82abe19"
  },
  {
    _id: "b36ac11a-893e-47fb-8df5-7571f9ed4322",
    name: "Campaña alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Suppono tener aro. Teres ocer desidero adeptio asperiores adversus caelum accedo valetudo demum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:25.770Z",
    updatedAt: "2026-01-11T21:58:25.770Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 518,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 998,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 997,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - infancia",
        description: "Evento presencial para infancia. Atqui vorago color cenaculum sono territo thymbra terra.",
        initialDate: "2026-07-03T20:57:52.368Z",
        place: {
          direction: "6097 S Chestnut Street, 65862",
          city: "Torino",
          countryCode: "IT"
        }
      }
    ],
    causeId: "c2219f93-d86a-4911-a994-1d0ce4c6c654"
  },
  {
    _id: "8f3f3679-f4fe-4a5f-bf27-1284e9c9d1c4",
    name: "Red de apoyo igualdad de género 2027",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Optio caecus adsum studio tergo comis calamitas. Annus vox claudeo tergum vobis.",
    status: "pending",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:57:52.443Z",
    updatedAt: "2026-01-11T21:57:52.443Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 322,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 152,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - infancia",
        description: "Evento presencial para infancia. Carpo careo attollo derelinquo libero textilis decumbo cruciamentum adduco.",
        initialDate: "2026-03-01T21:57:52.430Z",
        place: {
          direction: "13084 Cameron Dale, 7147",
          city: "Barquisimeto",
          countryCode: "VE"
        }
      },
      {
        name: "Encuentro comunitario - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Clam vilicus confero calculus viscus.",
        initialDate: "2026-04-25T20:57:52.430Z",
        place: {
          direction: "91365 Volkman Freeway, 83154",
          city: "Barquisimeto",
          countryCode: "VE"
        }
      }
    ],
    causeId: "6d0c3bf3-9c2c-4dfb-9e08-dc685e4057b1"
  },
  {
    _id: "410ea954-fedf-43c9-8f80-92cab03e038f",
    name: "Jornada agua potable 2026",
    description: "Acción concreta para agua potable con objetivos cuantificables. Error velit allatus celo beatae amita.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:25.894Z",
    updatedAt: "2026-01-11T21:58:25.894Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 792,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 673,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - emergencias",
        description: "Evento presencial para emergencias. Caelestis volo candidus aliquid ab acidus copia ante. Exercitationem thesis suppellex alias consectetur dicta viridis tero impedit sordeo.",
        initialDate: "2026-05-30T20:57:52.492Z",
        place: {
          direction: "9713 Laurel Close, 19655",
          city: "Cancún",
          countryCode: "MX"
        }
      }
    ],
    causeId: "71421cef-8292-438a-b99a-89b4811faaf7"
  },
  {
    _id: "5a26b3e4-099d-4472-b029-570a21f80ec9",
    name: "Red de apoyo pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Triumphus urbs dolorum teneo suspendo.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:25.956Z",
    updatedAt: "2026-01-11T21:58:25.956Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 411,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 916,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 458,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - medio ambiente",
        description: "Evento presencial para medio ambiente. Unus adiuvo atrox illum amplus alveus tempora ipsa utrum tego. Theca curo crur deduco vinum aspicio.",
        initialDate: "2026-06-08T20:57:52.554Z",
        place: {
          direction: "25107 The Beeches, 5889",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "6d0c3bf3-9c2c-4dfb-9e08-dc685e4057b1"
  },
  {
    _id: "6404c588-9e44-4cb8-870f-1916374bedfd",
    name: "Proyecto discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Adicio vero derideo titulus vel dolorem. Agnitio vis ver aiunt pauci verus sollicito tum.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:26.017Z",
    updatedAt: "2026-01-11T21:58:26.017Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 947,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 975,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 499,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - salud",
        description: "Evento presencial para salud. Vestigium canto provident omnis atqui quo sustineo tollo perspiciatis surgo. Tribuo autus casso amplexus abutor convoco.",
        initialDate: "2026-05-30T20:57:52.616Z",
        place: {
          direction: "3759 Simonis Brook, 3463",
          city: "Bordeaux",
          countryCode: "FR"
        }
      }
    ],
    causeId: "35fce5d7-da0b-43fa-8bb7-a2786eb71046"
  },
  {
    _id: "f36d3d70-79bc-43ab-88f3-484b4dfecb6e",
    name: "Operación pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Tendo vestrum certe quis unde.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:26.080Z",
    updatedAt: "2026-01-11T21:58:26.080Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 74,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - tercera edad",
        description: "Evento presencial para tercera edad. Excepturi arbor socius certe pel venustas ait curtus vulpes considero. Degenero balbus caritas agnitio summopere adicio uxor sapiente delicate.",
        initialDate: "2026-06-22T20:57:52.680Z",
        place: {
          direction: "9063 Jackson Avenue, 9030",
          city: "Valparaíso",
          countryCode: "CL"
        }
      },
      {
        name: "Encuentro comunitario - derechos humanos",
        description: "Evento presencial para derechos humanos. Tempus attero depono voluptatum vindico thalassinus ut aut denuncio casus.",
        initialDate: "2026-06-05T20:57:52.680Z",
        place: {
          direction: "216 Keith Bridge, 9700",
          city: "La Plata",
          countryCode: "AR"
        }
      }
    ],
    causeId: "8911b3ff-9a54-403b-b4b2-08bbf07d6686"
  },
  {
    _id: "a490c2cf-b7ab-484e-acce-438fd30b2638",
    name: "Jornada salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Thema vicissitudo tamquam concedo comes torqueo. Tum quas aperio statua stella vito.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:58:26.140Z",
    updatedAt: "2026-01-11T21:58:26.140Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 594,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 789,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 663,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - discapacidad",
        description: "Evento presencial para discapacidad. Cruciamentum tam nemo curis templum voluptatum decipio possimus tamisium.",
        initialDate: "2026-05-17T20:57:52.742Z",
        place: {
          direction: "4236 Holden Underpass, 394",
          city: "Glasgow",
          countryCode: "GB"
        }
      }
    ],
    causeId: "a047d6ad-51d3-4f5e-97aa-771342a11c0d"
  },
  {
    _id: "052ec2bd-05c7-4e6f-94c9-80ec4a80f6c2",
    name: "Jornada discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Aduro tres cauda conculco thorax. Traho timidus voluptates patrocinor peccatus.",
    status: "pending",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:57:52.817Z",
    updatedAt: "2026-01-11T21:57:52.817Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 479,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - pobreza",
        description: "Evento presencial para pobreza. Acervus damno pecto architecto. Curiositas vix alo quam versus coniecto tyrannus conforto.",
        initialDate: "2026-02-06T21:57:52.805Z",
        place: {
          direction: "445 Washington Road, 9586",
          city: "Frankfurt",
          countryCode: "DE"
        }
      },
      {
        name: "Reunión de coordinación - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Brevis tabesco curso incidunt virga acsi.",
        initialDate: "2026-05-07T20:57:52.805Z",
        place: {
          direction: "359 Erika Street, 14406",
          city: "Frankfurt",
          countryCode: "DE"
        }
      }
    ],
    causeId: "e49ea717-bdfb-4020-8f5f-7a4be362f9cd"
  },
  {
    _id: "4a5f57bd-27cb-48f6-b382-eb1373023adb",
    name: "Operación vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Acerbitas ager comitatus ambitus verbum. Stips antiquus universe.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:26.267Z",
    updatedAt: "2026-01-11T21:58:26.267Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 675,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 775,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 552,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Summopere textor vesica depono tot curriculum decretum verbera sub.",
        initialDate: "2026-04-24T20:57:52.867Z",
        place: {
          direction: "9689 The Oaks, 49876",
          city: "São Paulo",
          countryCode: "BR"
        }
      },
      {
        name: "Encuentro comunitario - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Vinum sumo alii velum. Dolor veritas confugo amitto thorax tener.",
        initialDate: "2026-03-15T21:57:52.867Z",
        place: {
          direction: "70561 Duke Street, 623",
          city: "Venezia",
          countryCode: "IT"
        }
      }
    ],
    causeId: "e49ea717-bdfb-4020-8f5f-7a4be362f9cd"
  },
  {
    _id: "15b49dfe-56c9-4281-bcd2-0132a6ca885d",
    name: "Movimiento derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Summopere talis asper adiuvo texo volubilis.",
    status: "approved",
    reason: "",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:58:26.392Z",
    updatedAt: "2026-01-11T21:58:26.392Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 864,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 215,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 876,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - pobreza",
        description: "Evento presencial para pobreza. Cohaero deinde pecto tristis abscido adfectus velut.",
        initialDate: "2026-03-10T21:57:52.991Z",
        place: {
          direction: "845 Reginald Shoals, 9819",
          city: "Santiago",
          countryCode: "CL"
        }
      },
      {
        name: "Taller formativo - derechos humanos",
        description: "Evento presencial para derechos humanos. Sortitus sodalitas verumtamen vicinus aut calamitas tripudio crastinus.",
        initialDate: "2026-02-14T21:57:52.991Z",
        place: {
          direction: "7397 Priory Close, 91768",
          city: "Málaga",
          countryCode: "ES"
        }
      }
    ],
    causeId: "e3ed3f33-0999-44b8-b232-e423030cbdef"
  },
  {
    _id: "0db358ba-2401-437f-9b4c-cd693817d33c",
    name: "Acción solidaria discapacidad 2026",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Statua curis caute velut.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:26.517Z",
    updatedAt: "2026-01-11T21:58:26.517Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 420,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Curto acsi sollers crux desolo toties ambitus vicinus tutamen ustulo. Defaeco amplitudo aequus coadunatio umquam deripio minus.",
        initialDate: "2026-02-11T21:57:53.114Z",
        place: {
          direction: "54665 Beahan Flats, 925",
          city: "Glasgow",
          countryCode: "GB"
        }
      }
    ],
    causeId: "cdf1f42a-4189-4865-835a-2b2abef75ee8"
  },
  {
    _id: "d7bce9a3-1124-43c9-9e8b-972d7ad87276",
    name: "Programa salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Aduro coniecto libero.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:26.639Z",
    updatedAt: "2026-01-11T21:58:26.639Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 623,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 509,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - alimentación",
        description: "Evento presencial para alimentación. Ager ambulo admoneo defluo repudiandae cotidie tergiversatio tantillus.",
        initialDate: "2026-07-12T20:57:53.240Z",
        place: {
          direction: "375 Stroman Lane, 1307",
          city: "Tijuana",
          countryCode: "MX"
        }
      }
    ],
    causeId: "6d0c3bf3-9c2c-4dfb-9e08-dc685e4057b1"
  },
  {
    _id: "a02890f9-bdf3-4395-9cdc-e42767607fd8",
    name: "Jornada educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Vix facere compello ait summisse.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:26.701Z",
    updatedAt: "2026-01-11T21:58:26.701Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 744,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - discapacidad",
        description: "Evento presencial para discapacidad. Iusto arbustum cenaculum. Deficio usque cresco totus paulatim crur.",
        initialDate: "2026-05-05T20:57:53.302Z",
        place: {
          direction: "89305 S Jefferson Street, 8788",
          city: "Murcia",
          countryCode: "ES"
        }
      },
      {
        name: "Actividad de voluntariado - igualdad de género",
        description: "Evento presencial para igualdad de género. Labore viduo confugo provident cubicularis. Turpis canto numquam vitiosus itaque claudeo amplus speculum utroque.",
        initialDate: "2026-07-13T20:57:53.302Z",
        place: {
          direction: "3271 Bartoletti Centers, 405",
          city: "Frankfurt",
          countryCode: "DE"
        }
      }
    ],
    causeId: "f2e090df-eacc-43ab-9cb0-ab445ff55870"
  },
  {
    _id: "2f46d9aa-af94-4a15-a534-40bfc8fa19a7",
    name: "Jornada salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Trucido vester ater officiis curso sopor. Texo voro careo crinis tersus traho bellicus carbo.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:26.951Z",
    updatedAt: "2026-01-11T21:58:26.951Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 160,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 397,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - educación",
        description: "Evento presencial para educación. Debeo solvo adnuo patrocinor ullam culpa conscendo. Bardus bellum repellat veritas socius taceo suppono commodo aequus comitatus.",
        initialDate: "2026-03-13T21:57:53.550Z",
        place: {
          direction: "42928 Hoyt Parkways, 2362",
          city: "Caracas",
          countryCode: "VE"
        }
      },
      {
        name: "Reunión de coordinación - educación",
        description: "Evento presencial para educación. Suadeo culpo tertius stabilis alo ascisco crebro solutio. Volutabrum velum unus minima sperno.",
        initialDate: "2026-04-05T20:57:53.550Z",
        place: {
          direction: "1859 Mosciski Forges, 63352",
          city: "Hamburg",
          countryCode: "DE"
        }
      }
    ],
    causeId: "3f1c2650-8608-4f67-9b8c-454addeeb255"
  },
  {
    _id: "3ca16a84-3f9d-40e6-a8e0-22a379e37706",
    name: "Proyecto alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Tepidus deorsum attollo crebro tamen defungo creta adfectus iusto. Attonbitus cultura ciminatio succedo crustulum.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:27.012Z",
    updatedAt: "2026-01-11T21:58:27.012Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 310,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - agua potable",
        description: "Evento presencial para agua potable. Anser advenio adsuesco clarus tutamen laudantium esse vitium.",
        initialDate: "2026-04-20T20:57:53.612Z",
        place: {
          direction: "409 N 6th Street, 31392",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "c465ff85-a592-4f42-bcfb-6dc83c28db81"
  },
  {
    _id: "20e54d10-c4f4-456f-a331-179499966a07",
    name: "Acción solidaria educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Spargo utpote odio carcer eveniet somnus aperio aro.",
    status: "approved",
    reason: "",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:58:27.073Z",
    updatedAt: "2026-01-11T21:58:27.073Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 956,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 904,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 648,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - emergencias",
        description: "Evento presencial para emergencias. Tonsor beatae creta credo dedico.",
        initialDate: "2026-06-19T20:57:53.676Z",
        place: {
          direction: "7103 Kings Highway, 86419",
          city: "Lille",
          countryCode: "FR"
        }
      },
      {
        name: "Encuentro comunitario - salud",
        description: "Evento presencial para salud. Temptatio textus ulterius cattus cubicularis socius defero vulgivagus candidus summopere.",
        initialDate: "2026-03-12T21:57:53.676Z",
        place: {
          direction: "44134 Hill Street, 58433",
          city: "Santiago",
          countryCode: "CL"
        }
      }
    ],
    causeId: "e3ed3f33-0999-44b8-b232-e423030cbdef"
  },
  {
    _id: "bc2061c5-9739-47a3-a16c-611354bce83d",
    name: "Iniciativa desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Ara quis tabgo deprecator.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:58:27.196Z",
    updatedAt: "2026-01-11T21:58:27.196Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 601,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 117,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 97,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - derechos humanos",
        description: "Evento presencial para derechos humanos. Avarus ab stabilis tui ducimus tres quaerat turba excepturi corrigo.",
        initialDate: "2026-07-10T20:57:53.800Z",
        place: {
          direction: "15022 Gloucester Road, 157",
          city: "Nice",
          countryCode: "FR"
        }
      },
      {
        name: "Reunión de coordinación - tercera edad",
        description: "Evento presencial para tercera edad. Tener aeternus sponte deprimo atrocitas sufficio defungo corrupti. Torrens talio apud virga tergum tot labore.",
        initialDate: "2026-02-12T21:57:53.800Z",
        place: {
          direction: "313 Daugherty Summit, 532",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "41a0f8da-010e-4843-99fc-3a96bcc1d1d3"
  },
  {
    _id: "60a99f1a-2bac-484b-98b4-bbc1ac2a3b44",
    name: "Campaña agua potable 2027",
    description: "Acción concreta para agua potable con objetivos cuantificables. Alveus tendo consuasor adfero carcer. Arbitro villa thymbra blandior cavus utrimque cometes fugiat cultellus.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:27.259Z",
    updatedAt: "2026-01-11T21:58:27.259Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 752,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 66,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 878,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - discapacidad",
        description: "Evento presencial para discapacidad. Somnus certus abutor tepidus curiositas creta appono confero acerbitas.",
        initialDate: "2026-04-15T20:57:53.862Z",
        place: {
          direction: "439 Fatima Walk, 74829",
          city: "Puebla",
          countryCode: "MX"
        }
      },
      {
        name: "Jornada solidaria - medio ambiente",
        description: "Evento presencial para medio ambiente. Atque aggredior deserunt aliquam conforto. Tonsor recusandae defaeco commodi excepturi tamdiu uterque agnitio.",
        initialDate: "2026-02-02T21:57:53.862Z",
        place: {
          direction: "95325 Kailee Ford, 4564",
          city: "Antofagasta",
          countryCode: "CL"
        }
      }
    ],
    causeId: "075b7337-53dc-46d4-a1cd-307ab07469ab"
  },
  {
    _id: "7a4695b1-3921-4f09-80a2-a37ced33263f",
    name: "Campaña medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Bos cubitum conitor. Libero demonstro beatae tam ambulo adfero decretum vulnero molestias.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:27.447Z",
    updatedAt: "2026-01-11T21:58:27.447Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 922,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 433,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 890,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Aestus defero cattus adversus.",
        initialDate: "2026-05-09T20:57:54.049Z",
        place: {
          direction: "39239 Antonette Islands, 56989",
          city: "Medellín",
          countryCode: "CO"
        }
      }
    ],
    causeId: "76869ea9-14bc-446d-84d6-03cf9cb4cf2f"
  },
  {
    _id: "2c2c71fc-16be-4774-817a-f6b8ee017249",
    name: "Red de apoyo refugiados 2026",
    description: "Acción concreta para refugiados con objetivos cuantificables. Deporto ut adversus eligendi crux consequuntur fuga.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:27.509Z",
    updatedAt: "2026-01-11T21:58:27.509Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 51,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - derechos humanos",
        description: "Evento presencial para derechos humanos. Vilicus tendo abeo tener auctor natus.",
        initialDate: "2026-01-25T21:57:54.112Z",
        place: {
          direction: "5453 Roman Road, 2572",
          city: "Lima",
          countryCode: "PE"
        }
      },
      {
        name: "Evento benéfico - educación",
        description: "Evento presencial para educación. Solvo aptus adipisci repellat.",
        initialDate: "2026-02-28T21:57:54.112Z",
        place: {
          direction: "96752 Schowalter Center, 49610",
          city: "Marseille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "6d0c3bf3-9c2c-4dfb-9e08-dc685e4057b1"
  },
  {
    _id: "7d1b2e5f-c287-454b-a4f7-ca77ce96b4a0",
    name: "Operación alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Summa apto cohibeo patruus supra tergeo canto. Caecus auctor decumbo quam.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:27.584Z",
    updatedAt: "2026-01-11T21:58:27.584Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 99,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 182,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - refugiados",
        description: "Evento presencial para refugiados. Convoco aranea exercitationem id earum. Averto socius conicio via tolero aggero sortitus valens earum temeritas.",
        initialDate: "2026-03-09T21:57:54.174Z",
        place: {
          direction: "45652 Micah Road, 7409",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "d4333aed-c78a-49fb-945e-8237cd23d0a2"
  },
  {
    _id: "6762557f-0df3-49c5-ae07-6c9c9117b9d6",
    name: "Campaña discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Triumphus tibi suffragium canonicus.",
    status: "approved",
    reason: "",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:58:27.710Z",
    updatedAt: "2026-01-11T21:58:27.710Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 671,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 693,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - agua potable",
        description: "Evento presencial para agua potable. Officiis decretum absens tabesco illo adicio bis timor aequitas praesentium. Copia arx aranea expedita.",
        initialDate: "2026-06-25T20:57:54.299Z",
        place: {
          direction: "286 O'Reilly Tunnel, 98298",
          city: "Roma",
          countryCode: "IT"
        }
      },
      {
        name: "Actividad de voluntariado - discapacidad",
        description: "Evento presencial para discapacidad. Constans clibanus vado vir adflicto artificiose non ullam. Cariosus contigo vomer.",
        initialDate: "2026-01-29T21:57:54.299Z",
        place: {
          direction: "719 Atlantic Avenue, 327",
          city: "Mendoza",
          countryCode: "AR"
        }
      }
    ],
    causeId: "75df7309-beae-4ce2-aeb7-d32e7b155998"
  },
  {
    _id: "77c4a4a2-e4b7-44ac-aca0-12250e52fac8",
    name: "Operación infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Cedo tactus eaque vix caelum absconditus depraedor. Caterva sumptus vacuus terror combibo templum decimus campana desolo.",
    status: "approved",
    reason: "",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:58:27.771Z",
    updatedAt: "2026-01-11T21:58:27.771Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 435,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - vivienda",
        description: "Evento presencial para vivienda. Ager clarus aegrus paulatim ambitus cado eum statua conspergo. Comminor supplanto saepe altus cornu facilis distinctio velociter velit.",
        initialDate: "2026-04-02T20:57:54.360Z",
        place: {
          direction: "74826 Keegan Flat, 12798",
          city: "Bristol",
          countryCode: "GB"
        }
      },
      {
        name: "Jornada solidaria - infancia",
        description: "Evento presencial para infancia. Amitto valetudo aro veniam custodia crudelis color. Aeger taceo subito cumque appello cultura.",
        initialDate: "2026-07-12T20:57:54.360Z",
        place: {
          direction: "62789 Moss Lane, 4932",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "166f4fd8-8e58-4773-8567-41195e1dfbb3"
  },
  {
    _id: "cad46d4f-3959-41c1-8e1a-d872d57ee6a3",
    name: "Iniciativa infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Amaritudo coadunatio cultura accendo sto.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:27.834Z",
    updatedAt: "2026-01-11T21:58:27.834Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 67,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 38,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 517,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Ver ipsam tracto corporis voluptatibus admoveo aedificium cito. Uter crebro calamitas.",
        initialDate: "2026-05-10T20:57:54.422Z",
        place: {
          direction: "713 Amira Fork, 255",
          city: "Cologne",
          countryCode: "DE"
        }
      }
    ],
    causeId: "e513250c-2418-426e-814c-26e3a2bf79e5"
  },
  {
    _id: "5fd1d6ee-9778-4155-a4bb-cb7d0620af3b",
    name: "Acción solidaria discapacidad 2026",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Crudelis ullus usus suscipit. Veniam cavus similique.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:27.895Z",
    updatedAt: "2026-01-11T21:58:27.895Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 527,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - discapacidad",
        description: "Evento presencial para discapacidad. Catena occaecati denuo tutis creator aspicio adhaero toties.",
        initialDate: "2026-02-21T21:57:54.484Z",
        place: {
          direction: "377 Windler Freeway, 5783",
          city: "Cali",
          countryCode: "CO"
        }
      }
    ],
    causeId: "fe249097-ae58-4991-974d-4047dde643af"
  },
  {
    _id: "1a6209b5-16be-4d3d-8da1-2a408b1e33a3",
    name: "Jornada agua potable 2026",
    description: "Acción concreta para agua potable con objetivos cuantificables. Cado curvo deporto.",
    status: "approved",
    reason: "",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:58:28.080Z",
    updatedAt: "2026-01-11T21:58:28.080Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 417,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - refugiados",
        description: "Evento presencial para refugiados. Clarus clementia neque depulso ipsum tyrannus sint auctus vesica subiungo.",
        initialDate: "2026-03-06T21:57:54.672Z",
        place: {
          direction: "29751 Koepp Wall, 36282",
          city: "Barquisimeto",
          countryCode: "VE"
        }
      }
    ],
    causeId: "db7adc43-dc8a-4f00-b245-77a7952aa63b"
  },
  {
    _id: "55140e94-4cec-4103-83cc-40c99d014b51",
    name: "Iniciativa infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Cedo tepesco demoror clamo adduco cresco.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:28.141Z",
    updatedAt: "2026-01-11T21:58:28.141Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 830,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - igualdad de género",
        description: "Evento presencial para igualdad de género. Spoliatio tabula succedo capto aspernatur.",
        initialDate: "2026-04-01T20:57:54.735Z",
        place: {
          direction: "40687 Park Street, 41297",
          city: "Hamburg",
          countryCode: "DE"
        }
      },
      {
        name: "Taller formativo - salud",
        description: "Evento presencial para salud. Bellicus vulariter tendo consequuntur cubicularis vinitor.",
        initialDate: "2026-02-05T21:57:54.736Z",
        place: {
          direction: "1092 Shane Lake, 7274",
          city: "Antofagasta",
          countryCode: "CL"
        }
      }
    ],
    causeId: "d571ef73-ae41-43a0-aa8e-5e4409c504a1"
  },
  {
    _id: "2593d04f-16b5-4d3f-8468-2903576c0c5b",
    name: "Programa refugiados 2027",
    description: "Acción concreta para refugiados con objetivos cuantificables. Thalassinus subseco eligendi quaerat articulus. Acquiro sublime thesaurus.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:28.391Z",
    updatedAt: "2026-01-11T21:58:28.391Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 739,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - educación",
        description: "Evento presencial para educación. Deficio sit solum cohibeo succedo carus clamo derelinquo praesentium adduco. Coaegresco consectetur cura comprehendo utroque impedit eaque vinitor demonstro abscido.",
        initialDate: "2026-03-11T21:57:54.986Z",
        place: {
          direction: "5876 5th Avenue, 524",
          city: "Sevilla",
          countryCode: "ES"
        }
      }
    ],
    causeId: "b8e47d09-fe0b-4d3a-b8e2-07f8c7f10003"
  },
  {
    _id: "9bd5ac8f-575b-4b31-b100-2f00456f3a49",
    name: "Red de apoyo educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Canto audeo perspiciatis tutis ambulo voveo vulpes quos. Enim comprehendo amet.",
    status: "approved",
    reason: "",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:58:28.450Z",
    updatedAt: "2026-01-11T21:58:28.450Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 18,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - tercera edad",
        description: "Evento presencial para tercera edad. Crur apparatus tripudio utroque aestas stillicidium cum beneficium. Delego apto deleniti adipisci amplitudo veritas solutio tunc.",
        initialDate: "2026-06-13T20:57:55.048Z",
        place: {
          direction: "62266 Anderson Corner, 998",
          city: "Rosario",
          countryCode: "AR"
        }
      }
    ],
    causeId: "1f892f51-33ae-48d4-880c-4f56b7dc763c"
  },
  {
    _id: "4a3cc84c-6da3-4b7e-accf-bf2c01a4f18b",
    name: "Proyecto igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Angelus solio culpo pax caveo dedecor. Caecus arma ancilla utor territo apostolus.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:28.513Z",
    updatedAt: "2026-01-11T21:58:28.513Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 785,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 316,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 403,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - alimentación",
        description: "Evento presencial para alimentación. Adficio nemo summisse adeo sonitus constans tyrannus. Cupio ater ducimus coaegresco.",
        initialDate: "2026-03-24T21:57:55.111Z",
        place: {
          direction: "78397 Chauncey Point, 723",
          city: "London",
          countryCode: "GB"
        }
      },
      {
        name: "Reunión de coordinación - alimentación",
        description: "Evento presencial para alimentación. Aperte thesaurus adopto veniam termes ipsum laborum curtus. Avarus curriculum ullus delinquo celer communis.",
        initialDate: "2026-05-05T20:57:55.111Z",
        place: {
          direction: "9776 Armand Course, 12060",
          city: "Cancún",
          countryCode: "MX"
        }
      }
    ],
    causeId: "017d3208-aa1c-4e89-834c-0de8cdb77ebc"
  },
  {
    _id: "6ffca01d-ec9c-4fc5-b7a4-49de17fbd60e",
    name: "Acción solidaria igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Admoveo claudeo crastinus creber curo attollo benigne adimpleo crinis stillicidium.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:28.574Z",
    updatedAt: "2026-01-11T21:58:28.574Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 43,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 237,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 748,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Cunctatio totidem tego credo adipisci cito video adstringo.",
        initialDate: "2026-04-21T20:57:55.173Z",
        place: {
          direction: "8578 Raoul Plain, 7341",
          city: "Brasília",
          countryCode: "BR"
        }
      }
    ],
    causeId: "76869ea9-14bc-446d-84d6-03cf9cb4cf2f"
  },
  {
    _id: "43a05638-b477-469f-8c58-7becff414c2e",
    name: "Acción solidaria derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Custodia tergeo concido cado ambulo desparatus suus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:28.882Z",
    updatedAt: "2026-01-11T21:58:28.882Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 155,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - educación",
        description: "Evento presencial para educación. Amicitia solitudo voluptate corpus strenuus ambitus clamo stella vociferor video. Sumo torrens provident adversus arca tempora admiratio provident qui toties.",
        initialDate: "2026-02-15T21:57:55.501Z",
        place: {
          direction: "449 Kathryn Turnpike, 17796",
          city: "Antofagasta",
          countryCode: "CL"
        }
      },
      {
        name: "Reunión de coordinación - alimentación",
        description: "Evento presencial para alimentación. Quod vigor adulatio commodi aduro. Calculus cilicium harum ara videlicet voluptas.",
        initialDate: "2026-06-25T20:57:55.501Z",
        place: {
          direction: "2114 Gerhold Ramp, 737",
          city: "Napoli",
          countryCode: "IT"
        }
      }
    ],
    causeId: "6632c65a-7e07-4590-ae1f-f2c92af19be4"
  },
  {
    _id: "de3108e0-77a8-4aba-b3ba-073297872a2d",
    name: "Operación emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Sperno quisquam depulso sunt temptatio commodo.",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:58:28.945Z",
    updatedAt: "2026-01-11T21:58:28.945Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 683,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 759,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Strenuus debitis supra. Vix tremo thalassinus talis nemo solutio vesper demum sopor degenero.",
        initialDate: "2026-03-31T20:57:55.561Z",
        place: {
          direction: "917 Mayert Fields, 2752",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "bb8ac1b9-bad1-49cf-a93c-666169265e42"
  },
  {
    _id: "2ddf9d19-13ac-4cdf-ab29-593eff5e9b7c",
    name: "Jornada salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Titulus repellat trado vilitas compello cruentus. Artificiose synagoga quo inflammatio.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:29.007Z",
    updatedAt: "2026-01-11T21:58:29.007Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 532,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - derechos humanos",
        description: "Evento presencial para derechos humanos. Quibusdam sollers ustulo molestias talis culpo creo. Conor pecus cum cupiditate.",
        initialDate: "2026-03-13T21:57:55.622Z",
        place: {
          direction: "3574 Etha Shore, 351",
          city: "Zaragoza",
          countryCode: "ES"
        }
      },
      {
        name: "Actividad de voluntariado - derechos humanos",
        description: "Evento presencial para derechos humanos. Confugo harum suffoco audentia villa traho approbo antea.",
        initialDate: "2026-03-21T21:57:55.622Z",
        place: {
          direction: "669 Bluebell Close, 8759",
          city: "Torino",
          countryCode: "IT"
        }
      }
    ],
    causeId: "3c371a32-f967-4075-bbc5-4e7133b345ea"
  },
  {
    _id: "7b3ddeee-6344-4962-8ff7-04077fbabf38",
    name: "Programa tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Cultura abeo aegrotatio perspiciatis. Colligo utroque caelestis vulgo currus aut assentator molestiae cogito.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:29.251Z",
    updatedAt: "2026-01-11T21:58:29.251Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 632,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - vivienda",
        description: "Evento presencial para vivienda. Cursim coerceo voro culpo confero. Tonsor abutor officia voro.",
        initialDate: "2026-01-23T21:57:55.873Z",
        place: {
          direction: "628 E 4th Street, 908",
          city: "Birmingham",
          countryCode: "GB"
        }
      },
      {
        name: "Taller formativo - emergencias",
        description: "Evento presencial para emergencias. Adulatio coma sustineo desparatus cohibeo abundans tenuis ter. Tactus vel adinventitias communis despecto teneo demoror.",
        initialDate: "2026-03-19T21:57:55.873Z",
        place: {
          direction: "32622 Kamren Track, 944",
          city: "Marseille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "65743436-e912-41ee-9a79-5ef675315a39"
  },
  {
    _id: "dd4a74f1-0091-47c9-8b71-b74d2dfbeaa4",
    name: "Programa medio ambiente 2027",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Antiquus valeo cuius umbra claro casus coaegresco virga.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:29.313Z",
    updatedAt: "2026-01-11T21:58:29.313Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 10,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 162,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - tercera edad",
        description: "Evento presencial para tercera edad. Denique asperiores cernuus aer tempora stella.",
        initialDate: "2026-02-02T21:57:55.933Z",
        place: {
          direction: "73438 Poplar Avenue, 563",
          city: "Bristol",
          countryCode: "GB"
        }
      },
      {
        name: "Taller formativo - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Deficio sollers asporto tondeo amor arceo expedita. Deserunt vivo supplanto venustas teres.",
        initialDate: "2026-05-29T20:57:55.934Z",
        place: {
          direction: "9393 Hagenes Mills, 423",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "c1eddc8c-2252-415e-a7cf-c78bca867a29"
  },
  {
    _id: "172f99b6-c467-4a9e-bf1f-bdc363d4dd45",
    name: "Proyecto derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Victus brevis spiritus blanditiis.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:58:29.436Z",
    updatedAt: "2026-01-11T21:58:29.436Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 619,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - salud",
        description: "Evento presencial para salud. Sursum sollicito mollitia umerus. Decens turbo tego celer.",
        initialDate: "2026-06-22T20:57:56.060Z",
        place: {
          direction: "94281 Mekhi Courts, 5859",
          city: "Firenze",
          countryCode: "IT"
        }
      }
    ],
    causeId: "75df7309-beae-4ce2-aeb7-d32e7b155998"
  },
  {
    _id: "7a0aa476-e0c9-4515-9620-23fe7397b449",
    name: "Jornada tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Tunc temperantia benigne cursus accusantium audax ventito. Cohaero vicinus succurro.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:29.558Z",
    updatedAt: "2026-01-11T21:58:29.558Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 17,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - emergencias",
        description: "Evento presencial para emergencias. Tenus terminatio clamo.",
        initialDate: "2026-03-22T21:57:56.183Z",
        place: {
          direction: "119 Friesen Streets, 57418",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      },
      {
        name: "Reunión de coordinación - refugiados",
        description: "Evento presencial para refugiados. Vinculum curto reiciendis crux subiungo paens.",
        initialDate: "2026-03-01T21:57:56.183Z",
        place: {
          direction: "4389 Palma Divide, 384",
          city: "Valencia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "832b5160-c556-420e-8e7c-b64e4a0bf937"
  },
  {
    _id: "b43fdddc-cd78-431c-a398-e935d314f4d5",
    name: "Acción solidaria vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Valens itaque patrocinor sollers nobis texo auxilium bonus. Quasi tardus trucido aliquam deleo.",
    status: "approved",
    reason: "",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:58:29.620Z",
    updatedAt: "2026-01-11T21:58:29.620Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 332,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 573,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 657,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - tercera edad",
        description: "Evento presencial para tercera edad. Conculco vulpes deludo tondeo ait aetas. Tam abscido uxor vinculum utor voluptates xiphias.",
        initialDate: "2026-07-11T20:57:56.245Z",
        place: {
          direction: "106 Haag Drive, 60054",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "1f892f51-33ae-48d4-880c-4f56b7dc763c"
  },
  {
    _id: "aae8ea6c-d252-498f-89f2-074849039772",
    name: "Jornada pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Defero tutamen universe esse assumenda.",
    status: "pending",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:57:56.321Z",
    updatedAt: "2026-01-11T21:57:56.321Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 631,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - discapacidad",
        description: "Evento presencial para discapacidad. Vestigium approbo adulescens. Terror temeritas conforto coerceo torrens celer cinis.",
        initialDate: "2026-04-13T20:57:56.308Z",
        place: {
          direction: "4077 Yew Tree Close, 10393",
          city: "Paris",
          countryCode: "FR"
        }
      }
    ],
    causeId: "e00c1a10-c59e-4640-9261-245bbbb55a95"
  },
  {
    _id: "c9a211e8-0972-49ea-8370-7b53e55d0d8b",
    name: "Campaña alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Atque vulnero tyrannus natus sponte cribro conor. Aperte vindico cunae paens volva vomito voluptatibus totidem.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:29.744Z",
    updatedAt: "2026-01-11T21:58:29.744Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 574,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 14,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - agua potable",
        description: "Evento presencial para agua potable. Quaerat speculum adfectus confero.",
        initialDate: "2026-05-25T20:57:56.370Z",
        place: {
          direction: "3457 Karelle Village, 2278",
          city: "Bucaramanga",
          countryCode: "CO"
        }
      }
    ],
    causeId: "897c9408-6a84-446b-883a-74635fbeae2b"
  },
  {
    _id: "5dd705d3-e078-4f3e-a1fd-56f1982490fa",
    name: "Acción solidaria salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Careo voluptate desipio minima cinis curiositas repudiandae dolorem. Basium cogo volva angelus.",
    status: "pending",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:57:56.445Z",
    updatedAt: "2026-01-11T21:57:56.445Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 93,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - tercera edad",
        description: "Evento presencial para tercera edad. Amiculum peior tricesimus verto tamdiu consectetur cupio allatus.",
        initialDate: "2026-05-26T20:57:56.432Z",
        place: {
          direction: "400 Lillian Key, 490",
          city: "Bogotá",
          countryCode: "CO"
        }
      }
    ],
    causeId: "143d354e-c2df-4840-981f-e2d77baa41cc"
  },
  {
    _id: "084453ca-e1e3-4d18-ae1c-da0d5078f45f",
    name: "Campaña educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Somniculosus aestus thymum necessitatibus inventore.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:29.930Z",
    updatedAt: "2026-01-11T21:58:29.930Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 195,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 969,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 650,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - refugiados",
        description: "Evento presencial para refugiados. Cupressus denuo tracto cuius debeo volo.",
        initialDate: "2026-05-27T20:57:56.556Z",
        place: {
          direction: "915 Dorothy Camp, 994",
          city: "Birmingham",
          countryCode: "GB"
        }
      },
      {
        name: "Evento benéfico - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Minima vilitas ulterius veritas versus agnosco absum textor.",
        initialDate: "2026-04-11T20:57:56.557Z",
        place: {
          direction: "990 Cloyd Keys, 99204",
          city: "Marseille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "35fce5d7-da0b-43fa-8bb7-a2786eb71046"
  },
  {
    _id: "ee0fb1a0-0b85-4f29-82e4-e735884c196c",
    name: "Campaña refugiados 2026",
    description: "Acción concreta para refugiados con objetivos cuantificables. Ver suasoria exercitationem uter surgo caput carpo solio patruus.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:29.995Z",
    updatedAt: "2026-01-11T21:58:29.995Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 289,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Demulceo votum comis crepusculum deorsum spiculum alioqui.",
        initialDate: "2026-05-03T20:57:56.617Z",
        place: {
          direction: "76529 Garden Close, 168",
          city: "Arequipa",
          countryCode: "PE"
        }
      }
    ],
    causeId: "e49ea717-bdfb-4020-8f5f-7a4be362f9cd"
  },
  {
    _id: "7617e5ce-f3c7-49e6-b2d5-ec66f5e53d37",
    name: "Red de apoyo desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Doloribus conservo caute natus. Coniuratio argumentum aequus attero asper stella cogo id.",
    status: "pending",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:57:56.692Z",
    updatedAt: "2026-01-11T21:57:56.692Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 355,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - salud",
        description: "Evento presencial para salud. Caelum tactus umquam pecco tertius ulterius pauci. Alii aeternus callide excepturi adversus decet corrupti.",
        initialDate: "2026-01-25T21:57:56.679Z",
        place: {
          direction: "8191 E 4th Street, 5489",
          city: "Bologna",
          countryCode: "IT"
        }
      }
    ],
    causeId: "5e9ec5a6-b438-41ec-9986-abcc23f2995f"
  },
  {
    _id: "e42d6c1c-0241-412a-9259-7c24ef7b8e4d",
    name: "Proyecto desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Cimentarius desidero tergo. Arceo curriculum acidus synagoga amiculum quos undique.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:30.376Z",
    updatedAt: "2026-01-11T21:58:30.376Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 346,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 359,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - discapacidad",
        description: "Evento presencial para discapacidad. Abbas maxime argentum sordeo. Temperantia architecto sophismata adeptio pecco spero verecundia accendo.",
        initialDate: "2026-04-21T20:57:56.991Z",
        place: {
          direction: "126 4th Avenue, 8415",
          city: "Glasgow",
          countryCode: "GB"
        }
      },
      {
        name: "Reunión de coordinación - medio ambiente",
        description: "Evento presencial para medio ambiente. Conicio veritas termes acquiro. Solvo combibo viridis verbera vae utroque laudantium cubitum.",
        initialDate: "2026-03-09T21:57:56.991Z",
        place: {
          direction: "447 W Jefferson Street, 3110",
          city: "Puebla",
          countryCode: "MX"
        }
      }
    ],
    causeId: "8deed214-243c-4123-9873-c26bcc8809d8"
  },
  {
    _id: "60843c75-d5e7-4005-9f12-01c86720ae3a",
    name: "Iniciativa discapacidad 2026",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Aqua summopere est triduana aeternus exercitationem stips ipsa. Bene comprehendo voro victus sto antea subiungo ipsa.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:58:30.437Z",
    updatedAt: "2026-01-11T21:58:30.437Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 541,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 46,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Accusantium decimus utrimque textilis claustrum. Admiratio amo demonstro cerno colligo validus denego.",
        initialDate: "2026-02-02T21:57:57.053Z",
        place: {
          direction: "3718 Raynor Heights, 249",
          city: "Córdoba",
          countryCode: "AR"
        }
      },
      {
        name: "Jornada solidaria - salud",
        description: "Evento presencial para salud. Vulgus caterva desino tui advoco rem termes vitae pauci. Solus deleniti tempora adflicto asper vulgo calculus decumbo conatus.",
        initialDate: "2026-02-08T21:57:57.054Z",
        place: {
          direction: "4345 Maple Avenue, 56845",
          city: "Barquisimeto",
          countryCode: "VE"
        }
      }
    ],
    causeId: "418661a8-2342-4a4c-8733-b49a665fc775"
  },
  {
    _id: "d2c42e76-36c3-440b-8f76-9f5180be3970",
    name: "Proyecto pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Cruentus surgo adipisci correptius canis celebrer vacuus cibus caries studio. Cruciamentum adnuo venustas vilicus abutor statua comminor.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:30.501Z",
    updatedAt: "2026-01-11T21:58:30.501Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 915,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - pobreza",
        description: "Evento presencial para pobreza. Celebrer astrum aiunt vox torrens porro.",
        initialDate: "2026-03-19T21:57:57.116Z",
        place: {
          direction: "702 Roberta Pines, 116",
          city: "Bordeaux",
          countryCode: "FR"
        }
      }
    ],
    causeId: "6d5e9cb7-9023-49ad-ac09-2a13ce8b5f4e"
  },
  {
    _id: "a452677e-c751-4d4f-85d9-1a82035e4c25",
    name: "Campaña tercera edad 2026",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Decimus officia arto comptus strenuus sono cotidie quidem alius.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:30.625Z",
    updatedAt: "2026-01-11T21:58:30.625Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 190,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 586,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 729,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - medio ambiente",
        description: "Evento presencial para medio ambiente. Denuo fuga ascit pectus usitas. Confugo aliqua vesco adinventitias venio.",
        initialDate: "2026-01-23T21:57:57.238Z",
        place: {
          direction: "80409 Manchester Road, 7231",
          city: "Napoli",
          countryCode: "IT"
        }
      },
      {
        name: "Encuentro comunitario - igualdad de género",
        description: "Evento presencial para igualdad de género. Tristis approbo sollers. Cornu acervus pecto currus molestiae.",
        initialDate: "2026-06-24T20:57:57.238Z",
        place: {
          direction: "899 Abernathy Fall, 604",
          city: "Puebla",
          countryCode: "MX"
        }
      }
    ],
    causeId: "f70f1d8d-19b7-44c5-ad0c-9745941d1bea"
  },
  {
    _id: "0256bc44-1620-4479-9cd5-8442fdc88598",
    name: "Red de apoyo vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Commemoro tersus ustulo distinctio utroque. Laboriosam nostrum vorax ara.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:30.687Z",
    updatedAt: "2026-01-11T21:58:30.687Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 384,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 169,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 300,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - tercera edad",
        description: "Evento presencial para tercera edad. Architecto magnam eos turpis timor adfectus dignissimos debilito.",
        initialDate: "2026-03-16T21:57:57.301Z",
        place: {
          direction: "5998 Heidenreich Hollow, 719",
          city: "Mendoza",
          countryCode: "AR"
        }
      }
    ],
    causeId: "8cd4efe2-d7d7-4068-b308-235ceb1a7798"
  },
  {
    _id: "e8c2ccf8-9c77-4be2-9bf3-9bad3b1df509",
    name: "Red de apoyo alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Certe deduco acies adulescens commodi cicuta itaque.",
    status: "approved",
    reason: "",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:58:30.749Z",
    updatedAt: "2026-01-11T21:58:30.749Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 674,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - emergencias",
        description: "Evento presencial para emergencias. Suffoco appono aequus venustas. Sapiente vorago stipes ulciscor deserunt crebro quod.",
        initialDate: "2026-05-15T20:57:57.379Z",
        place: {
          direction: "7977 Lilian Stravenue, 568",
          city: "Rosario",
          countryCode: "AR"
        }
      }
    ],
    causeId: "17966f2e-bf54-47f1-b860-a8aebd129c34"
  },
  {
    _id: "28c44b1c-ed1c-4e75-9816-7b4cec3ff9f9",
    name: "Proyecto refugiados 2026",
    description: "Acción concreta para refugiados con objetivos cuantificables. Dapifer sopor balbus collum vita tum aeternus quam balbus.",
    status: "pending",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:57:57.457Z",
    updatedAt: "2026-01-11T21:57:57.457Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 180,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 163,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - pobreza",
        description: "Evento presencial para pobreza. Umerus enim ait sono commemoro curtus.",
        initialDate: "2026-05-11T20:57:57.442Z",
        place: {
          direction: "503 W Bridge Street, 6712",
          city: "Medellín",
          countryCode: "CO"
        }
      },
      {
        name: "Evento benéfico - educación",
        description: "Evento presencial para educación. Viridis spargo tendo volaticus alii adsuesco ustulo dolorum.",
        initialDate: "2026-06-18T20:57:57.442Z",
        place: {
          direction: "655 Wiza Row, 5883",
          city: "Caracas",
          countryCode: "VE"
        }
      }
    ],
    causeId: "832b5160-c556-420e-8e7c-b64e4a0bf937"
  },
  {
    _id: "552fa747-4484-4707-8208-d169cfa96e8b",
    name: "Operación pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Amor nam inventore alius uxor callide surculus.",
    status: "pending",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:57:57.519Z",
    updatedAt: "2026-01-11T21:57:57.519Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 408,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Vox sub stabilis votum ceno valde caritas aperte.",
        initialDate: "2026-04-04T20:57:57.506Z",
        place: {
          direction: "4851 W Pine Street, 166",
          city: "Cartagena",
          countryCode: "CO"
        }
      },
      {
        name: "Evento benéfico - infancia",
        description: "Evento presencial para infancia. Totidem tametsi incidunt curiositas. Crapula ceno vox depono ciminatio trepide solvo conqueror vado carus.",
        initialDate: "2026-01-24T21:57:57.506Z",
        place: {
          direction: "204 Verdie Plain, 265",
          city: "Cancún",
          countryCode: "MX"
        }
      }
    ],
    causeId: "8deed214-243c-4123-9873-c26bcc8809d8"
  },
  {
    _id: "90a2abd5-9dec-409b-bf6b-9d6124fabcb4",
    name: "Acción solidaria alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Cattus statua cupressus advenio aggero triumphus canto assumenda carcer trucido.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:30.934Z",
    updatedAt: "2026-01-11T21:58:30.934Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 374,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 235,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - vivienda",
        description: "Evento presencial para vivienda. Ustulo cruentus somniculosus stipes velit audentia. Curto contego earum curiositas verecundia audio.",
        initialDate: "2026-07-14T20:57:57.568Z",
        place: {
          direction: "28101 Batz Cape, 158",
          city: "Berlin",
          countryCode: "DE"
        }
      }
    ],
    causeId: "62e3592b-abfd-4753-91b6-63b278588ff4"
  },
  {
    _id: "27ebea4e-d867-4656-88eb-9964165b07d1",
    name: "Acción solidaria igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Utilis acervus tersus inflammatio collum quibusdam tendo subnecto et ipsa. Blanditiis vix crux degenero acquiro vix usque vinitor ",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:31.000Z",
    updatedAt: "2026-01-11T21:58:31.000Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 876,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 52,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 901,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Theologus sustineo ante bos. Curia umquam astrum trepide subnecto corrupti peior.",
        initialDate: "2026-07-06T20:57:57.630Z",
        place: {
          direction: "4153 Waters Brook, 95079",
          city: "Barranquilla",
          countryCode: "CO"
        }
      }
    ],
    causeId: "832b5160-c556-420e-8e7c-b64e4a0bf937"
  },
  {
    _id: "80d86476-efdb-4ff3-96b5-bd6ada350f77",
    name: "Movimiento medio ambiente 2027",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Tempus facere amitto calculus voco tandem tandem quas spiculum vito.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:31.187Z",
    updatedAt: "2026-01-11T21:58:31.187Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 404,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 357,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 316,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - vivienda",
        description: "Evento presencial para vivienda. Copiose suscipit amor virtus tersus. Acidus ver aro comparo ab denuo arx utique congregatio.",
        initialDate: "2026-04-15T20:57:57.830Z",
        place: {
          direction: "31334 Olga Heights, 498",
          city: "Roma",
          countryCode: "IT"
        }
      }
    ],
    causeId: "70b47bee-154f-44b1-990f-49edd0deea59"
  },
  {
    _id: "d6f1d02e-d7a0-4aff-a50d-0b1b4b5300be",
    name: "Acción solidaria discapacidad 2026",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Admoveo arbitro averto careo adopto conspergo esse color concedo altus. Averto vinco thermae sub pauper error adamo coruscus blandior cu",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:31.249Z",
    updatedAt: "2026-01-11T21:58:31.249Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 135,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - pobreza",
        description: "Evento presencial para pobreza. Ad sollicito vix dolor quisquam subvenio aperio unde. Articulus bellum deficio astrum aggero itaque veritatis decretum tabula.",
        initialDate: "2026-02-26T21:57:57.892Z",
        place: {
          direction: "8482 Chapel Street, 8350",
          city: "Toulouse",
          countryCode: "FR"
        }
      }
    ],
    causeId: "38cac9d8-00ab-4daa-9ec2-2ba94bb7d3cf"
  },
  {
    _id: "68f85ad6-df45-4f04-80fb-e623a34911e5",
    name: "Iniciativa discapacidad 2026",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Aeger custodia argumentum thema administratio.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:31.377Z",
    updatedAt: "2026-01-11T21:58:31.377Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 329,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 839,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 423,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - agua potable",
        description: "Evento presencial para agua potable. Vinco confugo cribro aeternus appono. Compello tam volubilis curvo voluptatem.",
        initialDate: "2026-05-04T20:57:58.016Z",
        place: {
          direction: "79604 Oxford Road, 830",
          city: "León",
          countryCode: "MX"
        }
      },
      {
        name: "Encuentro comunitario - educación",
        description: "Evento presencial para educación. Vallum thalassinus demonstro accedo.",
        initialDate: "2026-07-14T20:57:58.017Z",
        place: {
          direction: "5359 Borer Walks, 2401",
          city: "Salvador",
          countryCode: "BR"
        }
      }
    ],
    causeId: "2bb53149-695b-4930-b50d-9ed9f4511cc8"
  },
  {
    _id: "66f86586-0f3f-48cf-823d-ac9524934992",
    name: "Iniciativa medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Constans auxilium vero valetudo. Asper cornu ago pax.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:31.446Z",
    updatedAt: "2026-01-11T21:58:31.446Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 282,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - refugiados",
        description: "Evento presencial para refugiados. Contego concido aegre animus tribuo tardus tam sub. Quasi cenaculum adipisci tumultus eum taedium.",
        initialDate: "2026-04-07T20:57:58.079Z",
        place: {
          direction: "964 W Maple Street, 43744",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "017d3208-aa1c-4e89-834c-0de8cdb77ebc"
  },
  {
    _id: "737601d6-7532-4cc9-82c4-59718d8ff2de",
    name: "Programa tercera edad 2026",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Cetera surgo taedium. Credo ventosus calamitas verecundia apparatus voco.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:31.517Z",
    updatedAt: "2026-01-11T21:58:31.517Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 637,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - agua potable",
        description: "Evento presencial para agua potable. Conculco triduana taedium aperte tunc. Derelinquo totidem conicio consequatur dolorem ipsum amicitia sub usitas.",
        initialDate: "2026-06-22T20:57:58.141Z",
        place: {
          direction: "34449 Serenity Forges, 648",
          city: "León",
          countryCode: "MX"
        }
      }
    ],
    causeId: "040745db-9eaa-448d-b9fa-dbbb34444aa9"
  },
  {
    _id: "e5654e6d-b4c5-4b0b-9a74-c9d1cdc85098",
    name: "Campaña discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Quidem terror depromo unde defleo aequus theologus molestiae ceno. Pauci cogito caelum triumphus dolore minima laudantium.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:31.579Z",
    updatedAt: "2026-01-11T21:58:31.579Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 929,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 661,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Supplanto coruscus cupio defendo ducimus inflammatio undique claro volutabrum.",
        initialDate: "2026-03-04T21:57:58.203Z",
        place: {
          direction: "4431 Sterling Oval, 4892",
          city: "Maracaibo",
          countryCode: "VE"
        }
      },
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Ventosus adhuc cubicularis antiquus necessitatibus sequi quibusdam vestigium.",
        initialDate: "2026-01-23T21:57:58.203Z",
        place: {
          direction: "7152 Taylor Keys, 5553",
          city: "Monterrey",
          countryCode: "MX"
        }
      }
    ],
    causeId: "6d0c3bf3-9c2c-4dfb-9e08-dc685e4057b1"
  },
  {
    _id: "8f0ab969-dfd8-4268-b275-07c02e9314dd",
    name: "Iniciativa desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Nisi odio claro repellendus circumvenio aperio blandior occaecati. Clementia claustrum aranea statim supplanto cohors.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:31.641Z",
    updatedAt: "2026-01-11T21:58:31.641Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 922,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 272,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - refugiados",
        description: "Evento presencial para refugiados. Conforto umquam statua. Temporibus itaque explicabo contabesco validus cur est earum vomito.",
        initialDate: "2026-02-03T21:57:58.266Z",
        place: {
          direction: "4769 Armstrong Rest, 1038",
          city: "Barcelona",
          countryCode: "ES"
        }
      },
      {
        name: "Actividad de voluntariado - salud",
        description: "Evento presencial para salud. Coniecto vix vulgo consequuntur repudiandae claudeo aetas. Acervus deporto bene coaegresco facilis commodo uter peccatus.",
        initialDate: "2026-02-04T21:57:58.266Z",
        place: {
          direction: "899 Olson Glen, 5086",
          city: "Maracay",
          countryCode: "VE"
        }
      }
    ],
    causeId: "35fce5d7-da0b-43fa-8bb7-a2786eb71046"
  },
  {
    _id: "e084d896-2511-4c06-9525-91f483c3d0c1",
    name: "Acción solidaria emergencias 2027",
    description: "Acción concreta para emergencias con objetivos cuantificables. Utpote arma sono curo color hic cognatus thesis ascisco.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:58:31.826Z",
    updatedAt: "2026-01-11T21:58:31.826Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 51,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 173,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - medio ambiente",
        description: "Evento presencial para medio ambiente. Comes venio surgo animadverto bellum adhuc dolorum corona vinitor. Officiis amiculum paulatim cultura.",
        initialDate: "2026-03-05T21:57:58.452Z",
        place: {
          direction: "311 Wood Street, 780",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "166f4fd8-8e58-4773-8567-41195e1dfbb3"
  },
  {
    _id: "6803be46-b1ea-441e-aeb1-8a2fe3b16b81",
    name: "Movimiento desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Utroque sublime aequus minima pecus.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:31.889Z",
    updatedAt: "2026-01-11T21:58:31.889Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 366,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 980,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Cohaero centum ocer antiquus tabula quidem abeo voro tres. Civitas trado color dedico subnecto utilis vesco adicio terror.",
        initialDate: "2026-06-27T20:57:58.515Z",
        place: {
          direction: "51322 Stroman Skyway, 648",
          city: "Puebla",
          countryCode: "MX"
        }
      }
    ],
    causeId: "e2e8c24d-1985-460e-86d0-07a94b21ef3e"
  },
  {
    _id: "174a4264-e07e-49a1-b17b-456ddea6c25c",
    name: "Acción solidaria educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Tripudio defungo corrumpo carmen.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:58:31.952Z",
    updatedAt: "2026-01-11T21:58:31.952Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 494,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 358,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - educación",
        description: "Evento presencial para educación. Dolore centum defessus suspendo corrigo thema ad canonicus peccatus ademptio.",
        initialDate: "2026-06-17T20:57:58.578Z",
        place: {
          direction: "33701 White Mills, 243",
          city: "Concepción",
          countryCode: "CL"
        }
      },
      {
        name: "Reunión de coordinación - medio ambiente",
        description: "Evento presencial para medio ambiente. Creta auditor corroboro abbas tutis suspendo. Volva chirographum provident odit defendo stultus ultio.",
        initialDate: "2026-01-31T21:57:58.578Z",
        place: {
          direction: "8138 Belmont Road, 54059",
          city: "Salvador",
          countryCode: "BR"
        }
      }
    ],
    causeId: "8ed57a88-b492-4364-ab6f-cd7cf9b588c6"
  },
  {
    _id: "62dc710b-b520-484e-8f88-ba92291ead41",
    name: "Operación alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Deinde solitudo voluptate video pariatur adhaero deduco argentum spes.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:32.014Z",
    updatedAt: "2026-01-11T21:58:32.014Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 35,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 958,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 598,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - igualdad de género",
        description: "Evento presencial para igualdad de género. Eos tamisium laudantium ambulo uberrime ambitus crudelis eius. Defendo celer adamo.",
        initialDate: "2026-05-15T20:57:58.639Z",
        place: {
          direction: "30107 Sandy Lane, 8474",
          city: "Birmingham",
          countryCode: "GB"
        }
      }
    ],
    causeId: "70b47bee-154f-44b1-990f-49edd0deea59"
  },
  {
    _id: "9ffc145b-f837-411f-bae0-39f2d410a7e8",
    name: "Operación derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Vorax doloribus temeritas sordeo. Vulpes tonsor solvo acidus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:32.076Z",
    updatedAt: "2026-01-11T21:58:32.076Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 451,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - discapacidad",
        description: "Evento presencial para discapacidad. Delectatio corroboro crepusculum dolores conforto appello quibusdam.",
        initialDate: "2026-05-10T20:57:58.701Z",
        place: {
          direction: "251 W 10th Street, 662",
          city: "Venezia",
          countryCode: "IT"
        }
      },
      {
        name: "Encuentro comunitario - infancia",
        description: "Evento presencial para infancia. Placeat viscus casso celo theca utrum cibus perferendis claudeo adhaero.",
        initialDate: "2026-04-14T20:57:58.701Z",
        place: {
          direction: "947 Bauch Green, 833",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      }
    ],
    causeId: "8deed214-243c-4123-9873-c26bcc8809d8"
  },
  {
    _id: "cdbc48ba-df98-423f-aa37-a206f5c7b65e",
    name: "Programa pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Contabesco via talio canto vehemens. Beatus officiis auctor.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:32.138Z",
    updatedAt: "2026-01-11T21:58:32.138Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 14,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 202,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 620,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - pobreza",
        description: "Evento presencial para pobreza. Acceptus chirographum inventore ventosus conculco tristis ulterius neque stabilis.",
        initialDate: "2026-04-10T20:57:58.763Z",
        place: {
          direction: "863 S 1st Street, 66163",
          city: "Antofagasta",
          countryCode: "CL"
        }
      }
    ],
    causeId: "b4d89350-9c25-4c53-82f0-9a2f7d07902e"
  },
  {
    _id: "9920351d-454c-407d-8fb9-20e6b4a444e6",
    name: "Acción solidaria refugiados 2026",
    description: "Acción concreta para refugiados con objetivos cuantificables. Carbo custodia caute tenuis.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:32.200Z",
    updatedAt: "2026-01-11T21:58:32.200Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 469,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 804,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 905,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - medio ambiente",
        description: "Evento presencial para medio ambiente. Tener aeternus umquam ait basium tamen curto.",
        initialDate: "2026-03-02T21:57:58.838Z",
        place: {
          direction: "9568 Alessandro Mall, 529",
          city: "Bristol",
          countryCode: "GB"
        }
      },
      {
        name: "Reunión de coordinación - pobreza",
        description: "Evento presencial para pobreza. Sub compono est libero talis verbum cito doloribus celo accusator. Sunt triduana antiquus totus venustas curso.",
        initialDate: "2026-05-23T20:57:58.838Z",
        place: {
          direction: "809 Purdy Fields, 30483",
          city: "Rio de Janeiro",
          countryCode: "BR"
        }
      }
    ],
    causeId: "a08e4b0e-a54d-400d-b652-5d7691a32257"
  },
  {
    _id: "bbc514a3-750f-4196-abdd-073776fe5684",
    name: "Movimiento medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Comedo culpo civis abscido vita ater aspernatur tepesco. Cuius utroque suus condico attollo tabesco acidus.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:32.263Z",
    updatedAt: "2026-01-11T21:58:32.263Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 991,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 768,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 37,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - agua potable",
        description: "Evento presencial para agua potable. Tracto vorax suppono ambulo. Uberrime tardus vulpes teneo contra.",
        initialDate: "2026-03-31T20:57:58.901Z",
        place: {
          direction: "36655 Lincoln Spring, 932",
          city: "Paris",
          countryCode: "FR"
        }
      }
    ],
    causeId: "3f1c2650-8608-4f67-9b8c-454addeeb255"
  },
  {
    _id: "36cad557-5a8c-4874-a367-2015d311c43f",
    name: "Iniciativa salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Depereo debeo nemo vomer turbo cohors alias verus capto vivo.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:32.390Z",
    updatedAt: "2026-01-11T21:58:32.390Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 621,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 183,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 675,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Uterque vicinus cariosus tergeo molestias vomer.",
        initialDate: "2026-01-22T21:57:59.028Z",
        place: {
          direction: "8449 Poplar Road, 5488",
          city: "Arequipa",
          countryCode: "PE"
        }
      }
    ],
    causeId: "0d8d9f00-7059-4cdc-a28d-188382cff2e5"
  },
  {
    _id: "fa7378a8-cece-4ce3-9730-da5c59468136",
    name: "Campaña salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Sufficio vigor spectaculum aestus dolor.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:32.451Z",
    updatedAt: "2026-01-11T21:58:32.451Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 384,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - derechos humanos",
        description: "Evento presencial para derechos humanos. Dolore audio ceno. Conscendo tempore eaque voro censura urbanus deorsum usitas excepturi sono.",
        initialDate: "2026-03-16T21:57:59.091Z",
        place: {
          direction: "277 Carson Park, 571",
          city: "Valparaíso",
          countryCode: "CL"
        }
      },
      {
        name: "Evento benéfico - igualdad de género",
        description: "Evento presencial para igualdad de género. Curo casso cetera umerus.",
        initialDate: "2026-05-02T20:57:59.091Z",
        place: {
          direction: "637 Stacey Place, 5003",
          city: "Brasília",
          countryCode: "BR"
        }
      }
    ],
    causeId: "d571ef73-ae41-43a0-aa8e-5e4409c504a1"
  },
  {
    _id: "f809d5af-ab46-4b6e-a39b-9ca4bbe67fc1",
    name: "Iniciativa pobreza 2027",
    description: "Acción concreta para pobreza con objetivos cuantificables. Solus temperantia error crur.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:32.513Z",
    updatedAt: "2026-01-11T21:58:32.513Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 957,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 362,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 826,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - tercera edad",
        description: "Evento presencial para tercera edad. Caveo adeo thymum vado tot sumptus tergum torqueo stillicidium.",
        initialDate: "2026-04-25T20:57:59.151Z",
        place: {
          direction: "42483 Leffler Centers, 7818",
          city: "Bristol",
          countryCode: "GB"
        }
      },
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Tametsi labore quam atrox. Antea spargo vomer.",
        initialDate: "2026-05-27T20:57:59.152Z",
        place: {
          direction: "73519 Blanda Viaduct, 359",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "e96653ef-a46c-419b-87ce-6775ac7cffc0"
  },
  {
    _id: "35b6e67c-9336-4dea-bcbf-40968a08ee1c",
    name: "Operación emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Vito vestrum delinquo arceo conservo cumque urbanus. Angelus curia astrum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:32.573Z",
    updatedAt: "2026-01-11T21:58:32.573Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 82,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 125,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - vivienda",
        description: "Evento presencial para vivienda. Decerno charisma conforto acies explicabo.",
        initialDate: "2026-01-26T21:57:59.213Z",
        place: {
          direction: "9549 Krystina Ferry, 2369",
          city: "Maracay",
          countryCode: "VE"
        }
      },
      {
        name: "Encuentro comunitario - discapacidad",
        description: "Evento presencial para discapacidad. Vilis thesaurus amet trans tametsi vel temperantia sit.",
        initialDate: "2026-01-23T21:57:59.214Z",
        place: {
          direction: "6636 Spring Street, 57190",
          city: "Ciudad de México",
          countryCode: "MX"
        }
      }
    ],
    causeId: "a7595e89-29f9-44cb-8611-17a12344a6b7"
  },
  {
    _id: "16c86911-736b-47ad-91b4-608601464ef5",
    name: "Campaña alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Aliquam desolo colligo triumphus ultra. Surculus viridis carpo aequitas peccatus curto astrum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:58:32.635Z",
    updatedAt: "2026-01-11T21:58:32.635Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 248,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Accusantium vindico solitudo. Conculco trans arcus defetiscor.",
        initialDate: "2026-06-18T20:57:59.275Z",
        place: {
          direction: "95739 Finn Rue, 6123",
          city: "Santiago",
          countryCode: "CL"
        }
      },
      {
        name: "Actividad de voluntariado - derechos humanos",
        description: "Evento presencial para derechos humanos. Temperantia textor caecus tempora summopere astrum tantillus tabgo absconditus consequatur.",
        initialDate: "2026-03-13T21:57:59.275Z",
        place: {
          direction: "4221 Dorian Tunnel, 554",
          city: "Medellín",
          countryCode: "CO"
        }
      }
    ],
    causeId: "75df7309-beae-4ce2-aeb7-d32e7b155998"
  },
  {
    _id: "42491e4d-8236-4129-b519-025f4a30a244",
    name: "Acción solidaria agua potable 2027",
    description: "Acción concreta para agua potable con objetivos cuantificables. Voluptas fuga paens esse copiose consequuntur delego tot canonicus. Ulciscor demo confero virtus assumenda est calcar curo temptatio aen",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:32.759Z",
    updatedAt: "2026-01-11T21:58:32.759Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 954,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Vereor delectatio terror verumtamen votum. Laudantium aufero strenuus statim arcesso acervus decet aeneus animi.",
        initialDate: "2026-05-25T20:57:59.400Z",
        place: {
          direction: "7270 Wolf Pine, 325",
          city: "Toulouse",
          countryCode: "FR"
        }
      }
    ],
    causeId: "ca04471c-dece-41cc-979e-8743be3796a8"
  },
  {
    _id: "de211e59-7384-4620-8661-b665316961d4",
    name: "Programa salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Nisi carcer adnuo alii quaerat ara absque vestigium cavus.",
    status: "approved",
    reason: "",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:58:32.822Z",
    updatedAt: "2026-01-11T21:58:32.822Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 846,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 494,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 33,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - emergencias",
        description: "Evento presencial para emergencias. Est causa nihil civitas pauci timor pauci.",
        initialDate: "2026-06-12T20:57:59.462Z",
        place: {
          direction: "323 Crown Street, 99758",
          city: "Sevilla",
          countryCode: "ES"
        }
      }
    ],
    causeId: "75df7309-beae-4ce2-aeb7-d32e7b155998"
  },
  {
    _id: "af95c8f9-925e-4b16-8fd6-ad3bc6503b98",
    name: "Jornada agua potable 2027",
    description: "Acción concreta para agua potable con objetivos cuantificables. Spargo cursim dolores aestus deprecator demitto. Antepono commemoro tyrannus caterva conculco defero sustineo paens aer patior.",
    status: "pending",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:57:59.538Z",
    updatedAt: "2026-01-11T21:57:59.538Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 969,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - educación",
        description: "Evento presencial para educación. Tabella bellum peior nesciunt impedit comptus nemo.",
        initialDate: "2026-01-20T21:57:59.524Z",
        place: {
          direction: "40970 North Lane, 616",
          city: "Paris",
          countryCode: "FR"
        }
      }
    ],
    causeId: "dd85c58b-1fec-4fa2-8023-3da90eb5bc6c"
  },
  {
    _id: "c9574c21-8385-4912-8567-d836ea04b8ac",
    name: "Jornada refugiados 2027",
    description: "Acción concreta para refugiados con objetivos cuantificables. Velut custodia constans sapiente defaeco crapula suspendo. Officia vulgaris aliquid attero tabernus tonsor vetus suffragium.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:32.946Z",
    updatedAt: "2026-01-11T21:58:32.946Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 10,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 67,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Sumptus perspiciatis delibero in vinitor amet communis cenaculum suffoco. Succurro degenero dedico terminatio.",
        initialDate: "2026-07-17T20:57:59.588Z",
        place: {
          direction: "80420 Jewell Trace, 900",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      }
    ],
    causeId: "b936ac6d-412f-4721-89eb-e0df728e483d"
  },
  {
    _id: "9eaa2116-e0fa-48c5-8a99-0b3f08fc77f3",
    name: "Programa educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Tempus ullam cotidie crebro. Sunt templum urbs eveniet somnus sumptus.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:33.007Z",
    updatedAt: "2026-01-11T21:58:33.007Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 63,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - pobreza",
        description: "Evento presencial para pobreza. Varius vigilo ambitus.",
        initialDate: "2026-06-27T20:57:59.649Z",
        place: {
          direction: "167 Woodland Close, 32133",
          city: "Barcelona",
          countryCode: "ES"
        }
      }
    ],
    causeId: "26557700-53e1-4454-a7e8-c4bf8bac28b6"
  },
  {
    _id: "cdc294d7-2140-4814-a2d9-d1114f072fce",
    name: "Campaña desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Cibus denuo balbus acerbitas curatio reprehenderit depopulo adsum patior. Cognomen depulso quidem consuasor minima voluntarius ",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:33.069Z",
    updatedAt: "2026-01-11T21:58:33.069Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 834,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 244,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - infancia",
        description: "Evento presencial para infancia. Atqui cohaero doloribus vociferor.",
        initialDate: "2026-07-10T20:57:59.711Z",
        place: {
          direction: "121 Ciara Courts, 5179",
          city: "Edinburgh",
          countryCode: "GB"
        }
      },
      {
        name: "Actividad de voluntariado - vivienda",
        description: "Evento presencial para vivienda. Adiuvo vomica torqueo debeo solum communis universe damnatio.",
        initialDate: "2026-07-02T20:57:59.711Z",
        place: {
          direction: "704 Serenity Landing, 522",
          city: "Fortaleza",
          countryCode: "BR"
        }
      }
    ],
    causeId: "8cd4efe2-d7d7-4068-b308-235ceb1a7798"
  },
  {
    _id: "7196387a-e104-4f2e-b85c-2b9a9d4d91f4",
    name: "Programa igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Vomer comes adsidue vulgus vespillo ultio sufficio collum virgo armarium. Tabella suscipio vapulus crux turba.",
    status: "pending",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:57:59.787Z",
    updatedAt: "2026-01-11T21:57:59.787Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 225,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 478,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - igualdad de género",
        description: "Evento presencial para igualdad de género. Decerno ex cado virtus attonbitus. Perspiciatis solio nihil coma thymum amita ultio.",
        initialDate: "2026-07-04T20:57:59.773Z",
        place: {
          direction: "95114 Donnelly Lodge, 235",
          city: "Rosario",
          countryCode: "AR"
        }
      },
      {
        name: "Actividad de voluntariado - derechos humanos",
        description: "Evento presencial para derechos humanos. Reprehenderit tamquam tempus arbor rem iusto tepesco.",
        initialDate: "2026-03-05T21:57:59.773Z",
        place: {
          direction: "455 Blick Street, 902",
          city: "Birmingham",
          countryCode: "GB"
        }
      }
    ],
    causeId: "679524e3-79ea-4cea-814c-6140d1fa624b"
  },
  {
    _id: "ee4fb827-4f1a-4b44-8711-4eee1291e27e",
    name: "Acción solidaria vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Deputo aeneus totus curia conforto cupio. Ulciscor natus una dolor alo volaticus conitor vita velociter conqueror.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:33.194Z",
    updatedAt: "2026-01-11T21:58:33.194Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 787,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - infancia",
        description: "Evento presencial para infancia. Auditor repudiandae sodalitas cui demergo theca bellicus tondeo. Arcus titulus attero umerus termes tergum vito auctus virgo curo.",
        initialDate: "2026-02-20T21:57:59.835Z",
        place: {
          direction: "5020 Henry Villages, 6805",
          city: "Hamburg",
          countryCode: "DE"
        }
      },
      {
        name: "Encuentro comunitario - infancia",
        description: "Evento presencial para infancia. Spectaculum theca trado placeat. Adiuvo sapiente expedita viduo crebro valetudo temporibus alo facere casso.",
        initialDate: "2026-07-11T20:57:59.836Z",
        place: {
          direction: "256 Ronaldo Manors, 404",
          city: "Dresden",
          countryCode: "DE"
        }
      }
    ],
    causeId: "c96f87e1-26c3-4925-94f8-538145cbc249"
  },
  {
    _id: "5f9b57b0-972c-4a79-a486-e7a57fc45796",
    name: "Proyecto igualdad de género 2027",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Deporto arma appono anser trucido. Amplus absconditus territo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:33.381Z",
    updatedAt: "2026-01-11T21:58:33.381Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 288,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 942,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - refugiados",
        description: "Evento presencial para refugiados. Suffragium reprehenderit voluptates. Cattus creo comedo adfero brevis.",
        initialDate: "2026-04-21T20:58:00.024Z",
        place: {
          direction: "1209 Collier Branch, 22287",
          city: "Milano",
          countryCode: "IT"
        }
      },
      {
        name: "Evento benéfico - alimentación",
        description: "Evento presencial para alimentación. Ademptio calculus credo arguo tabella reprehenderit patrocinor in theologus. Adaugeo doloremque asporto caelum.",
        initialDate: "2026-04-19T20:58:00.024Z",
        place: {
          direction: "921 Nightingale Close, 677",
          city: "Salvador",
          countryCode: "BR"
        }
      }
    ],
    causeId: "e49ea717-bdfb-4020-8f5f-7a4be362f9cd"
  },
  {
    _id: "b0a7a7df-4764-4072-bd9c-6597b2d171ee",
    name: "Iniciativa infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Facilis cum desidero autus infit exercitationem dignissimos.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:33.444Z",
    updatedAt: "2026-01-11T21:58:33.444Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 493,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 826,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 69,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - igualdad de género",
        description: "Evento presencial para igualdad de género. Advenio tollo sperno rem ara.",
        initialDate: "2026-07-08T20:58:00.086Z",
        place: {
          direction: "4099 Blanda Manor, 886",
          city: "Lille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "2e38834b-dd6f-4170-afce-c57d59212223"
  },
  {
    _id: "5b397b9d-6665-4a2d-a565-9c779462c115",
    name: "Jornada infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Traho caritas aegrotatio veniam degenero decerno. Aer aduro causa absorbeo deprecator deporto demergo audio terreo.",
    status: "pending",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:00.161Z",
    updatedAt: "2026-01-11T21:58:00.161Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 900,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - agua potable",
        description: "Evento presencial para agua potable. Cimentarius ullus excepturi textor. Beneficium solutio cuppedia veniam.",
        initialDate: "2026-05-30T20:58:00.148Z",
        place: {
          direction: "3461 Bailey Terrace, 2558",
          city: "Stuttgart",
          countryCode: "DE"
        }
      }
    ],
    causeId: "76869ea9-14bc-446d-84d6-03cf9cb4cf2f"
  },
  {
    _id: "987995b3-5368-41bc-80c6-6dc5ebb22a61",
    name: "Campaña desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Animus defleo ducimus adicio deorsum adfectus auditor deleniti commemoro custodia. Animi tendo veritas possimus asporto aureus ",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:33.568Z",
    updatedAt: "2026-01-11T21:58:33.568Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 213,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 409,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 668,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - igualdad de género",
        description: "Evento presencial para igualdad de género. Succedo nemo neque patria. Vinitor callide trucido.",
        initialDate: "2026-03-27T21:58:00.210Z",
        place: {
          direction: "2792 Cross Lane, 961",
          city: "Paris",
          countryCode: "FR"
        }
      }
    ],
    causeId: "a7595e89-29f9-44cb-8611-17a12344a6b7"
  },
  {
    _id: "d9157aa2-2350-418f-b22b-d48d9521cfc9",
    name: "Jornada infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Sumo tyrannus venia curvo theatrum credo aetas adduco. Vulgaris tot vestigium.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:33.631Z",
    updatedAt: "2026-01-11T21:58:33.631Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 687,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 479,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Vorax studio teres.",
        initialDate: "2026-07-01T20:58:00.272Z",
        place: {
          direction: "668 The Limes, 176",
          city: "Medellín",
          countryCode: "CO"
        }
      },
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Vobis quisquam truculenter curriculum.",
        initialDate: "2026-02-08T21:58:00.272Z",
        place: {
          direction: "92256 Quarry Lane, 5358",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "b8e47d09-fe0b-4d3a-b8e2-07f8c7f10003"
  },
  {
    _id: "7be93bc8-16a9-4299-b484-974caf0ea563",
    name: "Jornada derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Consequatur utrum spectaculum triumphus arma. Temperantia virtus quas.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:33.694Z",
    updatedAt: "2026-01-11T21:58:33.694Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 484,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 940,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 599,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - alimentación",
        description: "Evento presencial para alimentación. Vomer derideo adopto. Fugiat articulus stultus adhaero absorbeo apostolus adsum deputo depulso.",
        initialDate: "2026-01-31T21:58:00.334Z",
        place: {
          direction: "705 Citlalli Circles, 515",
          city: "Nice",
          countryCode: "FR"
        }
      },
      {
        name: "Jornada solidaria - emergencias",
        description: "Evento presencial para emergencias. Succedo strenuus constans verecundia pel.",
        initialDate: "2026-05-29T20:58:00.334Z",
        place: {
          direction: "57976 Greenholt Crest, 122",
          city: "Chiclayo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "ae3eb1ec-3e16-4835-a8c9-06df78246056"
  },
  {
    _id: "072da5f1-5911-4c33-987e-2ca42d533db3",
    name: "Red de apoyo tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Terebro officia ventus reiciendis advenio nesciunt valeo voveo.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:58:33.754Z",
    updatedAt: "2026-01-11T21:58:33.754Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 842,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Pariatur barba vivo numquam. Textor crux aranea sperno sulum decor.",
        initialDate: "2026-06-11T20:58:00.396Z",
        place: {
          direction: "757 N Front Street, 9000",
          city: "Lima",
          countryCode: "PE"
        }
      }
    ],
    causeId: "41a0f8da-010e-4843-99fc-3a96bcc1d1d3"
  },
  {
    _id: "efb1dc90-9fde-45b7-b531-fa949e9883e0",
    name: "Movimiento pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Clementia textus doloribus adsum.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:33.880Z",
    updatedAt: "2026-01-11T21:58:33.880Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 397,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 410,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 302,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - refugiados",
        description: "Evento presencial para refugiados. Cruentus maiores aggredior vitium cumque tui tamisium depulso aufero acidus.",
        initialDate: "2026-02-21T21:58:00.522Z",
        place: {
          direction: "7692 Conroy Mountain, 89028",
          city: "Zaragoza",
          countryCode: "ES"
        }
      }
    ],
    causeId: "8deed214-243c-4123-9873-c26bcc8809d8"
  },
  {
    _id: "41d6d954-9a7d-4a4a-896d-43e721170430",
    name: "Iniciativa desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Eum conduco vado bonus cubicularis cedo condico vulgivagus libero.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:33.942Z",
    updatedAt: "2026-01-11T21:58:33.942Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 485,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 719,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 819,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - tercera edad",
        description: "Evento presencial para tercera edad. Deleniti amita voco synagoga temporibus credo quas. Ars vitiosus tabernus.",
        initialDate: "2026-04-27T20:58:00.583Z",
        place: {
          direction: "434 Felicia Vista, 92630",
          city: "Barranquilla",
          countryCode: "CO"
        }
      },
      {
        name: "Actividad de voluntariado - medio ambiente",
        description: "Evento presencial para medio ambiente. Beatae vinum nisi cognatus velit tollo.",
        initialDate: "2026-04-11T20:58:00.584Z",
        place: {
          direction: "607 Franco Flats, 4423",
          city: "Puebla",
          countryCode: "MX"
        }
      }
    ],
    causeId: "0d8d9f00-7059-4cdc-a28d-188382cff2e5"
  },
  {
    _id: "ecad6004-dd5a-4074-80ca-cec58fdf8392",
    name: "Movimiento pobreza 2027",
    description: "Acción concreta para pobreza con objetivos cuantificables. Catena tenax corona sublime denuo harum tergiversatio.",
    status: "approved",
    reason: "",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:58:34.128Z",
    updatedAt: "2026-01-11T21:58:34.128Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 585,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - tercera edad",
        description: "Evento presencial para tercera edad. Careo ipsum culpo stella.",
        initialDate: "2026-04-17T20:58:00.773Z",
        place: {
          direction: "53140 Lawrence Street, 45493",
          city: "Málaga",
          countryCode: "ES"
        }
      }
    ],
    causeId: "6a4c5934-d75f-4e22-915a-284b43962916"
  },
  {
    _id: "d4c6d944-1d48-405a-b3cb-40f47b5b1dcc",
    name: "Red de apoyo emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Vespillo tabesco viridis ea possimus quibusdam tempora clarus doloribus.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:34.189Z",
    updatedAt: "2026-01-11T21:58:34.189Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 129,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - agua potable",
        description: "Evento presencial para agua potable. Nostrum victus quas solio creptio laudantium accommodo thymbra asporto.",
        initialDate: "2026-04-19T20:58:00.835Z",
        place: {
          direction: "759 S Bridge Street, 14306",
          city: "Brasília",
          countryCode: "BR"
        }
      }
    ],
    causeId: "e00c1a10-c59e-4640-9261-245bbbb55a95"
  },
  {
    _id: "4b49dfca-f1ba-4f21-a521-353e265d6db6",
    name: "Acción solidaria vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Hic despecto aufero molestiae amitto aiunt.",
    status: "approved",
    reason: "",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:58:34.251Z",
    updatedAt: "2026-01-11T21:58:34.251Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 92,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 699,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 385,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - vivienda",
        description: "Evento presencial para vivienda. Arbitro apud deduco clam validus.",
        initialDate: "2026-05-04T20:58:00.897Z",
        place: {
          direction: "2354 Bauch Trail, 90307",
          city: "Rosario",
          countryCode: "AR"
        }
      },
      {
        name: "Taller formativo - discapacidad",
        description: "Evento presencial para discapacidad. Charisma id cubicularis abstergo trepide.",
        initialDate: "2026-06-21T20:58:00.897Z",
        place: {
          direction: "6576 Dewayne Extensions, 781",
          city: "Salvador",
          countryCode: "BR"
        }
      }
    ],
    causeId: "17966f2e-bf54-47f1-b860-a8aebd129c34"
  },
  {
    _id: "d0fb0d3d-9a62-4b6b-a25c-97e547cc4864",
    name: "Red de apoyo alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Depromo surculus versus ventito harum pauci coerceo itaque aedificium talis. Aetas aperiam civitas.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:34.313Z",
    updatedAt: "2026-01-11T21:58:34.313Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 551,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - vivienda",
        description: "Evento presencial para vivienda. Certe sit sufficio. Tibi aqua nisi virgo viduo cohors.",
        initialDate: "2026-02-17T21:58:00.960Z",
        place: {
          direction: "222 W Oak Street, 6710",
          city: "Córdoba",
          countryCode: "AR"
        }
      }
    ],
    causeId: "88f95c48-a972-47fb-b6c8-e7cc9fa074a6"
  },
  {
    _id: "aa923394-dc06-4b01-8ab1-eebfa140ece2",
    name: "Jornada agua potable 2026",
    description: "Acción concreta para agua potable con objetivos cuantificables. Iure subvenio tum crux adnuo urbanus ocer facilis facilis conqueror.",
    status: "pending",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:01.098Z",
    updatedAt: "2026-01-11T21:58:01.098Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 579,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 192,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 825,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Chirographum cariosus atavus sollicito. Ars adnuo viscus tergum adfectus ascisco cavus testimonium nemo vos.",
        initialDate: "2026-02-23T21:58:01.084Z",
        place: {
          direction: "597 Veronica Course, 9387",
          city: "São Paulo",
          countryCode: "BR"
        }
      },
      {
        name: "Actividad de voluntariado - vivienda",
        description: "Evento presencial para vivienda. Triumphus ventito argumentum speculum apparatus voluptates.",
        initialDate: "2026-03-04T21:58:01.084Z",
        place: {
          direction: "682 Quinton Ville, 1432",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "c1da8a58-c13a-43a7-bd97-935656227b98"
  },
  {
    _id: "bdae0285-fa40-487f-8a7f-266b77390b0a",
    name: "Red de apoyo infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Valetudo deporto conculco umerus necessitatibus.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:34.502Z",
    updatedAt: "2026-01-11T21:58:34.502Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 801,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - tercera edad",
        description: "Evento presencial para tercera edad. Doloremque dignissimos vallum statua umerus tenax apto.",
        initialDate: "2026-04-01T20:58:01.146Z",
        place: {
          direction: "790 Daugherty Union, 9320",
          city: "Stuttgart",
          countryCode: "DE"
        }
      },
      {
        name: "Actividad de voluntariado - agua potable",
        description: "Evento presencial para agua potable. Bardus accusamus articulus vitiosus concido aggredior dolor cinis. Peccatus illo veritas corona validus ultra comprehendo suus verbum vero.",
        initialDate: "2026-06-13T20:58:01.146Z",
        place: {
          direction: "698 Alize Knoll, 78241",
          city: "Bucaramanga",
          countryCode: "CO"
        }
      }
    ],
    causeId: "46a08711-cef4-4ede-acf4-606a5442b200"
  },
  {
    _id: "53648709-0ea4-49d6-984d-889648aca58e",
    name: "Red de apoyo derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Ago earum optio talis autus. Voluptatum pauci taceo corrupti amicitia.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:34.630Z",
    updatedAt: "2026-01-11T21:58:34.630Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 554,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 324,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Voluptatibus eos coepi paens demulceo validus praesentium cogo.",
        initialDate: "2026-03-18T21:58:01.286Z",
        place: {
          direction: "10224 Kamryn Crossing, 313",
          city: "Edinburgh",
          countryCode: "GB"
        }
      }
    ],
    causeId: "e513250c-2418-426e-814c-26e3a2bf79e5"
  },
  {
    _id: "cc61ed38-5605-475d-8f9c-e7c0c96473b2",
    name: "Proyecto desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Appono stillicidium non.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:34.708Z",
    updatedAt: "2026-01-11T21:58:34.708Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 855,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 715,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 419,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - educación",
        description: "Evento presencial para educación. Et aliquid conicio carus unus colo.",
        initialDate: "2026-04-17T20:58:01.348Z",
        place: {
          direction: "924 Camille Spring, 147",
          city: "Roma",
          countryCode: "IT"
        }
      },
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Angustus viduo catena auxilium verbera crebro crastinus tubineus. Volubilis ambitus odit confido deporto tres velum.",
        initialDate: "2026-07-07T20:58:01.348Z",
        place: {
          direction: "6776 Claude Harbors, 5605",
          city: "Torino",
          countryCode: "IT"
        }
      }
    ],
    causeId: "2bb53149-695b-4930-b50d-9ed9f4511cc8"
  },
  {
    _id: "4af61630-677c-45e0-9d11-89071d8eec71",
    name: "Proyecto vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Aufero appello tumultus ars.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:58:34.769Z",
    updatedAt: "2026-01-11T21:58:34.769Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 397,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 686,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Cupio distinctio copiose temporibus atqui conforto placeat vorago arx.",
        initialDate: "2026-07-01T20:58:01.410Z",
        place: {
          direction: "94945 Lind Extension, 278",
          city: "Mar del Plata",
          countryCode: "AR"
        }
      },
      {
        name: "Jornada solidaria - alimentación",
        description: "Evento presencial para alimentación. Vulgivagus angelus nihil repellat accusamus aestas tenetur. Uter argumentum harum vitiosus sortitus nihil urbanus magni nulla paulatim.",
        initialDate: "2026-04-20T20:58:01.410Z",
        place: {
          direction: "5568 Jackson Avenue, 6570",
          city: "Chiclayo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "75df7309-beae-4ce2-aeb7-d32e7b155998"
  },
  {
    _id: "9d4fb512-4600-42f0-8bbc-a3e7515d8636",
    name: "Movimiento infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Tergum talus cattus quas spargo convoco charisma.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:34.832Z",
    updatedAt: "2026-01-11T21:58:34.832Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 373,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 179,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - alimentación",
        description: "Evento presencial para alimentación. Crinis curvo adulescens vobis.",
        initialDate: "2026-01-22T21:58:01.472Z",
        place: {
          direction: "6464 Manuel Camp, 7060",
          city: "Frankfurt",
          countryCode: "DE"
        }
      },
      {
        name: "Jornada solidaria - pobreza",
        description: "Evento presencial para pobreza. Cilicium curiositas templum cultellus.",
        initialDate: "2026-05-09T20:58:01.472Z",
        place: {
          direction: "383 Lincoln Street, 1339",
          city: "Valencia",
          countryCode: "VE"
        }
      }
    ],
    causeId: "5fe69a07-8fd4-41c5-82b3-581f2a2198d8"
  },
  {
    _id: "5fc1ef09-92f7-4ad5-8a96-f9ff87012f51",
    name: "Jornada discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Admitto cohors vulariter benevolentia volup vix substantia.",
    status: "approved",
    reason: "",
    userId: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    createdAt: "2026-01-11T21:58:34.894Z",
    updatedAt: "2026-01-11T21:58:34.894Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 961,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - discapacidad",
        description: "Evento presencial para discapacidad. Deleo tenetur capto debeo.",
        initialDate: "2026-04-28T20:58:01.534Z",
        place: {
          direction: "73432 Hagenes Walk, 30346",
          city: "Venezia",
          countryCode: "IT"
        }
      }
    ],
    causeId: "418661a8-2342-4a4c-8733-b49a665fc775"
  },
  {
    _id: "09b42f1e-2c2c-4614-971d-176e8ac21f9d",
    name: "Programa discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Triduana basium depopulo aperiam. Labore porro absorbeo.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:34.955Z",
    updatedAt: "2026-01-11T21:58:34.955Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 494,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 345,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - vivienda",
        description: "Evento presencial para vivienda. Adhuc aestivus cras odit doloremque adeptio sponte vulpes certe. Universe adsum ventosus asporto somniculosus.",
        initialDate: "2026-07-16T20:58:01.597Z",
        place: {
          direction: "7780 3rd Street, 12960",
          city: "Cartagena",
          countryCode: "CO"
        }
      },
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Tricesimus ascisco spoliatio voluptatibus assentator virtus cresco velum ultra.",
        initialDate: "2026-02-01T21:58:01.598Z",
        place: {
          direction: "10467 Jones Streets, 5240",
          city: "Toulouse",
          countryCode: "FR"
        }
      }
    ],
    causeId: "38cac9d8-00ab-4daa-9ec2-2ba94bb7d3cf"
  },
  {
    _id: "f1ec7081-e2ca-4f6b-bdd6-0ed8db5fcd9d",
    name: "Campaña educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Soleo subnecto compello virtus sophismata uterque.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:35.019Z",
    updatedAt: "2026-01-11T21:58:35.019Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 850,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 340,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 866,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Libero cura tantum apto adduco amicitia quia taceo subseco terminatio.",
        initialDate: "2026-04-09T20:58:01.659Z",
        place: {
          direction: "133 E Church Street, 1305",
          city: "Frankfurt",
          countryCode: "DE"
        }
      },
      {
        name: "Actividad de voluntariado - educación",
        description: "Evento presencial para educación. Suppono cuppedia vitae venio adaugeo pariatur tersus ut totus.",
        initialDate: "2026-02-18T21:58:01.660Z",
        place: {
          direction: "71172 Water Street, 8821",
          city: "Valencia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "46a08711-cef4-4ede-acf4-606a5442b200"
  },
  {
    _id: "ef891143-0aa7-4dd9-9de2-e0c1708d30f7",
    name: "Acción solidaria vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Pecus amplus arma vociferor acidus magni decumbo. Confido cerno blanditiis.",
    status: "pending",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:01.734Z",
    updatedAt: "2026-01-11T21:58:01.734Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 441,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 995,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Solum speciosus vesco ullus apto.",
        initialDate: "2026-03-14T21:58:01.721Z",
        place: {
          direction: "24279 Spruce Street, 63363",
          city: "Madrid",
          countryCode: "ES"
        }
      },
      {
        name: "Actividad de voluntariado - igualdad de género",
        description: "Evento presencial para igualdad de género. Carmen defleo utroque arbustum adipiscor adflicto aufero atque urbs. Suffoco bonus conspergo villa comburo admiratio acceptus umquam voluptatum vilicus.",
        initialDate: "2026-07-09T20:58:01.721Z",
        place: {
          direction: "48532 Doyle Manors, 32457",
          city: "Antofagasta",
          countryCode: "CL"
        }
      }
    ],
    causeId: "143d354e-c2df-4840-981f-e2d77baa41cc"
  },
  {
    _id: "77a801c3-89be-4eab-ac39-1dfe2c1f6907",
    name: "Operación educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Decumbo calco quas desparatus vindico una sum annus. Ascisco tardus voveo.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:35.143Z",
    updatedAt: "2026-01-11T21:58:35.143Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 249,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - refugiados",
        description: "Evento presencial para refugiados. Vita voro demulceo aspernatur comis admoveo amplexus contra pecto virgo. Vorax charisma substantia.",
        initialDate: "2026-02-02T21:58:01.784Z",
        place: {
          direction: "1969 N 2nd Street, 5599",
          city: "Lyon",
          countryCode: "FR"
        }
      }
    ],
    causeId: "8cd4efe2-d7d7-4068-b308-235ceb1a7798"
  },
  {
    _id: "c86fae6d-e285-4b43-aa2b-06d0dfb424fc",
    name: "Iniciativa educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Cilicium acquiro iste adinventitias torqueo modi cibus campana perspiciatis.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:35.268Z",
    updatedAt: "2026-01-11T21:58:35.268Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 153,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 290,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - salud",
        description: "Evento presencial para salud. Civitas uter debilito toties. Desparatus complectus thermae curvo culpa vulticulus ciminatio.",
        initialDate: "2026-03-22T21:58:01.908Z",
        place: {
          direction: "58882 Central Street, 97267",
          city: "Barranquilla",
          countryCode: "CO"
        }
      }
    ],
    causeId: "3c371a32-f967-4075-bbc5-4e7133b345ea"
  },
  {
    _id: "f8a36a56-63a8-40de-bc0c-b3f60391cbda",
    name: "Proyecto discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Ubi sursum vergo atque debeo tametsi spectaculum vel suffragium conicio.",
    status: "pending",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:01.984Z",
    updatedAt: "2026-01-11T21:58:01.984Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 658,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - derechos humanos",
        description: "Evento presencial para derechos humanos. Deduco canto amplexus catena vobis tametsi amitto a spectaculum beneficium. Quod agnitio nesciunt utor.",
        initialDate: "2026-05-31T20:58:01.971Z",
        place: {
          direction: "96417 Schaefer Pass, 31065",
          city: "Zaragoza",
          countryCode: "ES"
        }
      }
    ],
    causeId: "90a4c145-5904-466f-814d-ed30b7e82b4a"
  },
  {
    _id: "e4bbc5f5-7826-4071-9651-89e487b9bd20",
    name: "Jornada desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Venustas adduco quas confugo vulariter subiungo. Ver aro desipio comprehendo vestrum thesis.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:35.518Z",
    updatedAt: "2026-01-11T21:58:35.518Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 93,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - discapacidad",
        description: "Evento presencial para discapacidad. Atrocitas creator cometes curso audeo suppellex clamo vulgivagus spectaculum vilitas. Conscendo molestias crur speculum atrocitas adamo laudantium statua creptio.",
        initialDate: "2026-03-05T21:58:02.157Z",
        place: {
          direction: "22615 Tabitha Ports, 39344",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "8cd4efe2-d7d7-4068-b308-235ceb1a7798"
  },
  {
    _id: "2c7766c0-89c5-40a8-a5d2-4f5fb090e56f",
    name: "Jornada vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Conculco deprimo amaritudo conicio conspergo tyrannus.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:35.580Z",
    updatedAt: "2026-01-11T21:58:35.580Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 609,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 861,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - pobreza",
        description: "Evento presencial para pobreza. Animadverto arbitro capillus congregatio tego. Vir verumtamen compono agnitio.",
        initialDate: "2026-02-06T21:58:02.220Z",
        place: {
          direction: "5422 Jackson Avenue, 525",
          city: "Málaga",
          countryCode: "ES"
        }
      }
    ],
    causeId: "3f1c2650-8608-4f67-9b8c-454addeeb255"
  },
  {
    _id: "dc506e39-7f13-4dad-b1b4-fde2e66acc72",
    name: "Programa desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Ver ademptio nihil defluo aequus tui adnuo tardus deficio.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:35.706Z",
    updatedAt: "2026-01-11T21:58:35.706Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 567,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 83,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Tabernus vinum tactus bellicus consuasor speciosus confido sortitus canis. Considero sunt termes valetudo.",
        initialDate: "2026-05-25T20:58:02.344Z",
        place: {
          direction: "12117 W Lake Street, 632",
          city: "Stuttgart",
          countryCode: "DE"
        }
      }
    ],
    causeId: "d4333aed-c78a-49fb-945e-8237cd23d0a2"
  },
  {
    _id: "92119374-0155-4724-a0d6-076c528686c5",
    name: "Jornada vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Consequuntur dedico denuo claustrum deputo depopulo.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:35.896Z",
    updatedAt: "2026-01-11T21:58:35.896Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 506,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - emergencias",
        description: "Evento presencial para emergencias. Deficio confugo dedico tamen caelum confido aliquid quos surgo. Confido ambitus repellendus versus adeo una traho viduo usus.",
        initialDate: "2026-07-14T20:58:02.531Z",
        place: {
          direction: "12280 Martin Luther King Drive, 87152",
          city: "Roma",
          countryCode: "IT"
        }
      }
    ],
    causeId: "b936ac6d-412f-4721-89eb-e0df728e483d"
  },
  {
    _id: "a2807969-0e92-4826-ad71-411306b7bbd2",
    name: "Red de apoyo derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Culpa arto demonstro sublime crux annus amicitia claro censura confido. Vulgivagus victus laborum corrupti utrimque.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:35.958Z",
    updatedAt: "2026-01-11T21:58:35.958Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 806,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 790,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 662,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Clam ancilla substantia convoco cetera cena tepesco. Velum venustas demoror bonus vilis voluptatum ademptio uterque.",
        initialDate: "2026-03-10T21:58:02.593Z",
        place: {
          direction: "772 Hillside Avenue, 446",
          city: "Bucaramanga",
          countryCode: "CO"
        }
      }
    ],
    causeId: "87fde027-206d-4e3a-9a1f-e8a63e8da174"
  },
  {
    _id: "f65c70ae-f978-452d-8818-348299d4c89f",
    name: "Programa vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Depraedor spes bellicus.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:36.021Z",
    updatedAt: "2026-01-11T21:58:36.021Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 562,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Volutabrum tibi quam conduco aequus voveo.",
        initialDate: "2026-03-04T21:58:02.656Z",
        place: {
          direction: "8760 Verla Avenue, 8613",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      },
      {
        name: "Jornada solidaria - medio ambiente",
        description: "Evento presencial para medio ambiente. Beatus esse adipiscor viridis spiritus confero solutio coruscus. Alo sublime torrens contra.",
        initialDate: "2026-04-09T20:58:02.656Z",
        place: {
          direction: "534 Commercial Street, 6598",
          city: "Cologne",
          countryCode: "DE"
        }
      }
    ],
    causeId: "37c41ada-bebb-4f97-a29a-d4d2519972af"
  },
  {
    _id: "5b0c10f8-bf16-4a33-bcca-7bc1f3b25d4c",
    name: "Programa pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Officia videlicet votum cubo antepono agnitio ubi aduro. Causa summopere ventosus causa.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:36.085Z",
    updatedAt: "2026-01-11T21:58:36.085Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 433,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - alimentación",
        description: "Evento presencial para alimentación. Solum voluptates dolore speciosus cimentarius.",
        initialDate: "2026-01-20T21:58:02.718Z",
        place: {
          direction: "96018 Salisbury Road, 246",
          city: "Dresden",
          countryCode: "DE"
        }
      },
      {
        name: "Reunión de coordinación - medio ambiente",
        description: "Evento presencial para medio ambiente. Deleo alii bibo ancilla.",
        initialDate: "2026-01-21T21:58:02.718Z",
        place: {
          direction: "267 Isom Meadow, 699",
          city: "Cusco",
          countryCode: "PE"
        }
      }
    ],
    causeId: "c1eddc8c-2252-415e-a7cf-c78bca867a29"
  },
  {
    _id: "7141ac09-52d2-4fb5-adec-4fbea9ffe827",
    name: "Proyecto emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Crapula conatus defleo abstergo eos alo conor surgo. Viridis stips cruciamentum aduro tabernus sustineo vinco.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:36.147Z",
    updatedAt: "2026-01-11T21:58:36.147Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 695,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 812,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - medio ambiente",
        description: "Evento presencial para medio ambiente. Commodo conventus delectatio astrum. Vulnus adopto vulgaris pel ipsa conduco turpis conspergo tametsi.",
        initialDate: "2026-05-21T20:58:02.779Z",
        place: {
          direction: "30051 Emilio Streets, 20002",
          city: "Madrid",
          countryCode: "ES"
        }
      },
      {
        name: "Evento benéfico - agua potable",
        description: "Evento presencial para agua potable. Conforto allatus convoco nulla ante vix vergo aequus videlicet audax.",
        initialDate: "2026-05-05T20:58:02.780Z",
        place: {
          direction: "93348 Willow Grove, 752",
          city: "Murcia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "533a4788-4be8-43bd-8115-bf8ac9f6f9ae"
  },
  {
    _id: "257f16c5-90d8-43cf-bbc2-189df66f2199",
    name: "Iniciativa tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Patior aegre paens comminor confido asporto clam. Acsi spoliatio tabgo soluta amitto clarus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:36.209Z",
    updatedAt: "2026-01-11T21:58:36.209Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 716,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 997,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 742,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - refugiados",
        description: "Evento presencial para refugiados. Stella ipsum vomer vivo repellat tabernus tametsi. Sequi deputo subiungo sum facere decet tamen vulnus pauper.",
        initialDate: "2026-06-03T20:58:02.841Z",
        place: {
          direction: "552 Sebastian Well, 674",
          city: "Cusco",
          countryCode: "PE"
        }
      }
    ],
    causeId: "c7321708-8819-4381-8b2c-cbc5e052aeb7"
  },
  {
    _id: "7acb93e9-e707-428a-8e9d-68f3bc083d28",
    name: "Campaña emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Statim aegre barba catena basium appello. Volaticus spectaculum aegrus accommodo agnitio.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:36.332Z",
    updatedAt: "2026-01-11T21:58:36.332Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 280,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 893,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 110,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - alimentación",
        description: "Evento presencial para alimentación. Crapula uterque terreo patria timidus deficio suppellex viscus blandior.",
        initialDate: "2026-04-09T20:58:02.966Z",
        place: {
          direction: "74093 The Maltings, 95191",
          city: "Firenze",
          countryCode: "IT"
        }
      }
    ],
    causeId: "017d3208-aa1c-4e89-834c-0de8cdb77ebc"
  },
  {
    _id: "a3f0c0cb-0adb-4b02-8566-e26a660550a5",
    name: "Iniciativa salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Alter reprehenderit a conor allatus vilis suus incidunt tempora.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:36.396Z",
    updatedAt: "2026-01-11T21:58:36.396Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 217,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - educación",
        description: "Evento presencial para educación. Uredo quae cruentus aperio absconditus.",
        initialDate: "2026-07-06T20:58:03.028Z",
        place: {
          direction: "251 Feest Walks, 79681",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "841e3ab6-31d8-4b84-8a5b-5ceb188bc08b"
  },
  {
    _id: "50a819d3-b5bc-428b-9e6a-58032e631ae9",
    name: "Movimiento vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Custodia confero cibo paens nam expedita vilicus vesica. Non comis inventore bis agnosco compello vulgus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:36.518Z",
    updatedAt: "2026-01-11T21:58:36.518Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 885,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - discapacidad",
        description: "Evento presencial para discapacidad. Supplanto desipio curto. Molestias defungo bellum synagoga.",
        initialDate: "2026-05-25T20:58:03.150Z",
        place: {
          direction: "4795 Arlene Rapids, 683",
          city: "Medellín",
          countryCode: "CO"
        }
      },
      {
        name: "Actividad de voluntariado - salud",
        description: "Evento presencial para salud. Amitto totidem demergo eius in alveus videlicet. Vergo terminatio canonicus ceno.",
        initialDate: "2026-03-11T21:58:03.151Z",
        place: {
          direction: "16432 Alanna Cliffs, 90702",
          city: "Córdoba",
          countryCode: "AR"
        }
      }
    ],
    causeId: "c2219f93-d86a-4911-a994-1d0ce4c6c654"
  },
  {
    _id: "f6e998c8-a127-46c5-82bc-56eb7722bfbc",
    name: "Red de apoyo desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Adeo cultellus consequuntur deleo.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:36.580Z",
    updatedAt: "2026-01-11T21:58:36.580Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 328,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 257,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - alimentación",
        description: "Evento presencial para alimentación. Clibanus approbo cumque iure cuius cuius conscendo temporibus. Depraedor terminatio viridis templum cognomen utilis corona.",
        initialDate: "2026-02-18T21:58:03.212Z",
        place: {
          direction: "8024 Lamont Mount, 50471",
          city: "Lima",
          countryCode: "PE"
        }
      },
      {
        name: "Evento benéfico - discapacidad",
        description: "Evento presencial para discapacidad. Denego vulticulus comburo defendo nostrum conatus titulus aqua tepidus.",
        initialDate: "2026-03-08T21:58:03.212Z",
        place: {
          direction: "6292 Jammie Camp, 6493",
          city: "Maracaibo",
          countryCode: "VE"
        }
      }
    ],
    causeId: "e96653ef-a46c-419b-87ce-6775ac7cffc0"
  },
  {
    _id: "4cf22392-abfe-4b3a-a216-3c029fcdbd61",
    name: "Acción solidaria infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Dolore tempus vitium ascit.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:58:36.641Z",
    updatedAt: "2026-01-11T21:58:36.641Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 669,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 266,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - igualdad de género",
        description: "Evento presencial para igualdad de género. Volubilis tego collum.",
        initialDate: "2026-01-30T21:58:03.275Z",
        place: {
          direction: "9561 Ross Ridge, 14524",
          city: "Brasília",
          countryCode: "BR"
        }
      }
    ],
    causeId: "b655e10e-d452-429e-9b2c-82815adf96dd"
  },
  {
    _id: "9adf43d5-4bcc-443f-8fcc-aac09c128cef",
    name: "Red de apoyo educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Cupressus arcus depraedor.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:58:36.706Z",
    updatedAt: "2026-01-11T21:58:36.706Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 420,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 500,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 100,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Temeritas denique varius vapulus tamen desparatus cibo condico terebro.",
        initialDate: "2026-02-10T21:58:03.337Z",
        place: {
          direction: "20782 Ash Grove, 3334",
          city: "Tijuana",
          countryCode: "MX"
        }
      },
      {
        name: "Reunión de coordinación - tercera edad",
        description: "Evento presencial para tercera edad. Civitas dolorem nostrum auctus abutor patruus. Perspiciatis victoria tergum vitium praesentium quos verbera.",
        initialDate: "2026-01-20T21:58:03.338Z",
        place: {
          direction: "1150 Royce Cliff, 392",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      }
    ],
    causeId: "8ed57a88-b492-4364-ab6f-cd7cf9b588c6"
  },
  {
    _id: "31d93b15-971c-47d5-98ef-fca6a371afe7",
    name: "Iniciativa emergencias 2027",
    description: "Acción concreta para emergencias con objetivos cuantificables. Cattus verumtamen clarus pecto ad votum. Appositus tollo eius vulgus dignissimos confugo argentum cursus repellat.",
    status: "approved",
    reason: "",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:58:36.832Z",
    updatedAt: "2026-01-11T21:58:36.832Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 768,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 242,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - igualdad de género",
        description: "Evento presencial para igualdad de género. Calamitas caput commodi conforto desolo.",
        initialDate: "2026-07-06T20:58:03.463Z",
        place: {
          direction: "828 S 6th Street, 4130",
          city: "Salvador",
          countryCode: "BR"
        }
      },
      {
        name: "Taller formativo - pobreza",
        description: "Evento presencial para pobreza. Attollo adaugeo placeat.",
        initialDate: "2026-06-10T20:58:03.464Z",
        place: {
          direction: "172 Poplar Road, 789",
          city: "Bordeaux",
          countryCode: "FR"
        }
      }
    ],
    causeId: "beeeec80-f1ed-4eb7-89cc-2c495b950822"
  },
  {
    _id: "e1f16e70-9e77-48b5-a6dd-e0cbd17853c2",
    name: "Iniciativa pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Adhaero totidem patrocinor. Aranea inflammatio corrigo creptio cimentarius catena absens.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:36.893Z",
    updatedAt: "2026-01-11T21:58:36.893Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 978,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 864,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - derechos humanos",
        description: "Evento presencial para derechos humanos. Atavus confero suasoria. Valeo candidus totam.",
        initialDate: "2026-05-03T20:58:03.526Z",
        place: {
          direction: "8013 Smith Causeway, 44380",
          city: "Trujillo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "f8b59a9a-bacf-4909-ad22-aa5a69507c93"
  },
  {
    _id: "a80f5b77-8ed0-487f-9b3e-7dcb30fcbdb6",
    name: "Red de apoyo salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Carpo voro sollers concedo patior adsidue summa totidem. Adsidue tactus denique cervus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:37.082Z",
    updatedAt: "2026-01-11T21:58:37.082Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 652,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - agua potable",
        description: "Evento presencial para agua potable. Cetera vulgivagus cubitum beatae vir collum. Quam vilis expedita vetus venia valens cultura.",
        initialDate: "2026-02-27T21:58:03.713Z",
        place: {
          direction: "61496 Vesta Points, 5427",
          city: "Cancún",
          countryCode: "MX"
        }
      }
    ],
    causeId: "a08e4b0e-a54d-400d-b652-5d7691a32257"
  },
  {
    _id: "6f16b3c8-d60f-4c85-8ad6-8600490ca094",
    name: "Acción solidaria educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Compono convoco cunae aliqua.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:37.267Z",
    updatedAt: "2026-01-11T21:58:37.267Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 776,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 743,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - agua potable",
        description: "Evento presencial para agua potable. Amaritudo socius voluptas aestus audax traho. Voluptatibus ceno temeritas cariosus conduco cur cibus.",
        initialDate: "2026-06-03T20:58:03.899Z",
        place: {
          direction: "42576 Frances Turnpike, 171",
          city: "Munich",
          countryCode: "DE"
        }
      }
    ],
    causeId: "5fe69a07-8fd4-41c5-82b3-581f2a2198d8"
  },
  {
    _id: "f1aad102-ed19-4a33-85c1-d60884560d6c",
    name: "Movimiento igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Consequuntur arguo tepidus eveniet tergiversatio iste.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:37.332Z",
    updatedAt: "2026-01-11T21:58:37.332Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 680,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 559,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - agua potable",
        description: "Evento presencial para agua potable. Depulso vorago stella vesica.",
        initialDate: "2026-02-03T21:58:03.963Z",
        place: {
          direction: "6811 Riverside, 459",
          city: "Munich",
          countryCode: "DE"
        }
      },
      {
        name: "Encuentro comunitario - infancia",
        description: "Evento presencial para infancia. Nobis sub coniuratio sustineo decipio acidus crux.",
        initialDate: "2026-01-26T21:58:03.963Z",
        place: {
          direction: "685 Sonny Flats, 1028",
          city: "Berlin",
          countryCode: "DE"
        }
      }
    ],
    causeId: "8911b3ff-9a54-403b-b4b2-08bbf07d6686"
  },
  {
    _id: "d0fc2dbe-d539-475c-9767-b362ed3d13f6",
    name: "Programa pobreza 2027",
    description: "Acción concreta para pobreza con objetivos cuantificables. Adimpleo aggredior degero stultus.",
    status: "approved",
    reason: "",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:58:37.454Z",
    updatedAt: "2026-01-11T21:58:37.454Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 212,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - tercera edad",
        description: "Evento presencial para tercera edad. Defetiscor aqua ventus advoco sol vehemens solvo aegrus una ventus.",
        initialDate: "2026-04-26T20:58:04.087Z",
        place: {
          direction: "153 Manchester Road, 62426",
          city: "Cartagena",
          countryCode: "CO"
        }
      }
    ],
    causeId: "23221843-2c2d-4d7c-864b-1d1c222bc8a6"
  },
  {
    _id: "e310dfcf-230d-42a4-a098-840a9f7f8adf",
    name: "Acción solidaria igualdad de género 2027",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Virtus desparatus tergum voluptatem vis amor communis somnus volo. Enim tribuo quidem abduco ambitus amita bis reiciendis rerum.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:37.517Z",
    updatedAt: "2026-01-11T21:58:37.517Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 455,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - agua potable",
        description: "Evento presencial para agua potable. Utrum cribro vix. Baiulus omnis aufero uredo comitatus tui vomer averto deficio tergo.",
        initialDate: "2026-03-09T21:58:04.149Z",
        place: {
          direction: "539 Gerhold Mews, 988",
          city: "Córdoba",
          countryCode: "AR"
        }
      }
    ],
    causeId: "f2e090df-eacc-43ab-9cb0-ab445ff55870"
  },
  {
    _id: "697a8314-bbb6-428c-9e49-fbbb91a44791",
    name: "Acción solidaria derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Turbo theologus universe uterque deinde benevolentia beatae universe. Conicio verumtamen tenax repudiandae assumenda conspergo causa",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:37.579Z",
    updatedAt: "2026-01-11T21:58:37.579Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 208,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 271,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 94,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Collum audio vorago coma curis veritas unus.",
        initialDate: "2026-05-10T20:58:04.212Z",
        place: {
          direction: "53902 Ullrich Isle, 784",
          city: "Málaga",
          countryCode: "ES"
        }
      },
      {
        name: "Encuentro comunitario - tercera edad",
        description: "Evento presencial para tercera edad. Praesentium acer abduco.",
        initialDate: "2026-03-19T21:58:04.212Z",
        place: {
          direction: "27574 Kling Springs, 34143",
          city: "Birmingham",
          countryCode: "GB"
        }
      }
    ],
    causeId: "46a08711-cef4-4ede-acf4-606a5442b200"
  },
  {
    _id: "9e45271a-9734-4839-aa2c-9c78f7caf9bf",
    name: "Programa desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Confugo voluptate aetas demonstro vesper coniuratio vindico. Approbo cavus desolo vulgivagus crudelis corroboro aperte stips vi",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:58:37.641Z",
    updatedAt: "2026-01-11T21:58:37.641Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 458,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 34,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Cognomen aperte deserunt admitto ducimus vulpes vinculum. Conatus voluptate bardus cruciamentum appositus tibi averto audax quaerat.",
        initialDate: "2026-05-07T20:58:04.275Z",
        place: {
          direction: "906 Jacklyn Walk, 23946",
          city: "Cusco",
          countryCode: "PE"
        }
      },
      {
        name: "Reunión de coordinación - refugiados",
        description: "Evento presencial para refugiados. Sopor decipio succedo crapula demens ulciscor deprimo subseco cetera. Abbas patruus eveniet abundans sustineo cresco anser voluptates apostolus.",
        initialDate: "2026-05-18T20:58:04.275Z",
        place: {
          direction: "993 N Main Avenue, 8123",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      }
    ],
    causeId: "5c383e5e-28ea-4d99-b5ee-d6bdf4324b13"
  },
  {
    _id: "099a7da7-0701-4573-8c61-cf11577b76a3",
    name: "Red de apoyo derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Canto cunae ait dolores undique textor voluptas demulceo cura.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:37.705Z",
    updatedAt: "2026-01-11T21:58:37.705Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 236,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 663,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - tercera edad",
        description: "Evento presencial para tercera edad. Uter odit cupiditate consectetur agnitio vitium textilis saepe. Copiose cum a tabgo atrox aveho adsum numquam clarus.",
        initialDate: "2026-07-15T20:58:04.337Z",
        place: {
          direction: "525 Jabari Terrace, 215",
          city: "Brasília",
          countryCode: "BR"
        }
      }
    ],
    causeId: "6e85b55a-c65d-4cb3-a6df-94df7de08db6"
  },
  {
    _id: "1826cf20-f610-49f6-b6a8-f0af2c0bea38",
    name: "Operación infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Ratione accusamus vinum cognatus alienus ullus acceptus.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:37.768Z",
    updatedAt: "2026-01-11T21:58:37.768Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 987,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 271,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - igualdad de género",
        description: "Evento presencial para igualdad de género. Cogito caterva vigilo venio advoco.",
        initialDate: "2026-06-15T20:58:04.401Z",
        place: {
          direction: "589 Poplar Close, 42081",
          city: "Arequipa",
          countryCode: "PE"
        }
      }
    ],
    causeId: "017d3208-aa1c-4e89-834c-0de8cdb77ebc"
  },
  {
    _id: "d2ada1fb-4c37-47af-b2f7-980c0e0a5134",
    name: "Programa infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Blanditiis demergo id sono abundans.",
    status: "approved",
    reason: "",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:37.831Z",
    updatedAt: "2026-01-11T21:58:37.831Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 948,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 318,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 175,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Aetas tener urbs sponte temptatio cetera triduana. Asperiores arcus cervus tunc tepidus.",
        initialDate: "2026-04-07T20:58:04.463Z",
        place: {
          direction: "124 W Park Street, 820",
          city: "London",
          countryCode: "GB"
        }
      },
      {
        name: "Evento benéfico - medio ambiente",
        description: "Evento presencial para medio ambiente. Terminatio ante adsum armarium denuncio terebro. Beatae verus cupio communis enim aggredior tergeo adeptio animadverto.",
        initialDate: "2026-04-29T20:58:04.463Z",
        place: {
          direction: "3389 Bridge Road, 8541",
          city: "Cartagena",
          countryCode: "CO"
        }
      }
    ],
    causeId: "017d3208-aa1c-4e89-834c-0de8cdb77ebc"
  },
  {
    _id: "a6b7de08-351d-4dac-9c9d-46c51153bc3d",
    name: "Proyecto tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Amitto voluptate atqui vestrum. Pariatur tricesimus abscido vigilo temperantia appono tergum adhaero xiphias tum.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:37.955Z",
    updatedAt: "2026-01-11T21:58:37.955Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 134,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - refugiados",
        description: "Evento presencial para refugiados. Casus succedo deleo patruus vulpes deserunt aegre triumphus vapulus necessitatibus.",
        initialDate: "2026-01-25T21:58:04.586Z",
        place: {
          direction: "90737 Main, 1761",
          city: "London",
          countryCode: "GB"
        }
      }
    ],
    causeId: "1655f209-6028-4d1f-ad9b-85f5cf0d4626"
  },
  {
    _id: "5291d630-3284-4ed8-8d56-59ece5bb743e",
    name: "Campaña salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Decipio dolore amitto sollicito illo volup excepturi.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:38.019Z",
    updatedAt: "2026-01-11T21:58:38.019Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 765,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 805,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 760,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - derechos humanos",
        description: "Evento presencial para derechos humanos. Vicinus necessitatibus coniuratio.",
        initialDate: "2026-04-15T20:58:04.649Z",
        place: {
          direction: "93152 Crona Parkway, 355",
          city: "Bordeaux",
          countryCode: "FR"
        }
      },
      {
        name: "Jornada solidaria - salud",
        description: "Evento presencial para salud. Aperte derelinquo vacuus.",
        initialDate: "2026-07-04T20:58:04.649Z",
        place: {
          direction: "343 Lon Plaza, 10899",
          city: "Barcelona",
          countryCode: "ES"
        }
      }
    ],
    causeId: "b936ac6d-412f-4721-89eb-e0df728e483d"
  },
  {
    _id: "2523846a-eae0-42d7-859e-a89fa4bc1ea5",
    name: "Operación alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Rerum cernuus decor. Adeo strues fuga audentia tabella conspergo caelestis benevolentia speculum tergum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:58:38.142Z",
    updatedAt: "2026-01-11T21:58:38.142Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 294,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 279,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - alimentación",
        description: "Evento presencial para alimentación. Verbum demoror iusto calcar tui. Surgo vulgaris arbitro soluta virtus vinum est aeternus utilis illo.",
        initialDate: "2026-02-13T21:58:04.774Z",
        place: {
          direction: "48366 Ida Brook, 75115",
          city: "Torino",
          countryCode: "IT"
        }
      }
    ],
    causeId: "41a0f8da-010e-4843-99fc-3a96bcc1d1d3"
  },
  {
    _id: "c68d0d3a-5661-4ed4-9118-5fe854f4ae34",
    name: "Red de apoyo salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Defendo demum tergo vitium socius cupio.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:38.266Z",
    updatedAt: "2026-01-11T21:58:38.266Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 717,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 338,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - discapacidad",
        description: "Evento presencial para discapacidad. Curso substantia alter tergum pel. Tego id cultellus copiose canis sol sollicito supra autem totam.",
        initialDate: "2026-03-02T21:58:04.915Z",
        place: {
          direction: "9784 Mitchell Orchard, 4299",
          city: "Lille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "ffbf9875-6e0d-4307-bcab-efcf527a2a7c"
  },
  {
    _id: "24c51609-bc54-4ffd-8319-cd5747a1720c",
    name: "Jornada vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Adicio laboriosam adamo viriliter.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:58:38.329Z",
    updatedAt: "2026-01-11T21:58:38.329Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 182,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - agua potable",
        description: "Evento presencial para agua potable. Calcar vis adsuesco coniecto taceo vicissitudo verus vilis comedo. Repellendus adopto termes vulgus.",
        initialDate: "2026-02-04T21:58:04.979Z",
        place: {
          direction: "276 Francesca Way, 13820",
          city: "Bristol",
          countryCode: "GB"
        }
      },
      {
        name: "Encuentro comunitario - alimentación",
        description: "Evento presencial para alimentación. Utrum vomito vobis pecto ambitus.",
        initialDate: "2026-07-14T20:58:04.979Z",
        place: {
          direction: "81817 Amaya Ford, 4250",
          city: "Caracas",
          countryCode: "VE"
        }
      }
    ],
    causeId: "166f4fd8-8e58-4773-8567-41195e1dfbb3"
  },
  {
    _id: "b5f94d11-698e-4143-84ad-52d647ce3175",
    name: "Programa discapacidad 2026",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Sperno concido ventosus adeptio centum vulpes confido carbo.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:38.515Z",
    updatedAt: "2026-01-11T21:58:38.515Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 862,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Adsum approbo voluptate amitto adstringo aperte. Pax patria eveniet spes adsum carpo thorax degenero.",
        initialDate: "2026-06-19T20:58:05.168Z",
        place: {
          direction: "2113 Doyle Fort, 15491",
          city: "Valencia",
          countryCode: "VE"
        }
      },
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Subnecto totam aegrotatio voluptatibus viscus cunctatio theologus maiores summopere alveus. Debilito magni triduana viriliter coaegresco censura credo.",
        initialDate: "2026-05-27T20:58:05.168Z",
        place: {
          direction: "26490 Darwin Skyway, 13656",
          city: "Glasgow",
          countryCode: "GB"
        }
      }
    ],
    causeId: "143d354e-c2df-4840-981f-e2d77baa41cc"
  },
  {
    _id: "36a98dcf-bb67-4865-a0a3-61a488325fa1",
    name: "Programa infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Verumtamen vulpes aperiam tribuo certe utor beatae. Utique sui crustulum torqueo surculus stipes succedo admoneo.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:38.578Z",
    updatedAt: "2026-01-11T21:58:38.578Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 691,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - educación",
        description: "Evento presencial para educación. Crapula dedecor vilis utique celo aeneus. Verto ventito sum recusandae cresco.",
        initialDate: "2026-01-21T21:58:05.229Z",
        place: {
          direction: "178 The Willows, 4721",
          city: "La Serena",
          countryCode: "CL"
        }
      }
    ],
    causeId: "e513250c-2418-426e-814c-26e3a2bf79e5"
  },
  {
    _id: "fcfca859-8ba2-4a47-8b8f-f29a0cf92801",
    name: "Operación refugiados 2026",
    description: "Acción concreta para refugiados con objetivos cuantificables. Thymum soleo speciosus vox speculum nulla corroboro talio.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:38.639Z",
    updatedAt: "2026-01-11T21:58:38.639Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 762,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 708,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - discapacidad",
        description: "Evento presencial para discapacidad. Uredo supplanto cruciamentum. Vobis veritatis amor timor canis.",
        initialDate: "2026-02-22T21:58:05.293Z",
        place: {
          direction: "8313 Zulauf Shoals, 81447",
          city: "Barranquilla",
          countryCode: "CO"
        }
      }
    ],
    causeId: "bf941804-e1be-4c1e-8d98-5cbcb08508e0"
  },
  {
    _id: "7dac1bc4-28c8-4b5f-bae3-3d27ab811287",
    name: "Programa infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Calamitas hic provident aeneus. Vitiosus aperio ipsam alo aedificium uberrime.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:38.702Z",
    updatedAt: "2026-01-11T21:58:38.702Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 415,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - igualdad de género",
        description: "Evento presencial para igualdad de género. Adinventitias ratione coerceo abundans tollo certe.",
        initialDate: "2026-02-02T21:58:05.355Z",
        place: {
          direction: "7780 Lilliana Island, 90248",
          city: "São Paulo",
          countryCode: "BR"
        }
      },
      {
        name: "Evento benéfico - tercera edad",
        description: "Evento presencial para tercera edad. Vacuus culpo alienus aequitas ciminatio quos.",
        initialDate: "2026-05-10T20:58:05.355Z",
        place: {
          direction: "734 Fisher Center, 396",
          city: "Toulouse",
          countryCode: "FR"
        }
      }
    ],
    causeId: "a0feb2ed-79c3-4126-b672-520f20b133ec"
  },
  {
    _id: "534af271-d497-41f1-a234-5666bc87615a",
    name: "Acción solidaria salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Decimus sulum theologus tardus reiciendis spes bardus quia conicio.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:58:38.826Z",
    updatedAt: "2026-01-11T21:58:38.826Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 975,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 941,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 574,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - refugiados",
        description: "Evento presencial para refugiados. Vesco comis cervus vitiosus agnosco.",
        initialDate: "2026-01-23T21:58:05.479Z",
        place: {
          direction: "98636 Gwen Junction, 400",
          city: "Manchester",
          countryCode: "GB"
        }
      }
    ],
    causeId: "587b8a43-7335-43c8-a844-a1160002bdc9"
  },
  {
    _id: "b9c244b1-64a1-4026-a4ee-412bed1ce77b",
    name: "Operación derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Depraedor vaco repellendus ventus turpis illo xiphias usus. Arcus volubilis auditor desparatus avarus coniecto volubilis numquam.",
    status: "pending",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:58:05.569Z",
    updatedAt: "2026-01-11T21:58:05.569Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 594,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 198,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 381,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - igualdad de género",
        description: "Evento presencial para igualdad de género. Dedico deleo denego.",
        initialDate: "2026-04-08T20:58:05.554Z",
        place: {
          direction: "38633 Barn Close, 70150",
          city: "Torino",
          countryCode: "IT"
        }
      },
      {
        name: "Actividad de voluntariado - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Cras fugiat calculus amet antepono beatus. Contra denego solitudo cuppedia culpa caritas.",
        initialDate: "2026-03-27T21:58:05.555Z",
        place: {
          direction: "3100 Hillside Road, 214",
          city: "Lille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "c12c794c-22c9-4dbe-9254-a1f21739ff4b"
  },
  {
    _id: "939747a0-2cee-4dec-8d0e-78e017b2830a",
    name: "Operación educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Pax candidus sumptus. Adversus adeo dolorem amita voluptas victoria viduo assentator.",
    status: "pending",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:05.693Z",
    updatedAt: "2026-01-11T21:58:05.693Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 282,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 821,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 94,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - medio ambiente",
        description: "Evento presencial para medio ambiente. Territo tergo aeternus animadverto.",
        initialDate: "2026-01-20T21:58:05.678Z",
        place: {
          direction: "229 Upton Corners, 4456",
          city: "Málaga",
          countryCode: "ES"
        }
      },
      {
        name: "Actividad de voluntariado - salud",
        description: "Evento presencial para salud. Candidus beatae curtus voluptatibus tergo utrimque comis.",
        initialDate: "2026-01-25T21:58:05.678Z",
        place: {
          direction: "5752 Vance Cove, 568",
          city: "Bordeaux",
          countryCode: "FR"
        }
      }
    ],
    causeId: "39420fe8-9661-4e82-9585-20cf8f7442a4"
  },
  {
    _id: "74e46485-a08f-4de4-ace7-8b555b7d4fae",
    name: "Red de apoyo alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Desparatus doloremque verus hic volup.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:39.076Z",
    updatedAt: "2026-01-11T21:58:39.076Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 846,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - igualdad de género",
        description: "Evento presencial para igualdad de género. Aggero talio catena taedium atavus hic. Vindico solitudo vestigium fugit capio vorax illum commodo tutis.",
        initialDate: "2026-06-02T20:58:05.741Z",
        place: {
          direction: "693 Predovic Fields, 64487",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      }
    ],
    causeId: "6d5e9cb7-9023-49ad-ac09-2a13ce8b5f4e"
  },
  {
    _id: "cac89c70-fba7-497a-89bf-90e8894ab58c",
    name: "Jornada igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Bellicus conicio verus demoror ambitus volubilis virtus voluptatum delectus. Esse ipsa cetera.",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:58:39.200Z",
    updatedAt: "2026-01-11T21:58:39.200Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 279,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 957,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Laborum amplus conspergo quod tempora curvo artificiose a defleo substantia.",
        initialDate: "2026-02-15T21:58:05.866Z",
        place: {
          direction: "507 Sebastian Ferry, 5463",
          city: "Barranquilla",
          countryCode: "CO"
        }
      },
      {
        name: "Taller formativo - igualdad de género",
        description: "Evento presencial para igualdad de género. Alo commodi quas deprimo tempus. Ustilo virgo coepi voluptatum vicinus.",
        initialDate: "2026-02-23T21:58:05.866Z",
        place: {
          direction: "409 South Street, 56491",
          city: "Napoli",
          countryCode: "IT"
        }
      }
    ],
    causeId: "34f65879-2f09-40f6-b949-6c13a70700bf"
  },
  {
    _id: "effd3295-c7a2-45f1-917d-089bf69127f3",
    name: "Programa emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Veritatis arcus vergo calcar varietas veniam sophismata votum. Vetus pauper cunae avarus carmen aduro.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:39.261Z",
    updatedAt: "2026-01-11T21:58:39.261Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 963,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - agua potable",
        description: "Evento presencial para agua potable. Aetas correptius sunt credo. Laborum minima coaegresco vivo odio subiungo somniculosus sollers magnam cognomen.",
        initialDate: "2026-07-01T20:58:05.929Z",
        place: {
          direction: "37567 Elyssa Shoal, 70774",
          city: "Ciudad de México",
          countryCode: "MX"
        }
      }
    ],
    causeId: "897c9408-6a84-446b-883a-74635fbeae2b"
  },
  {
    _id: "522244a2-247c-4152-83b0-f292fe2c3fa1",
    name: "Iniciativa infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Trans vomer tibi tumultus amor teres veniam carpo dolores vesica. Laudantium aggero adiuvo.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:39.323Z",
    updatedAt: "2026-01-11T21:58:39.323Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 87,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 157,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - discapacidad",
        description: "Evento presencial para discapacidad. Consuasor curso cohibeo.",
        initialDate: "2026-07-06T20:58:05.991Z",
        place: {
          direction: "38333 St Mary's Road, 858",
          city: "Monterrey",
          countryCode: "MX"
        }
      }
    ],
    causeId: "e2f98a82-7137-496a-a53c-b92f016142d0"
  },
  {
    _id: "ed8c8509-c522-4120-a50e-5470438b041d",
    name: "Acción solidaria salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Capio subseco volup. Creator similique adimpleo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:39.385Z",
    updatedAt: "2026-01-11T21:58:39.385Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 426,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 420,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 951,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Ex suus dicta demo aeger patior verbera advenio. Vivo terror abbas casso audax nostrum spectaculum unde tardus stillicidium.",
        initialDate: "2026-05-18T20:58:06.053Z",
        place: {
          direction: "22650 Nestor Trace, 761",
          city: "Cali",
          countryCode: "CO"
        }
      }
    ],
    causeId: "4db56792-f2cf-440a-a7bc-5a3b63584e42"
  },
  {
    _id: "15978435-3c58-4bf5-a0be-2c291d7e039e",
    name: "Acción solidaria refugiados 2027",
    description: "Acción concreta para refugiados con objetivos cuantificables. Desino tenetur quis. Aspernatur pectus canonicus delectus sophismata nisi centum cui venia.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:39.449Z",
    updatedAt: "2026-01-11T21:58:39.449Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 447,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 49,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 673,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Campana alveus assentator approbo confugo. Arcus accusator crinis cohors vapulus vox bestia.",
        initialDate: "2026-03-30T20:58:06.115Z",
        place: {
          direction: "54211 Ash Close, 614",
          city: "Brasília",
          countryCode: "BR"
        }
      },
      {
        name: "Jornada solidaria - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Aggredior atrox conservo vinco synagoga coniecto.",
        initialDate: "2026-06-21T20:58:06.115Z",
        place: {
          direction: "331 Vernon Squares, 781",
          city: "León",
          countryCode: "MX"
        }
      }
    ],
    causeId: "88f95c48-a972-47fb-b6c8-e7cc9fa074a6"
  },
  {
    _id: "317cf8a2-ba3c-4598-982c-8dbfd193b47f",
    name: "Red de apoyo agua potable 2026",
    description: "Acción concreta para agua potable con objetivos cuantificables. Usque provident corpus solium vinculum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:39.511Z",
    updatedAt: "2026-01-11T21:58:39.511Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 619,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - alimentación",
        description: "Evento presencial para alimentación. Viriliter subseco decerno culpa dedico apparatus cultura. Congregatio delibero consequatur clamo voluptate atrocitas sordeo occaecati.",
        initialDate: "2026-06-14T20:58:06.178Z",
        place: {
          direction: "33874 Park Avenue, 9967",
          city: "Barcelona",
          countryCode: "ES"
        }
      }
    ],
    causeId: "a1f4eb96-e668-47e4-97b3-f8e63f188314"
  },
  {
    _id: "74c3fd6f-83c6-4a59-b699-be1131872bb6",
    name: "Operación vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Aureus commodi degenero appositus amor deinde thalassinus. Bellum conforto capto aveho voro autus via spero.",
    status: "approved",
    reason: "",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:58:39.573Z",
    updatedAt: "2026-01-11T21:58:39.573Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 284,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 738,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Thalassinus vilitas conservo ara uredo. Thesaurus stipes reprehenderit crur claudeo solium distinctio.",
        initialDate: "2026-01-31T21:58:06.241Z",
        place: {
          direction: "947 Little Glens, 1759",
          city: "Mar del Plata",
          countryCode: "AR"
        }
      },
      {
        name: "Jornada solidaria - pobreza",
        description: "Evento presencial para pobreza. Undique contego comedo amet acerbitas adiuvo. Ter vaco chirographum villa sulum.",
        initialDate: "2026-06-30T20:58:06.241Z",
        place: {
          direction: "433 Morris Path, 36869",
          city: "Barranquilla",
          countryCode: "CO"
        }
      }
    ],
    causeId: "b655e10e-d452-429e-9b2c-82815adf96dd"
  },
  {
    _id: "2a62ea7a-e369-4b0a-a1cc-6cbcc3c81340",
    name: "Movimiento alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Abscido vorago natus arcesso. Cornu crinis ars deficio quasi defluo vespillo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:39.635Z",
    updatedAt: "2026-01-11T21:58:39.635Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 477,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 72,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 208,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - tercera edad",
        description: "Evento presencial para tercera edad. Avaritia absconditus via. Alii pel depereo stipes adstringo turba spargo corporis aestas copiose.",
        initialDate: "2026-04-19T20:58:06.302Z",
        place: {
          direction: "713 Stoney Lane, 130",
          city: "Venezia",
          countryCode: "IT"
        }
      }
    ],
    causeId: "00eb9ac5-2a39-4393-882a-bd3cda254ad8"
  },
  {
    _id: "6820a3b9-0c60-48e0-8d78-2417a8094641",
    name: "Proyecto derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Harum uredo absque caelum. Degero debilito soleo thesis aedificium uberrime clarus.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:39.820Z",
    updatedAt: "2026-01-11T21:58:39.820Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 929,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 561,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - vivienda",
        description: "Evento presencial para vivienda. Angelus optio aperte adulatio custodia dolore talis accedo pecco.",
        initialDate: "2026-05-02T20:58:06.489Z",
        place: {
          direction: "1041 Lynch Radial, 52288",
          city: "Rio de Janeiro",
          countryCode: "BR"
        }
      },
      {
        name: "Taller formativo - pobreza",
        description: "Evento presencial para pobreza. Deserunt dignissimos apparatus. Spes somniculosus audax ars itaque caelestis pectus vix.",
        initialDate: "2026-05-06T20:58:06.489Z",
        place: {
          direction: "3607 Predovic Drive, 7495",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      }
    ],
    causeId: "e00c1a10-c59e-4640-9261-245bbbb55a95"
  },
  {
    _id: "a37f45e7-4eec-436e-8ffa-62474ad704f3",
    name: "Movimiento desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Temeritas vindico verbum angustus arguo harum varius sophismata tardus sortitus. Arcus ex cibus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:39.883Z",
    updatedAt: "2026-01-11T21:58:39.883Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 715,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 962,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 269,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - refugiados",
        description: "Evento presencial para refugiados. Civis amitto solum unde quos cui cauda vacuus ullam acervus.",
        initialDate: "2026-04-17T20:58:06.552Z",
        place: {
          direction: "8438 Wilma Track, 438",
          city: "Cali",
          countryCode: "CO"
        }
      },
      {
        name: "Jornada solidaria - igualdad de género",
        description: "Evento presencial para igualdad de género. Utrimque quia arto cresco clementia agnitio suspendo adulatio bis. Aeneus arguo totidem.",
        initialDate: "2026-06-08T20:58:06.553Z",
        place: {
          direction: "6536 Court Street, 728",
          city: "Berlin",
          countryCode: "DE"
        }
      }
    ],
    causeId: "5fe69a07-8fd4-41c5-82b3-581f2a2198d8"
  },
  {
    _id: "dd2a835e-cef7-4f11-b1e4-a270cd178e18",
    name: "Movimiento educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Deprecator cruentus alveus auxilium. Sodalitas ratione odio laborum defetiscor nostrum optio adstringo aptus curriculum.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:39.944Z",
    updatedAt: "2026-01-11T21:58:39.944Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 10,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 29,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 91,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - discapacidad",
        description: "Evento presencial para discapacidad. Adflicto avaritia tui aestas utroque. Curtus ascit decet veniam substantia cognatus accendo accommodo deripio vereor.",
        initialDate: "2026-05-18T20:58:06.615Z",
        place: {
          direction: "6611 Kihn Neck, 478",
          city: "Bogotá",
          countryCode: "CO"
        }
      },
      {
        name: "Taller formativo - educación",
        description: "Evento presencial para educación. Defessus abeo abutor suus ocer nostrum sumptus argentum tego vinitor. Contra cunctatio cavus venio textilis cunctatio sponte.",
        initialDate: "2026-07-03T20:58:06.616Z",
        place: {
          direction: "86980 Gutkowski Cove, 79238",
          city: "Cusco",
          countryCode: "PE"
        }
      }
    ],
    causeId: "62e3592b-abfd-4753-91b6-63b278588ff4"
  },
  {
    _id: "6eb58672-9138-46c7-84e1-721204ec2c1a",
    name: "Movimiento infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Amet tui suscipio aduro ait attero talus. Velum desidero depromo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:40.005Z",
    updatedAt: "2026-01-11T21:58:40.005Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 393,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 979,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - infancia",
        description: "Evento presencial para infancia. Aestas tergo eligendi eos cupiditate paulatim aveho viduo terreo. Terror vesica illo cito bibo.",
        initialDate: "2026-06-19T20:58:06.679Z",
        place: {
          direction: "54526 Cullen Mount, 45170",
          city: "Rio de Janeiro",
          countryCode: "BR"
        }
      }
    ],
    causeId: "c1eddc8c-2252-415e-a7cf-c78bca867a29"
  },
  {
    _id: "9f39bdff-436e-4055-aee5-5ac40253125c",
    name: "Red de apoyo desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Vespillo votum ancilla canis balbus ciminatio exercitationem adfectus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:40.068Z",
    updatedAt: "2026-01-11T21:58:40.068Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 154,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 531,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - vivienda",
        description: "Evento presencial para vivienda. Adicio triduana testimonium eveniet spiritus.",
        initialDate: "2026-03-30T20:58:06.741Z",
        place: {
          direction: "349 Brooks Cove, 97188",
          city: "Bologna",
          countryCode: "IT"
        }
      },
      {
        name: "Reunión de coordinación - salud",
        description: "Evento presencial para salud. Distinctio contra utique.",
        initialDate: "2026-04-06T20:58:06.742Z",
        place: {
          direction: "19656 Alberta Lane, 9914",
          city: "Barquisimeto",
          countryCode: "VE"
        }
      }
    ],
    causeId: "c1950498-c36a-4e80-b30c-774c6c60e656"
  },
  {
    _id: "215411fc-a4a5-4edc-8c27-271a33949c3d",
    name: "Operación desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Pel cogito est ademptio vestrum verus cicuta. Degenero convoco depraedor cicuta thesaurus demonstro adversus omnis.",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:58:40.131Z",
    updatedAt: "2026-01-11T21:58:40.131Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 298,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Corpus speculum contabesco dolore iste cena numquam.",
        initialDate: "2026-06-10T20:58:06.803Z",
        place: {
          direction: "8811 Tennyson Road, 1843",
          city: "Guadalajara",
          countryCode: "MX"
        }
      },
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Deserunt degenero tollo virgo curvo blandior contra ara. Benevolentia caste subiungo sonitus claro vere corrumpo.",
        initialDate: "2026-04-08T20:58:06.803Z",
        place: {
          direction: "41139 W 10th Street, 2925",
          city: "Guadalajara",
          countryCode: "MX"
        }
      }
    ],
    causeId: "bb8ac1b9-bad1-49cf-a93c-666169265e42"
  },
  {
    _id: "0ee6287e-324b-4cf0-a396-7a733519a496",
    name: "Jornada salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Vinitor vacuus sustineo consequatur deduco adficio.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:40.254Z",
    updatedAt: "2026-01-11T21:58:40.254Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 93,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 191,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - derechos humanos",
        description: "Evento presencial para derechos humanos. Solitudo vomica desparatus saepe viriliter.",
        initialDate: "2026-03-03T21:58:06.929Z",
        place: {
          direction: "833 Petra Hollow, 776",
          city: "Rosario",
          countryCode: "AR"
        }
      },
      {
        name: "Encuentro comunitario - infancia",
        description: "Evento presencial para infancia. Thalassinus sui villa. Cogito subiungo aranea collum ceno crepusculum caries vinculum virgo.",
        initialDate: "2026-06-16T20:58:06.929Z",
        place: {
          direction: "674 Hauck Court, 492",
          city: "Lima",
          countryCode: "PE"
        }
      }
    ],
    causeId: "0e6c6c7b-7163-400e-8c87-50ad6c332784"
  },
  {
    _id: "696d0482-acd6-42bb-8ff5-800ceef9b331",
    name: "Acción solidaria desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Cupio viridis curvo. Ambulo voro velit possimus.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:40.325Z",
    updatedAt: "2026-01-11T21:58:40.325Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 900,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - pobreza",
        description: "Evento presencial para pobreza. Sol crepusculum vitium deprecator alioqui sunt quos distinctio caries totus.",
        initialDate: "2026-04-28T20:58:06.992Z",
        place: {
          direction: "7382 Renee Oval, 680",
          city: "Caracas",
          countryCode: "VE"
        }
      },
      {
        name: "Jornada solidaria - infancia",
        description: "Evento presencial para infancia. Nostrum benigne argumentum sperno quasi vitiosus consectetur tantillus cohors utrimque. Beatae suppellex solitudo capio.",
        initialDate: "2026-01-31T21:58:06.992Z",
        place: {
          direction: "5380 Batz Oval, 236",
          city: "Torino",
          countryCode: "IT"
        }
      }
    ],
    causeId: "fe249097-ae58-4991-974d-4047dde643af"
  },
  {
    _id: "0046227a-37b6-438e-93e0-1fbcb19e5002",
    name: "Operación emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Trepide pauci velociter cupiditate capitulus amet teneo. Sollers alo saepe pax audeo provident attollo viscus dolor.",
    status: "pending",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:07.070Z",
    updatedAt: "2026-01-11T21:58:07.070Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 33,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 128,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 444,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - alimentación",
        description: "Evento presencial para alimentación. Defleo nobis abundans adiuvo. Audeo dapifer vis recusandae.",
        initialDate: "2026-04-08T20:58:07.055Z",
        place: {
          direction: "9236 Donnelly Avenue, 847",
          city: "Valencia",
          countryCode: "ES"
        }
      },
      {
        name: "Taller formativo - vivienda",
        description: "Evento presencial para vivienda. Iure solitudo calculus.",
        initialDate: "2026-04-12T20:58:07.056Z",
        place: {
          direction: "392 Hunter Viaduct, 2192",
          city: "Madrid",
          countryCode: "ES"
        }
      }
    ],
    causeId: "7c63eb8c-46c0-4f8d-91fe-c98ec4d15455"
  },
  {
    _id: "0a35e9de-b264-4b11-a3a3-fe85f524c489",
    name: "Jornada igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Sonitus virga adflicto umbra vomito auctor aliqua arx. Caput culpo dolorum ad molestiae calculus speciosus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:58:40.459Z",
    updatedAt: "2026-01-11T21:58:40.459Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 789,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - medio ambiente",
        description: "Evento presencial para medio ambiente. Adamo ipsum aequitas vel canto commodo arbor voluptatum clam.",
        initialDate: "2026-06-19T20:58:07.119Z",
        place: {
          direction: "829 Dickens Summit, 939",
          city: "Marseille",
          countryCode: "FR"
        }
      },
      {
        name: "Actividad de voluntariado - refugiados",
        description: "Evento presencial para refugiados. Cumque anser neque volva suffragium sursum vinco comedo. Valde minus comes accusantium caelestis ante culpo vitiosus verecundia.",
        initialDate: "2026-06-16T20:58:07.119Z",
        place: {
          direction: "2991 Treva Creek, 2281",
          city: "Cusco",
          countryCode: "PE"
        }
      }
    ],
    causeId: "e3ed3f33-0999-44b8-b232-e423030cbdef"
  },
  {
    _id: "6071b579-2ff9-4466-af6b-214e57a0ca52",
    name: "Proyecto agua potable 2027",
    description: "Acción concreta para agua potable con objetivos cuantificables. Vomito confugo harum clamo bonus inventore. Talis cura voluntarius carcer ex avaritia.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:40.521Z",
    updatedAt: "2026-01-11T21:58:40.521Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 416,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - agua potable",
        description: "Evento presencial para agua potable. Corrigo comptus compello cruentus aestivus arcus acceptus repellendus.",
        initialDate: "2026-04-08T20:58:07.181Z",
        place: {
          direction: "309 Juston Light, 14551",
          city: "São Paulo",
          countryCode: "BR"
        }
      }
    ],
    causeId: "4db56792-f2cf-440a-a7bc-5a3b63584e42"
  },
  {
    _id: "272ef60c-adb1-4563-b936-cd6665190fb2",
    name: "Movimiento derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Caveo decumbo absorbeo depraedor. Vulnero cerno cicuta verto comptus consequatur crinis vis illum corpus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:40.648Z",
    updatedAt: "2026-01-11T21:58:40.648Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 939,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 56,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 22,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - emergencias",
        description: "Evento presencial para emergencias. Subiungo sub adstringo vaco ipsam. Nam subiungo suscipit depereo.",
        initialDate: "2026-03-14T21:58:07.305Z",
        place: {
          direction: "6872 Madge Point, 5263",
          city: "Fortaleza",
          countryCode: "BR"
        }
      },
      {
        name: "Encuentro comunitario - pobreza",
        description: "Evento presencial para pobreza. Coepi ventosus ventosus tabula curriculum bardus.",
        initialDate: "2026-01-27T21:58:07.306Z",
        place: {
          direction: "584 Orie Loop, 773",
          city: "Tucumán",
          countryCode: "AR"
        }
      }
    ],
    causeId: "c96f87e1-26c3-4925-94f8-538145cbc249"
  },
  {
    _id: "a726e21e-2028-44d8-a679-546279e0a207",
    name: "Jornada agua potable 2027",
    description: "Acción concreta para agua potable con objetivos cuantificables. Compono curto adulatio vestigium terra sopor contra auctus.",
    status: "pending",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:07.380Z",
    updatedAt: "2026-01-11T21:58:07.380Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 934,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 376,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 781,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - refugiados",
        description: "Evento presencial para refugiados. Explicabo quas delectatio ter.",
        initialDate: "2026-04-10T20:58:07.367Z",
        place: {
          direction: "7900 E 3rd Street, 8009",
          city: "Valparaíso",
          countryCode: "CL"
        }
      },
      {
        name: "Encuentro comunitario - agua potable",
        description: "Evento presencial para agua potable. Solio ciminatio sponte virtus utor cogo adeo advoco.",
        initialDate: "2026-03-17T21:58:07.368Z",
        place: {
          direction: "882 Hirthe Crest, 1601",
          city: "Cusco",
          countryCode: "PE"
        }
      }
    ],
    causeId: "6c0df724-632a-4236-b4c8-5108880c7bcd"
  },
  {
    _id: "1882dea2-102f-4e6c-86e6-c6c9fa89cc2c",
    name: "Programa vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Totidem summopere approbo ustilo vitae.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:40.774Z",
    updatedAt: "2026-01-11T21:58:40.774Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 344,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - agua potable",
        description: "Evento presencial para agua potable. Aeger viduo cedo cunabula.",
        initialDate: "2026-04-24T20:58:07.430Z",
        place: {
          direction: "4755 Park Avenue, 3810",
          city: "São Paulo",
          countryCode: "BR"
        }
      },
      {
        name: "Evento benéfico - educación",
        description: "Evento presencial para educación. Amoveo auditor avarus stultus amor adsuesco approbo.",
        initialDate: "2026-01-24T21:58:07.430Z",
        place: {
          direction: "227 Kertzmann Row, 776",
          city: "Barranquilla",
          countryCode: "CO"
        }
      }
    ],
    causeId: "c1cead8a-3ab0-402d-bc0e-b0dfb6f1a72f"
  },
  {
    _id: "71effa85-7746-4490-ae70-50d35a0d2a36",
    name: "Programa refugiados 2027",
    description: "Acción concreta para refugiados con objetivos cuantificables. Demo aer aggero animus omnis suscipio perferendis. Adversus depereo cinis comedo admoneo bis textus aestas perferendis tricesimus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:40.835Z",
    updatedAt: "2026-01-11T21:58:40.835Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 600,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 1000,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 674,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - tercera edad",
        description: "Evento presencial para tercera edad. Tyrannus caritas tabgo.",
        initialDate: "2026-01-21T21:58:07.492Z",
        place: {
          direction: "969 Suzanne Key, 73059",
          city: "Barranquilla",
          countryCode: "CO"
        }
      }
    ],
    causeId: "c1950498-c36a-4e80-b30c-774c6c60e656"
  },
  {
    _id: "0891b615-bd97-4b68-8209-1d2539ddc0b8",
    name: "Proyecto desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Decipio acies avarus defungo terebro dolorum angustus.",
    status: "pending",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:58:07.567Z",
    updatedAt: "2026-01-11T21:58:07.567Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 373,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 560,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 81,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - pobreza",
        description: "Evento presencial para pobreza. Veritas adduco adversus peior virgo quos. Acceptus antea voluptatum artificiose.",
        initialDate: "2026-03-03T21:58:07.554Z",
        place: {
          direction: "3207 S Broadway, 9687",
          city: "Valparaíso",
          countryCode: "CL"
        }
      },
      {
        name: "Jornada solidaria - salud",
        description: "Evento presencial para salud. Adamo tunc tondeo crepusculum corrigo vis. Eius tenetur cibus stultus accendo quia autus agnosco centum.",
        initialDate: "2026-05-16T20:58:07.554Z",
        place: {
          direction: "416 Hill Road, 688",
          city: "Manchester",
          countryCode: "GB"
        }
      }
    ],
    causeId: "39251fc7-43fd-4368-8970-921ddcbbf104"
  },
  {
    _id: "39be911d-50bb-4a05-af71-6b00bc948c60",
    name: "Iniciativa tercera edad 2026",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Cognomen dolores conspergo sumptus creator vado advenio. Copiose aequus adsidue temperantia comedo delinquo porro exercitationem.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:58:40.961Z",
    updatedAt: "2026-01-11T21:58:40.961Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 431,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 947,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 198,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - salud",
        description: "Evento presencial para salud. Claustrum umbra molestiae delectatio agnitio cotidie assumenda animus.",
        initialDate: "2026-04-03T20:58:07.616Z",
        place: {
          direction: "821 N Harrison Street, 680",
          city: "São Paulo",
          countryCode: "BR"
        }
      }
    ],
    causeId: "beeeec80-f1ed-4eb7-89cc-2c495b950822"
  },
  {
    _id: "3fb65c2f-da25-4351-ab51-786abd974963",
    name: "Proyecto agua potable 2027",
    description: "Acción concreta para agua potable con objetivos cuantificables. Degero agnosco compello acsi clamo conicio vitiosus demergo cubicularis. Derelinquo pecco appono aperio tardus adstringo avaritia acidus",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:41.024Z",
    updatedAt: "2026-01-11T21:58:41.024Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 519,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 225,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - derechos humanos",
        description: "Evento presencial para derechos humanos. Absum advenio sequi vobis arca ceno earum creta aliquid soleo.",
        initialDate: "2026-07-06T20:58:07.680Z",
        place: {
          direction: "441 Taylor Grove, 55521",
          city: "London",
          countryCode: "GB"
        }
      },
      {
        name: "Evento benéfico - agua potable",
        description: "Evento presencial para agua potable. Agnosco acer nobis cultura aestivus.",
        initialDate: "2026-05-19T20:58:07.680Z",
        place: {
          direction: "7635 Prince Pass, 6248",
          city: "Tucumán",
          countryCode: "AR"
        }
      }
    ],
    causeId: "a1f4eb96-e668-47e4-97b3-f8e63f188314"
  },
  {
    _id: "a3afb1f4-70b0-4e0e-9fdf-0dd847d0cc64",
    name: "Proyecto infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Nam crepusculum decerno conicio absorbeo ipsam aliquid.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:41.211Z",
    updatedAt: "2026-01-11T21:58:41.211Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 135,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - pobreza",
        description: "Evento presencial para pobreza. Templum deorsum arguo conduco clibanus arx deporto tero stella debeo.",
        initialDate: "2026-06-23T20:58:07.866Z",
        place: {
          direction: "867 Larson Street, 71962",
          city: "Antofagasta",
          countryCode: "CL"
        }
      }
    ],
    causeId: "c7321708-8819-4381-8b2c-cbc5e052aeb7"
  },
  {
    _id: "cdd00dc6-d88c-4937-a40d-e0101cf2bcea",
    name: "Red de apoyo educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Decens vado optio comparo. Damno charisma crepusculum xiphias.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:41.274Z",
    updatedAt: "2026-01-11T21:58:41.274Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 330,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 478,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - refugiados",
        description: "Evento presencial para refugiados. Cumque animi bellum uberrime demo traho tendo ait magni. At vinitor maiores volutabrum arceo.",
        initialDate: "2026-07-13T20:58:07.929Z",
        place: {
          direction: "772 Benjamin Light, 6414",
          city: "Lyon",
          countryCode: "FR"
        }
      }
    ],
    causeId: "6e85b55a-c65d-4cb3-a6df-94df7de08db6"
  },
  {
    _id: "cb31051a-bdd9-456e-9f7f-102706a60d54",
    name: "Programa medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Tempore amplitudo umbra peior.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:41.463Z",
    updatedAt: "2026-01-11T21:58:41.463Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 715,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 590,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - agua potable",
        description: "Evento presencial para agua potable. Apto angelus error. Patruus viriliter arcesso cohibeo termes.",
        initialDate: "2026-04-17T20:58:08.117Z",
        place: {
          direction: "28695 The Willows, 757",
          city: "Lille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "533a4788-4be8-43bd-8115-bf8ac9f6f9ae"
  },
  {
    _id: "d2111335-0420-4fd8-8230-5d7502d52ff6",
    name: "Red de apoyo derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Uterque thesis denuncio. Cum tener tripudio arma aegrus doloremque creta.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:41.525Z",
    updatedAt: "2026-01-11T21:58:41.525Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 699,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 186,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - discapacidad",
        description: "Evento presencial para discapacidad. Demergo possimus debeo viduo venustas venia substantia. Bellicus timor audeo.",
        initialDate: "2026-06-13T20:58:08.178Z",
        place: {
          direction: "683 Hickle Valley, 6712",
          city: "Salvador",
          countryCode: "BR"
        }
      },
      {
        name: "Actividad de voluntariado - refugiados",
        description: "Evento presencial para refugiados. Sordeo sursum veniam comminor paulatim tamisium atque. Vitae crapula vobis dapifer depono.",
        initialDate: "2026-03-12T21:58:08.178Z",
        place: {
          direction: "1695 Crown Street, 60124",
          city: "Trujillo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "ae3eb1ec-3e16-4835-a8c9-06df78246056"
  },
  {
    _id: "47a57490-4f5b-42e1-b39b-a2cf13955d87",
    name: "Proyecto refugiados 2027",
    description: "Acción concreta para refugiados con objetivos cuantificables. Trepide custodia vix admoneo curo adversus crastinus asper cena. Degenero demum pauci.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:41.587Z",
    updatedAt: "2026-01-11T21:58:41.587Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 453,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 797,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 932,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Deprimo subseco esse demo terminatio perferendis catena.",
        initialDate: "2026-06-23T20:58:08.241Z",
        place: {
          direction: "7061 Hilda Port, 835",
          city: "Firenze",
          countryCode: "IT"
        }
      },
      {
        name: "Evento benéfico - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Verbum varietas depromo velit magni cicuta subvenio.",
        initialDate: "2026-02-08T21:58:08.241Z",
        place: {
          direction: "6099 Gerhold Extensions, 825",
          city: "Trujillo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "c1da8a58-c13a-43a7-bd97-935656227b98"
  },
  {
    _id: "82ffaf7f-93f6-4b78-9576-2742729eeec7",
    name: "Operación salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Defaeco aeternus deputo comedo atrocitas. Varietas amiculum ipsa supra defluo desparatus absens.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:41.649Z",
    updatedAt: "2026-01-11T21:58:41.649Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 443,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Callide utpote abstergo accusamus deprecator patria aufero. Pel abstergo usque ventosus curiositas corrumpo.",
        initialDate: "2026-03-10T21:58:08.302Z",
        place: {
          direction: "4257 Arden Trafficway, 791",
          city: "Fortaleza",
          countryCode: "BR"
        }
      }
    ],
    causeId: "f8b59a9a-bacf-4909-ad22-aa5a69507c93"
  },
  {
    _id: "b0f3a256-6bff-4601-bb50-ca74dd5cee4b",
    name: "Campaña salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Careo universe itaque delinquo suasoria voluntarius audentia speciosus ullus adstringo.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:41.712Z",
    updatedAt: "2026-01-11T21:58:41.712Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 797,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 245,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - educación",
        description: "Evento presencial para educación. Soluta cum pax sustineo defetiscor enim cognatus aeternus alius una. Sui amoveo summa soluta sapiente tenax derelinquo.",
        initialDate: "2026-04-03T20:58:08.365Z",
        place: {
          direction: "32458 Garland Club, 9498",
          city: "London",
          countryCode: "GB"
        }
      },
      {
        name: "Taller formativo - emergencias",
        description: "Evento presencial para emergencias. Adficio spes torqueo decerno pecto aut libero fuga cauda. Demens dens tui admoveo earum argumentum iste umquam theatrum pecus.",
        initialDate: "2026-04-22T20:58:08.365Z",
        place: {
          direction: "191 Beach Road, 8618",
          city: "La Serena",
          countryCode: "CL"
        }
      }
    ],
    causeId: "96a38731-a79d-4a87-b36e-7e56e358cfbc"
  },
  {
    _id: "5950b6f6-f40d-4766-a57c-74bd39db1d9c",
    name: "Operación vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Uberrime depopulo viscus aggredior acceptus verbum sui uter calcar. Asporto enim curis tantillus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:41.836Z",
    updatedAt: "2026-01-11T21:58:41.836Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 815,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 19,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 609,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - vivienda",
        description: "Evento presencial para vivienda. Vis aureus studio vesica cupressus victoria acquiro vox desolo. Cicuta iure vis condico.",
        initialDate: "2026-04-17T20:58:08.487Z",
        place: {
          direction: "110 Kihn Fort, 40543",
          city: "Lille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "1655f209-6028-4d1f-ad9b-85f5cf0d4626"
  },
  {
    _id: "e77cd11e-b279-43b2-a5df-6cf8f8c7203e",
    name: "Red de apoyo derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Statim vestrum bardus video.",
    status: "approved",
    reason: "",
    userId: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    createdAt: "2026-01-11T21:58:41.898Z",
    updatedAt: "2026-01-11T21:58:41.898Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 12,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 191,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - salud",
        description: "Evento presencial para salud. Fugiat aestus sunt. Speculum pauci necessitatibus cunae.",
        initialDate: "2026-05-04T20:58:08.549Z",
        place: {
          direction: "2758 Lane Land, 66789",
          city: "Antofagasta",
          countryCode: "CL"
        }
      }
    ],
    causeId: "166f4fd8-8e58-4773-8567-41195e1dfbb3"
  },
  {
    _id: "fe1027d4-787f-425c-b312-4e6496ec3e4e",
    name: "Acción solidaria tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Utpote argentum sit curriculum. Tantillus voluptates surculus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:41.960Z",
    updatedAt: "2026-01-11T21:58:41.960Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 478,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 488,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 588,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - pobreza",
        description: "Evento presencial para pobreza. Cibus vorax porro theologus curatio desipio suscipit armarium thymbra tactus.",
        initialDate: "2026-03-31T20:58:08.612Z",
        place: {
          direction: "773 Ericka Knoll, 1145",
          city: "Bucaramanga",
          countryCode: "CO"
        }
      },
      {
        name: "Evento benéfico - refugiados",
        description: "Evento presencial para refugiados. Suggero talus delectus virtus solitudo comedo spargo.",
        initialDate: "2026-06-29T20:58:08.612Z",
        place: {
          direction: "2090 Dicki Valleys, 26877",
          city: "Sevilla",
          countryCode: "ES"
        }
      }
    ],
    causeId: "5fe69a07-8fd4-41c5-82b3-581f2a2198d8"
  },
  {
    _id: "90a5b3dc-a47f-4508-bd13-138cab806853",
    name: "Campaña discapacidad 2026",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Quibusdam sumo tam aeger sophismata aedificium.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:42.271Z",
    updatedAt: "2026-01-11T21:58:42.271Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 18,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 134,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - discapacidad",
        description: "Evento presencial para discapacidad. Decerno custodia deludo aperte cado uberrime callide excepturi.",
        initialDate: "2026-07-02T20:58:08.921Z",
        place: {
          direction: "550 Warren Road, 8265",
          city: "Edinburgh",
          countryCode: "GB"
        }
      }
    ],
    causeId: "f70f1d8d-19b7-44c5-ad0c-9745941d1bea"
  },
  {
    _id: "c0944588-e62f-47b0-b1fa-1d1f5f1e40cf",
    name: "Iniciativa vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Deporto architecto uterque curo ancilla canis terror.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:58:42.334Z",
    updatedAt: "2026-01-11T21:58:42.334Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 871,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - igualdad de género",
        description: "Evento presencial para igualdad de género. Vito spargo una audacia catena caute beneficium.",
        initialDate: "2026-05-06T20:58:08.983Z",
        place: {
          direction: "55310 Edna Rue, 35951",
          city: "Glasgow",
          countryCode: "GB"
        }
      }
    ],
    causeId: "f989a411-0aa6-4825-984a-32194fcfdf5a"
  },
  {
    _id: "42f0552b-a682-4544-b84b-4bd3365e05a2",
    name: "Red de apoyo igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Ventito mollitia solus tricesimus compono facere. Arbor perspiciatis adicio creator trepide sponte impedit cupressus utilis decret",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:42.397Z",
    updatedAt: "2026-01-11T21:58:42.397Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 143,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 94,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 332,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - agua potable",
        description: "Evento presencial para agua potable. Tardus vita vilis aperio audacia viridis claustrum suppellex acceptus complectus. Defluo textor una adhuc alo amoveo modi una.",
        initialDate: "2026-01-29T21:58:09.046Z",
        place: {
          direction: "4069 Leonel Cove, 870",
          city: "Chiclayo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "e49ea717-bdfb-4020-8f5f-7a4be362f9cd"
  },
  {
    _id: "7ffdae57-341a-4b87-98cc-9a7e3a1fb9d1",
    name: "Jornada alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Depereo combibo urbs suspendo tabella administratio absque alius. Universe vorago sub adsidue.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:42.465Z",
    updatedAt: "2026-01-11T21:58:42.465Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 281,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - vivienda",
        description: "Evento presencial para vivienda. Adinventitias ipsum curatio ater illo.",
        initialDate: "2026-06-29T20:58:09.109Z",
        place: {
          direction: "918 Jeffrey Wall, 668",
          city: "Brasília",
          countryCode: "BR"
        }
      }
    ],
    causeId: "c2219f93-d86a-4911-a994-1d0ce4c6c654"
  },
  {
    _id: "ec5ffb4a-0528-4961-ae5d-1acd4dfdd9d4",
    name: "Iniciativa agua potable 2026",
    description: "Acción concreta para agua potable con objetivos cuantificables. Cavus amo taceo consectetur convoco altus apparatus vetus sequi capillus. Tolero speciosus utrimque urbanus a suppellex considero super ",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:58:42.599Z",
    updatedAt: "2026-01-11T21:58:42.599Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 313,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Volva cedo clementia creo thesis paulatim optio celer. Eligendi veritatis ustilo defendo.",
        initialDate: "2026-06-17T20:58:09.236Z",
        place: {
          direction: "6055 Edwardo Path, 5291",
          city: "Venezia",
          countryCode: "IT"
        }
      },
      {
        name: "Encuentro comunitario - refugiados",
        description: "Evento presencial para refugiados. Defendo adimpleo bene unde comburo voluptatibus crudelis alo.",
        initialDate: "2026-03-08T21:58:09.236Z",
        place: {
          direction: "55806 Yazmin Lock, 60796",
          city: "Rosario",
          countryCode: "AR"
        }
      }
    ],
    causeId: "1f892f51-33ae-48d4-880c-4f56b7dc763c"
  },
  {
    _id: "85455461-fa59-4b72-a46b-a8607f971ef9",
    name: "Programa derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Cultura ambulo provident.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:42.663Z",
    updatedAt: "2026-01-11T21:58:42.663Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 910,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 997,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 558,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - discapacidad",
        description: "Evento presencial para discapacidad. Synagoga pauper tempus thema avarus amissio aspernatur. Pauper ad depopulo dolores.",
        initialDate: "2026-02-12T21:58:09.298Z",
        place: {
          direction: "40346 Martin Luther King Drive, 5325",
          city: "Cancún",
          countryCode: "MX"
        }
      }
    ],
    causeId: "35fce5d7-da0b-43fa-8bb7-a2786eb71046"
  },
  {
    _id: "33bd3000-3cef-43ab-9a94-ce3d3cae6e7d",
    name: "Programa emergencias 2027",
    description: "Acción concreta para emergencias con objetivos cuantificables. Defaeco tactus benevolentia cervus.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:42.725Z",
    updatedAt: "2026-01-11T21:58:42.725Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 48,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 37,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - emergencias",
        description: "Evento presencial para emergencias. Comptus desolo audio thema venia surgo.",
        initialDate: "2026-03-10T21:58:09.359Z",
        place: {
          direction: "24957 Thad Manor, 217",
          city: "Cologne",
          countryCode: "DE"
        }
      }
    ],
    causeId: "040745db-9eaa-448d-b9fa-dbbb34444aa9"
  },
  {
    _id: "7895d84a-3c72-4ae1-acc0-1becf91ef1ef",
    name: "Red de apoyo salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Illo cimentarius urbanus aetas adstringo vel tonsor cimentarius aegre ad.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:42.912Z",
    updatedAt: "2026-01-11T21:58:42.912Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 938,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 470,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - alimentación",
        description: "Evento presencial para alimentación. Theatrum umerus sulum audeo apparatus culpa.",
        initialDate: "2026-02-19T21:58:09.545Z",
        place: {
          direction: "123 Lance Shoal, 1044",
          city: "Monterrey",
          countryCode: "MX"
        }
      }
    ],
    causeId: "71421cef-8292-438a-b99a-89b4811faaf7"
  },
  {
    _id: "98afbac1-5fac-40c6-a713-cc5cda5de741",
    name: "Iniciativa salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Umerus venustas quasi. Nam fugit undique basium adhuc creptio cicuta.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:42.973Z",
    updatedAt: "2026-01-11T21:58:42.973Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 556,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - salud",
        description: "Evento presencial para salud. Celer adeptio deprecator caput tibi vir numquam talus demum dolorum. Sint saepe triumphus ars curso verbum tristis apparatus decens.",
        initialDate: "2026-07-17T20:58:09.606Z",
        place: {
          direction: "3934 Rutherford Walks, 2129",
          city: "Salvador",
          countryCode: "BR"
        }
      }
    ],
    causeId: "13653ee5-63f9-451a-8513-3121f89d3cad"
  },
  {
    _id: "d86cb075-1da8-4def-9335-fea319f5dda2",
    name: "Operación infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Vester debilito temeritas taceo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    createdAt: "2026-01-11T21:58:43.036Z",
    updatedAt: "2026-01-11T21:58:43.036Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 279,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 143,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Adeo delibero cupiditate vestigium. Tempus sto aegrus.",
        initialDate: "2026-06-13T20:58:09.668Z",
        place: {
          direction: "41755 Cumberland Street, 284",
          city: "Lille",
          countryCode: "FR"
        }
      },
      {
        name: "Reunión de coordinación - discapacidad",
        description: "Evento presencial para discapacidad. Concedo nesciunt tempore. Pauci nemo dedecor tibi quam torqueo vitiosus.",
        initialDate: "2026-06-10T20:58:09.668Z",
        place: {
          direction: "67451 Camila Dale, 15429",
          city: "Frankfurt",
          countryCode: "DE"
        }
      }
    ],
    causeId: "46a9615f-da73-4c22-b03a-0feb2d43a378"
  },
  {
    _id: "7b2c1ebb-2a59-45ec-af4f-ebb2aac50127",
    name: "Proyecto medio ambiente 2027",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Nulla aequus bene supra studio thymum aduro.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:43.099Z",
    updatedAt: "2026-01-11T21:58:43.099Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 29,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - educación",
        description: "Evento presencial para educación. Tui beatae crux.",
        initialDate: "2026-05-14T20:58:09.731Z",
        place: {
          direction: "9878 The Oaks, 95665",
          city: "Cali",
          countryCode: "CO"
        }
      },
      {
        name: "Reunión de coordinación - salud",
        description: "Evento presencial para salud. Bibo repellendus aeternus. Fuga trado virtus amiculum absum amoveo caecus claro suggero.",
        initialDate: "2026-03-31T20:58:09.731Z",
        place: {
          direction: "6906 Jonathon Meadows, 5932",
          city: "Málaga",
          countryCode: "ES"
        }
      }
    ],
    causeId: "6632c65a-7e07-4590-ae1f-f2c92af19be4"
  },
  {
    _id: "065dae96-fca6-4b8c-8627-0d3343fe40d5",
    name: "Programa agua potable 2027",
    description: "Acción concreta para agua potable con objetivos cuantificables. Atrox tendo acer uterque.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:43.227Z",
    updatedAt: "2026-01-11T21:58:43.227Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 666,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 808,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 991,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Aeger sol sub pectus sursum capio. Volubilis adamo callide abutor absconditus debeo textilis conicio quos aurum.",
        initialDate: "2026-02-06T21:58:09.855Z",
        place: {
          direction: "3611 Nader View, 2274",
          city: "Fortaleza",
          countryCode: "BR"
        }
      },
      {
        name: "Jornada solidaria - vivienda",
        description: "Evento presencial para vivienda. Asperiores facilis quam earum enim centum tredecim accedo amo acidus. Allatus abeo maxime.",
        initialDate: "2026-03-19T21:58:09.855Z",
        place: {
          direction: "870 Church Path, 577",
          city: "Antofagasta",
          countryCode: "CL"
        }
      }
    ],
    causeId: "2bb53149-695b-4930-b50d-9ed9f4511cc8"
  },
  {
    _id: "93f3b7b9-1a22-4f3a-9156-d6cd277a965d",
    name: "Campaña alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Eligendi tenus deinde. Arcesso arma demum summisse sulum abeo molestias ceno voluptas.",
    status: "approved",
    reason: "",
    userId: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    createdAt: "2026-01-11T21:58:43.301Z",
    updatedAt: "2026-01-11T21:58:43.301Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 85,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 350,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 510,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - vivienda",
        description: "Evento presencial para vivienda. Vallum stillicidium arca sed amplitudo reiciendis voluptatem officia. Somnus totus xiphias aggero vestigium adipiscor cruentus id varius harum.",
        initialDate: "2026-01-28T21:58:09.917Z",
        place: {
          direction: "5863 Stracke Station, 73193",
          city: "Rosario",
          countryCode: "AR"
        }
      },
      {
        name: "Evento benéfico - vivienda",
        description: "Evento presencial para vivienda. Sint argumentum artificiose vitiosus amplus cohaero accusamus congregatio sulum.",
        initialDate: "2026-01-24T21:58:09.918Z",
        place: {
          direction: "29034 Monte Parks, 89055",
          city: "Bilbao",
          countryCode: "ES"
        }
      }
    ],
    causeId: "f989a411-0aa6-4825-984a-32194fcfdf5a"
  },
  {
    _id: "9f02a43a-b0d2-4309-b27a-2e5260568fb1",
    name: "Programa refugiados 2026",
    description: "Acción concreta para refugiados con objetivos cuantificables. Atqui tribuo quae pecto.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:43.422Z",
    updatedAt: "2026-01-11T21:58:43.422Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 299,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 168,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - refugiados",
        description: "Evento presencial para refugiados. Depereo quos caecus clarus aggredior sit audax balbus. Tolero varietas suasoria calcar ut quibusdam.",
        initialDate: "2026-05-10T20:58:10.044Z",
        place: {
          direction: "5480 Beech Grove, 240",
          city: "Cartagena",
          countryCode: "CO"
        }
      }
    ],
    causeId: "2bb53149-695b-4930-b50d-9ed9f4511cc8"
  },
  {
    _id: "95a6acfd-1bf1-44b9-b9e9-18bcfd5f446f",
    name: "Iniciativa derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Commodi terreo pecto nam curiositas venio vox volubilis. Complectus defleo tamdiu amiculum antea quos modi nisi.",
    status: "approved",
    reason: "",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:58:43.487Z",
    updatedAt: "2026-01-11T21:58:43.487Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 842,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 439,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Pauper perferendis ipsam cruentus vulariter calcar. Harum utroque audax.",
        initialDate: "2026-04-20T20:58:10.107Z",
        place: {
          direction: "664 Goyette Underpass, 6235",
          city: "Bilbao",
          countryCode: "ES"
        }
      },
      {
        name: "Reunión de coordinación - vivienda",
        description: "Evento presencial para vivienda. Tactus labore denuo decerno administratio derideo succurro terebro. Varius stips attero theologus velit veritatis uredo benevolentia textus.",
        initialDate: "2026-03-14T21:58:10.108Z",
        place: {
          direction: "4637 West View, 959",
          city: "Barcelona",
          countryCode: "ES"
        }
      }
    ],
    causeId: "0131fa6c-8a92-4ede-93f8-c863c624bcae"
  },
  {
    _id: "e82f3e87-9559-428e-883e-b3c76a2a096c",
    name: "Campaña desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Ambulo una apparatus aperio dedecor conor turbo patior vapulus. Capillus aeger abeo.",
    status: "pending",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:10.184Z",
    updatedAt: "2026-01-11T21:58:10.184Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 975,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 611,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 562,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - discapacidad",
        description: "Evento presencial para discapacidad. Utroque delego timidus administratio. Adipisci capitulus triumphus et cum degusto cariosus tabernus.",
        initialDate: "2026-05-21T20:58:10.170Z",
        place: {
          direction: "206 Trantow Shoals, 43985",
          city: "Zaragoza",
          countryCode: "ES"
        }
      }
    ],
    causeId: "05b1ca5b-adcd-4181-b438-2b0f6a5f3515"
  },
  {
    _id: "564161fc-2e6e-48ba-808c-3bf0f1422947",
    name: "Iniciativa igualdad de género 2027",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Aequitas suspendo coaegresco ver tergeo depopulo cunabula comparo arceo. Tabgo subiungo patior tego quaerat cavus.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:43.610Z",
    updatedAt: "2026-01-11T21:58:43.610Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 531,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 235,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - igualdad de género",
        description: "Evento presencial para igualdad de género. Aurum tergo illo maxime armarium video amet. Cupio sto contra strenuus vobis necessitatibus traho suspendo tres derideo.",
        initialDate: "2026-03-31T20:58:10.233Z",
        place: {
          direction: "929 Mosciski Drive, 94498",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      },
      {
        name: "Actividad de voluntariado - agua potable",
        description: "Evento presencial para agua potable. Vulticulus allatus arto animi harum demum.",
        initialDate: "2026-04-27T20:58:10.233Z",
        place: {
          direction: "414 Maggio Prairie, 698",
          city: "Trujillo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "3f1c2650-8608-4f67-9b8c-454addeeb255"
  },
  {
    _id: "51f71a35-0f37-4cf2-896e-994a6c732604",
    name: "Operación desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Torqueo carmen deleo pauper. Terga cursim videlicet.",
    status: "approved",
    reason: "",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:58:43.734Z",
    updatedAt: "2026-01-11T21:58:43.734Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 135,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 655,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - vivienda",
        description: "Evento presencial para vivienda. Voluptas tabella clamo deinde curiositas modi trucido nulla astrum. Stillicidium supplanto praesentium arma optio.",
        initialDate: "2026-02-03T21:58:10.357Z",
        place: {
          direction: "12695 Goldner Island, 615",
          city: "Rosario",
          countryCode: "AR"
        }
      },
      {
        name: "Encuentro comunitario - educación",
        description: "Evento presencial para educación. Amiculum arbustum abutor verto suus delinquo sumo. Atqui confugo suppellex aiunt deripio delectatio balbus vos.",
        initialDate: "2026-05-20T20:58:10.357Z",
        place: {
          direction: "71978 Koch Orchard, 3681",
          city: "Firenze",
          countryCode: "IT"
        }
      }
    ],
    causeId: "17966f2e-bf54-47f1-b860-a8aebd129c34"
  },
  {
    _id: "536fce89-584e-4633-b6aa-a94e3e2c979c",
    name: "Programa igualdad de género 2027",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Subito cattus comptus cursus deripio delego dapifer auctor virgo.",
    status: "pending",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:10.495Z",
    updatedAt: "2026-01-11T21:58:10.495Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 810,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 512,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - vivienda",
        description: "Evento presencial para vivienda. Vigilo uter acceptus corporis corroboro capio vespillo textilis.",
        initialDate: "2026-02-10T21:58:10.482Z",
        place: {
          direction: "374 Julianne Fort, 73401",
          city: "Arequipa",
          countryCode: "PE"
        }
      }
    ],
    causeId: "0d8d9f00-7059-4cdc-a28d-188382cff2e5"
  },
  {
    _id: "8765ddba-2d33-4ecf-bee2-a6cf2814e8dc",
    name: "Acción solidaria infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Corpus urbanus vespillo ubi sustineo inventore vesica. Defaeco aegrus repellat terra tredecim adipisci.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    createdAt: "2026-01-11T21:58:43.984Z",
    updatedAt: "2026-01-11T21:58:43.984Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 822,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - refugiados",
        description: "Evento presencial para refugiados. Cribro condico cuppedia.",
        initialDate: "2026-03-07T21:58:10.606Z",
        place: {
          direction: "543 Candida Alley, 856",
          city: "Zaragoza",
          countryCode: "ES"
        }
      },
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Quo dapifer acer. Pectus atrox beatae iure venia amo.",
        initialDate: "2026-07-11T20:58:10.606Z",
        place: {
          direction: "45382 Hawthorn Close, 9701",
          city: "Fortaleza",
          countryCode: "BR"
        }
      }
    ],
    causeId: "679524e3-79ea-4cea-814c-6140d1fa624b"
  },
  {
    _id: "8e0a480d-72ad-4663-97a3-211cd93ee412",
    name: "Proyecto desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Curiositas vacuus virgo colligo perspiciatis decens capto.",
    status: "approved",
    reason: "",
    userId: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    createdAt: "2026-01-11T21:58:44.046Z",
    updatedAt: "2026-01-11T21:58:44.046Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 21,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 856,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 552,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Animi debitis perferendis approbo temporibus damno laboriosam vos.",
        initialDate: "2026-04-01T20:58:10.669Z",
        place: {
          direction: "845 Langworth Burgs, 92929",
          city: "Tucumán",
          countryCode: "AR"
        }
      },
      {
        name: "Taller formativo - igualdad de género",
        description: "Evento presencial para igualdad de género. Collum carpo defetiscor aut vindico cilicium tredecim. Voluptates voveo anser amplus talus adiuvo civis vulticulus alius.",
        initialDate: "2026-07-15T20:58:10.669Z",
        place: {
          direction: "584 Jewell Parkway, 1406",
          city: "Frankfurt",
          countryCode: "DE"
        }
      }
    ],
    causeId: "c1eddc8c-2252-415e-a7cf-c78bca867a29"
  },
  {
    _id: "9a9e423d-d9de-4821-9b46-3060f40642cd",
    name: "Iniciativa derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Artificiose libero delectus aperio beatae calculus voluptatibus termes.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:44.108Z",
    updatedAt: "2026-01-11T21:58:44.108Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 864,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 606,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 960,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - derechos humanos",
        description: "Evento presencial para derechos humanos. Ultra omnis viduo allatus vitium tubineus anser appono. Dicta tergo cornu audax curiositas iste ustilo.",
        initialDate: "2026-06-05T20:58:10.731Z",
        place: {
          direction: "96748 Geovany Forge, 7580",
          city: "Cusco",
          countryCode: "PE"
        }
      },
      {
        name: "Taller formativo - agua potable",
        description: "Evento presencial para agua potable. Studio dedecor delibero quas quod acsi suus consectetur addo.",
        initialDate: "2026-06-20T20:58:10.731Z",
        place: {
          direction: "6446 Yundt Heights, 8314",
          city: "Puebla",
          countryCode: "MX"
        }
      }
    ],
    causeId: "65743436-e912-41ee-9a79-5ef675315a39"
  },
  {
    _id: "5a12c545-7ddd-4f7e-86a1-654bd14df11e",
    name: "Iniciativa tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Commodi uredo certus.",
    status: "approved",
    reason: "",
    userId: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    createdAt: "2026-01-11T21:58:44.170Z",
    updatedAt: "2026-01-11T21:58:44.170Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 633,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - agua potable",
        description: "Evento presencial para agua potable. Angulus vigilo vinco vox provident attollo coniuratio. Vero tibi in.",
        initialDate: "2026-02-18T21:58:10.793Z",
        place: {
          direction: "678 Clark Forge, 98091",
          city: "Rio de Janeiro",
          countryCode: "BR"
        }
      }
    ],
    causeId: "040745db-9eaa-448d-b9fa-dbbb34444aa9"
  },
  {
    _id: "4e732e19-1808-4a51-b16d-00bfa8aaabc6",
    name: "Jornada tercera edad 2027",
    description: "Acción concreta para tercera edad con objetivos cuantificables. Dignissimos optio arguo textor administratio desipio animi ultio auxilium.",
    status: "pending",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:58:10.869Z",
    updatedAt: "2026-01-11T21:58:10.869Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 610,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - emergencias",
        description: "Evento presencial para emergencias. Culpo omnis repellat vaco utrum.",
        initialDate: "2026-05-28T20:58:10.855Z",
        place: {
          direction: "3219 Orie Fords, 5241",
          city: "Santiago",
          countryCode: "CL"
        }
      },
      {
        name: "Taller formativo - derechos humanos",
        description: "Evento presencial para derechos humanos. Tondeo brevis utrum.",
        initialDate: "2026-03-21T21:58:10.856Z",
        place: {
          direction: "9985 Tromp Points, 329",
          city: "Valencia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "17966f2e-bf54-47f1-b860-a8aebd129c34"
  },
  {
    _id: "a46fb0f7-adf3-49e4-bb42-8e6f99918640",
    name: "Campaña agua potable 2027",
    description: "Acción concreta para agua potable con objetivos cuantificables. Odio tot attero dedecor curis. Thesaurus deripio labore.",
    status: "approved",
    reason: "",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:44.298Z",
    updatedAt: "2026-01-11T21:58:44.298Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 433,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 19,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 509,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - salud",
        description: "Evento presencial para salud. Clibanus tumultus depraedor.",
        initialDate: "2026-03-09T21:58:10.917Z",
        place: {
          direction: "7537 Jaskolski Circle, 41874",
          city: "La Serena",
          countryCode: "CL"
        }
      }
    ],
    causeId: "00eb9ac5-2a39-4393-882a-bd3cda254ad8"
  },
  {
    _id: "0a4ccf66-b905-4850-8300-e9f36a7b1dc1",
    name: "Proyecto vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Antea aggero sono.",
    status: "approved",
    reason: "",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:58:44.362Z",
    updatedAt: "2026-01-11T21:58:44.362Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 848,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 313,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - salud",
        description: "Evento presencial para salud. Dicta utilis charisma decumbo arbor tabula vis strenuus suus aeternus.",
        initialDate: "2026-05-18T20:58:10.979Z",
        place: {
          direction: "371 Bartoletti Falls, 3177",
          city: "Toulouse",
          countryCode: "FR"
        }
      },
      {
        name: "Taller formativo - medio ambiente",
        description: "Evento presencial para medio ambiente. Blanditiis pauci rerum adimpleo agnosco.",
        initialDate: "2026-04-04T20:58:10.979Z",
        place: {
          direction: "30850 Howell Shoals, 383",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "e3ed3f33-0999-44b8-b232-e423030cbdef"
  },
  {
    _id: "6e75be68-3ae1-4643-bd8c-a95569c41cfc",
    name: "Movimiento desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Voluptas antea baiulus porro abscido adsuesco adduco strues.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:44.437Z",
    updatedAt: "2026-01-11T21:58:44.437Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 510,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Vulnero aeger arbustum sum corporis viscus verto velum combibo clibanus. Deputo suffoco tabernus tactus tondeo cervus.",
        initialDate: "2026-07-13T20:58:11.042Z",
        place: {
          direction: "879 Rolfson Branch, 860",
          city: "Concepción",
          countryCode: "CL"
        }
      },
      {
        name: "Jornada solidaria - igualdad de género",
        description: "Evento presencial para igualdad de género. Tergeo rerum caries aptus capto. Audacia conculco odio utor.",
        initialDate: "2026-02-11T21:58:11.042Z",
        place: {
          direction: "189 Park Crescent, 21351",
          city: "Valencia",
          countryCode: "VE"
        }
      }
    ],
    causeId: "c465ff85-a592-4f42-bcfb-6dc83c28db81"
  },
  {
    _id: "ff80e4e8-3e23-4693-a094-9e708b48f5d9",
    name: "Operación salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Candidus aufero adstringo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:44.564Z",
    updatedAt: "2026-01-11T21:58:44.564Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 465,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 190,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - discapacidad",
        description: "Evento presencial para discapacidad. Suffragium bestia usitas tempora addo.",
        initialDate: "2026-02-14T21:58:11.168Z",
        place: {
          direction: "90087 North Street, 279",
          city: "Stuttgart",
          countryCode: "DE"
        }
      }
    ],
    causeId: "c96f87e1-26c3-4925-94f8-538145cbc249"
  },
  {
    _id: "59fe5ceb-8145-4cab-8156-553061e59c83",
    name: "Jornada educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Alioqui terra tabula aiunt venia cibus cotidie tempora bellum.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:44.688Z",
    updatedAt: "2026-01-11T21:58:44.688Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 253,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 410,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 273,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - igualdad de género",
        description: "Evento presencial para igualdad de género. Decor vinco ulciscor crur. Aperiam arguo ambulo undique corrupti vix.",
        initialDate: "2026-03-19T21:58:11.293Z",
        place: {
          direction: "1736 Chestnut Drive, 95422",
          city: "Tucumán",
          countryCode: "AR"
        }
      },
      {
        name: "Jornada solidaria - emergencias",
        description: "Evento presencial para emergencias. Sonitus timidus deleo denuncio verto conduco.",
        initialDate: "2026-02-05T21:58:11.293Z",
        place: {
          direction: "5460 Aufderhar Extension, 68491",
          city: "Bogotá",
          countryCode: "CO"
        }
      }
    ],
    causeId: "c1cead8a-3ab0-402d-bc0e-b0dfb6f1a72f"
  },
  {
    _id: "73092550-39f5-48ac-b02f-c61686540609",
    name: "Red de apoyo derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Vorago acidus animi eligendi constans crepusculum. Suspendo patria utor desino hic patior absorbeo aegrus aliquam.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:44.748Z",
    updatedAt: "2026-01-11T21:58:44.748Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 672,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 308,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 611,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - tercera edad",
        description: "Evento presencial para tercera edad. Arceo addo amoveo.",
        initialDate: "2026-02-01T21:58:11.355Z",
        place: {
          direction: "731 The Green, 90169",
          city: "Venezia",
          countryCode: "IT"
        }
      }
    ],
    causeId: "cdf1f42a-4189-4865-835a-2b2abef75ee8"
  },
  {
    _id: "4b292506-bdee-48d6-b9f5-81cc0cf1c3d0",
    name: "Programa pobreza 2027",
    description: "Acción concreta para pobreza con objetivos cuantificables. Nam cursim nemo supra argumentum demo. Sit et abscido adiuvo communis tollo valens voluptatum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:44.810Z",
    updatedAt: "2026-01-11T21:58:44.810Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 980,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 543,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 695,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - medio ambiente",
        description: "Evento presencial para medio ambiente. Atrocitas damnatio coruscus.",
        initialDate: "2026-04-26T20:58:11.418Z",
        place: {
          direction: "36681 Rubie Flats, 591",
          city: "Marseille",
          countryCode: "FR"
        }
      },
      {
        name: "Jornada solidaria - infancia",
        description: "Evento presencial para infancia. Demulceo nesciunt usitas thesaurus caries vulgaris saepe vesper adsuesco.",
        initialDate: "2026-04-05T20:58:11.418Z",
        place: {
          direction: "69611 Deanna Green, 382",
          city: "Barranquilla",
          countryCode: "CO"
        }
      }
    ],
    causeId: "7c63eb8c-46c0-4f8d-91fe-c98ec4d15455"
  },
  {
    _id: "aafc7346-abfa-4995-80dc-9325cf63dc60",
    name: "Proyecto vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Tempore tot ait aequitas inventore bos. Volaticus vigilo victus.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:44.935Z",
    updatedAt: "2026-01-11T21:58:44.935Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 736,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - emergencias",
        description: "Evento presencial para emergencias. Dicta subvenio doloribus adulatio solum pariatur vado reprehenderit. Creptio tertius absens carpo fuga.",
        initialDate: "2026-01-22T21:58:11.542Z",
        place: {
          direction: "28765 N Church Street, 291",
          city: "Valencia",
          countryCode: "VE"
        }
      },
      {
        name: "Actividad de voluntariado - salud",
        description: "Evento presencial para salud. Sumo ubi cunctatio. Taedium conscendo crudelis verto derideo aperte.",
        initialDate: "2026-06-26T20:58:11.542Z",
        place: {
          direction: "370 Koss Highway, 384",
          city: "Lima",
          countryCode: "PE"
        }
      }
    ],
    causeId: "76869ea9-14bc-446d-84d6-03cf9cb4cf2f"
  },
  {
    _id: "95f3036a-c18b-45ba-bd0c-0b273f7d4cf2",
    name: "Red de apoyo derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Trado vulgivagus absconditus arx cupiditate tam veniam collum.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:44.997Z",
    updatedAt: "2026-01-11T21:58:44.997Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 544,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 509,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 257,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - infancia",
        description: "Evento presencial para infancia. Exercitationem clementia adnuo volaticus spes nihil temporibus ars defaeco accusantium. Corpus convoco apto balbus sui molestias thesis.",
        initialDate: "2026-04-21T20:58:11.605Z",
        place: {
          direction: "300 Mireya Mountain, 80118",
          city: "Bogotá",
          countryCode: "CO"
        }
      },
      {
        name: "Taller formativo - agua potable",
        description: "Evento presencial para agua potable. Volo atrox vere. Nihil aequitas apparatus verecundia vigilo avaritia spargo.",
        initialDate: "2026-05-27T20:58:11.605Z",
        place: {
          direction: "29724 Larson Ferry, 276",
          city: "Lyon",
          countryCode: "FR"
        }
      }
    ],
    causeId: "1655f209-6028-4d1f-ad9b-85f5cf0d4626"
  },
  {
    _id: "10151737-47be-45d6-a596-3d61e57e23ea",
    name: "Movimiento vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Occaecati voluptatem virtus repudiandae artificiose desipio solio. Volaticus coruscus custodia sopor terra accommodo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:45.060Z",
    updatedAt: "2026-01-11T21:58:45.060Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 448,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 977,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - igualdad de género",
        description: "Evento presencial para igualdad de género. Demitto tutis utor quia derelinquo ipsa viridis corrigo.",
        initialDate: "2026-02-28T21:58:11.668Z",
        place: {
          direction: "7416 Ziemann Land, 590",
          city: "Stuttgart",
          countryCode: "DE"
        }
      }
    ],
    causeId: "a0feb2ed-79c3-4126-b672-520f20b133ec"
  },
  {
    _id: "8a3ef58a-e2ad-4e49-8e47-4221511660ac",
    name: "Iniciativa igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Voveo deporto uter arma.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:45.122Z",
    updatedAt: "2026-01-11T21:58:45.122Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 973,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - educación",
        description: "Evento presencial para educación. Uredo voluptates ascisco deduco.",
        initialDate: "2026-03-03T21:58:11.731Z",
        place: {
          direction: "82817 Curtis Vista, 715",
          city: "Córdoba",
          countryCode: "AR"
        }
      }
    ],
    causeId: "f3048f6e-6be6-456a-b365-b8fe4d25c329"
  },
  {
    _id: "d8279d90-901d-445f-a1fc-add973215554",
    name: "Iniciativa derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Desparatus damno audax sodalitas decipio occaecati corrupti tolero.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:45.184Z",
    updatedAt: "2026-01-11T21:58:45.184Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 481,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - igualdad de género",
        description: "Evento presencial para igualdad de género. Sapiente agnitio conscendo. Arbitro patria voluptatibus acquiro bellum callide.",
        initialDate: "2026-04-25T20:58:11.793Z",
        place: {
          direction: "665 Cody Glens, 8337",
          city: "Firenze",
          countryCode: "IT"
        }
      }
    ],
    causeId: "ae3eb1ec-3e16-4835-a8c9-06df78246056"
  },
  {
    _id: "693311d8-e92b-44dc-a386-716a59d406ae",
    name: "Programa educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Armarium appositus excepturi xiphias conturbo. Spero totam aduro cribro decerno utilis tardus.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:45.252Z",
    updatedAt: "2026-01-11T21:58:45.252Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 87,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 722,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 344,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - educación",
        description: "Evento presencial para educación. Carmen uredo complectus. Laboriosam cattus crustulum vociferor cursus decipio pectus.",
        initialDate: "2026-04-09T20:58:11.855Z",
        place: {
          direction: "6987 Hartmann Points, 8400",
          city: "Bogotá",
          countryCode: "CO"
        }
      }
    ],
    causeId: "533a4788-4be8-43bd-8115-bf8ac9f6f9ae"
  },
  {
    _id: "ffd1218c-9b9c-4aed-8110-4569761285b9",
    name: "Jornada discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Valeo coepi infit solvo tot venio collum aegrus.",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:45.563Z",
    updatedAt: "2026-01-11T21:58:45.563Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 666,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - discapacidad",
        description: "Evento presencial para discapacidad. Clibanus cultellus summopere infit curia territo deludo cena.",
        initialDate: "2026-03-07T21:58:12.169Z",
        place: {
          direction: "331 Aileen Crest, 93278",
          city: "Guadalajara",
          countryCode: "MX"
        }
      }
    ],
    causeId: "dd85c58b-1fec-4fa2-8023-3da90eb5bc6c"
  },
  {
    _id: "9cbe3475-3eea-4b3a-9e88-5993b57d3cf0",
    name: "Iniciativa desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Tripudio aptus autus vita tabesco aurum peccatus depopulo deleniti subseco. Acervus beatae civis auctor spoliatio centum ocer.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:45.625Z",
    updatedAt: "2026-01-11T21:58:45.625Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 831,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 484,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - infancia",
        description: "Evento presencial para infancia. Audax confugo aro aureus admoneo ipsa.",
        initialDate: "2026-07-01T20:58:12.230Z",
        place: {
          direction: "855 Jeanie Divide, 2768",
          city: "Trujillo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "a0feb2ed-79c3-4126-b672-520f20b133ec"
  },
  {
    _id: "af0faf88-d46c-4f1f-aa3e-69e997d7dfb2",
    name: "Red de apoyo desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Nostrum beatus uxor vilis vespillo vicinus taceo ab laudantium. Adstringo velit cicuta.",
    status: "approved",
    reason: "",
    userId: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    createdAt: "2026-01-11T21:58:45.748Z",
    updatedAt: "2026-01-11T21:58:45.748Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 695,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 343,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 196,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - igualdad de género",
        description: "Evento presencial para igualdad de género. Concido officiis atqui vesco denuo repellat attollo vilicus atque.",
        initialDate: "2026-03-29T20:58:12.355Z",
        place: {
          direction: "51727 Old State Road, 25317",
          city: "Cancún",
          countryCode: "MX"
        }
      }
    ],
    causeId: "e3ed3f33-0999-44b8-b232-e423030cbdef"
  },
  {
    _id: "1ecd4bb1-01ff-4128-bb06-d6ca4855dfc5",
    name: "Programa desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Timidus timor advenio umbra infit ustulo. Casus adamo vitium caterva desipio sodalitas ducimus tunc asporto tandem.",
    status: "pending",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:12.493Z",
    updatedAt: "2026-01-11T21:58:12.493Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 30,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 720,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - pobreza",
        description: "Evento presencial para pobreza. Corrigo cimentarius vapulus synagoga asporto.",
        initialDate: "2026-07-13T20:58:12.479Z",
        place: {
          direction: "47734 Lonny Drive, 369",
          city: "Antofagasta",
          countryCode: "CL"
        }
      },
      {
        name: "Encuentro comunitario - igualdad de género",
        description: "Evento presencial para igualdad de género. Comes curvo vilis verbum quaerat.",
        initialDate: "2026-02-11T21:58:12.479Z",
        place: {
          direction: "14606 Market Street, 482",
          city: "Maracay",
          countryCode: "VE"
        }
      }
    ],
    causeId: "35fce5d7-da0b-43fa-8bb7-a2786eb71046"
  },
  {
    _id: "8a324b88-07fe-4690-836c-bcdf18fcb79e",
    name: "Movimiento agua potable 2026",
    description: "Acción concreta para agua potable con objetivos cuantificables. Voluptates concido capio patria culpa voluptatum victus suffoco apostolus.",
    status: "pending",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:12.555Z",
    updatedAt: "2026-01-11T21:58:12.555Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 142,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 482,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Cohaero venustas magnam odit brevis provident viridis cursim summisse depromo.",
        initialDate: "2026-07-15T20:58:12.541Z",
        place: {
          direction: "82219 N Main Avenue, 380",
          city: "Stuttgart",
          countryCode: "DE"
        }
      }
    ],
    causeId: "87fde027-206d-4e3a-9a1f-e8a63e8da174"
  },
  {
    _id: "ff9ba2e3-af78-4739-8921-b07de09644d1",
    name: "Jornada emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Suppellex viridis tardus alii agnitio.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:46.060Z",
    updatedAt: "2026-01-11T21:58:46.060Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 828,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - emergencias",
        description: "Evento presencial para emergencias. Tepidus defessus magnam demens solium.",
        initialDate: "2026-06-27T20:58:12.666Z",
        place: {
          direction: "54406 Prospect Place, 32197",
          city: "Chiclayo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "7c63eb8c-46c0-4f8d-91fe-c98ec4d15455"
  },
  {
    _id: "9841aea9-0658-4db4-9b61-4ccc429af73e",
    name: "Campaña salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Congregatio ante tabella vulgus vesper talis.",
    status: "pending",
    userId: "0d796a28-539a-4745-ac33-2f1139e519af",
    createdAt: "2026-01-11T21:58:12.744Z",
    updatedAt: "2026-01-11T21:58:12.744Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 449,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 193,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 882,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - infancia",
        description: "Evento presencial para infancia. Teneo depulso molestiae decretum valens conservo tamquam solum sublime.",
        initialDate: "2026-05-21T20:58:12.729Z",
        place: {
          direction: "39909 Lueilwitz Tunnel, 344",
          city: "Napoli",
          countryCode: "IT"
        }
      },
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Sulum numquam cetera quibusdam tactus corroboro. Coadunatio corona eveniet agnosco deserunt absum virga.",
        initialDate: "2026-04-07T20:58:12.730Z",
        place: {
          direction: "61754 Tianna Lane, 464",
          city: "Bucaramanga",
          countryCode: "CO"
        }
      }
    ],
    causeId: "35fce5d7-da0b-43fa-8bb7-a2786eb71046"
  },
  {
    _id: "7f41e9c7-73a1-475c-b8ed-4582b0a87b1a",
    name: "Red de apoyo desarrollo sostenible 2027",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Sollicito demonstro balbus harum civitas. Undique custodia tolero.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:46.184Z",
    updatedAt: "2026-01-11T21:58:46.184Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 221,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 861,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 793,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - infancia",
        description: "Evento presencial para infancia. Omnis deduco umquam audentia creta copia adduco.",
        initialDate: "2026-04-27T20:58:12.792Z",
        place: {
          direction: "8073 E 8th Street, 46036",
          city: "Fortaleza",
          countryCode: "BR"
        }
      }
    ],
    causeId: "f3048f6e-6be6-456a-b365-b8fe4d25c329"
  },
  {
    _id: "41c6a993-470f-4053-97be-8167b9758235",
    name: "Proyecto desarrollo sostenible 2026",
    description: "Acción concreta para desarrollo sostenible con objetivos cuantificables. Victoria cuppedia creta adhaero accendo. Pauper cubicularis defendo viriliter volva tripudio ascit alo iste.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:46.247Z",
    updatedAt: "2026-01-11T21:58:46.247Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 677,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 340,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 423,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - infancia",
        description: "Evento presencial para infancia. Cattus quod curto.",
        initialDate: "2026-06-23T20:58:12.854Z",
        place: {
          direction: "8541 Margarita Motorway, 62275",
          city: "Napoli",
          countryCode: "IT"
        }
      },
      {
        name: "Evento benéfico - vivienda",
        description: "Evento presencial para vivienda. Cubicularis aeternus aliqua tibi aurum audax delectatio amitto. Aeternus undique debilito sol quisquam sublime aegre autus.",
        initialDate: "2026-04-04T20:58:12.854Z",
        place: {
          direction: "2867 Frami Ports, 3925",
          city: "Zaragoza",
          countryCode: "ES"
        }
      }
    ],
    causeId: "d73b58d6-f3d3-4a85-8fa2-cbc1a9e6ea40"
  },
  {
    _id: "308eaedc-91ac-4a68-868b-6799fe9e27c0",
    name: "Jornada pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Sono celebrer corporis.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:46.373Z",
    updatedAt: "2026-01-11T21:58:46.373Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 71,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - educación",
        description: "Evento presencial para educación. Sursum casso voro amplitudo absorbeo. Defero admitto cubicularis.",
        initialDate: "2026-04-05T20:58:12.978Z",
        place: {
          direction: "793 13th Street, 8471",
          city: "Bogotá",
          countryCode: "CO"
        }
      },
      {
        name: "Evento benéfico - vivienda",
        description: "Evento presencial para vivienda. Utilis dignissimos arbustum conventus nesciunt astrum campana. Cervus tergeo verumtamen colo temporibus theca sustineo cohaero.",
        initialDate: "2026-04-09T20:58:12.978Z",
        place: {
          direction: "54044 Cross Street, 25862",
          city: "Birmingham",
          countryCode: "GB"
        }
      }
    ],
    causeId: "a7595e89-29f9-44cb-8611-17a12344a6b7"
  },
  {
    _id: "bfaf8824-1cfa-4b61-bd84-22dea46da87c",
    name: "Proyecto educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Crebro corroboro capitulus calcar veritatis.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:46.434Z",
    updatedAt: "2026-01-11T21:58:46.434Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 638,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 682,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Cultellus debilito architecto tamisium conspergo desparatus claro.",
        initialDate: "2026-01-30T21:58:13.042Z",
        place: {
          direction: "2012 Towne Pike, 35784",
          city: "Buenos Aires",
          countryCode: "AR"
        }
      }
    ],
    causeId: "6d0c3bf3-9c2c-4dfb-9e08-dc685e4057b1"
  },
  {
    _id: "9c214b7b-690b-4d5a-a45e-139451eb02c2",
    name: "Iniciativa emergencias 2027",
    description: "Acción concreta para emergencias con objetivos cuantificables. Vulnus ducimus pariatur. Commemoro demens socius crepusculum.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:46.495Z",
    updatedAt: "2026-01-11T21:58:46.495Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 351,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Autus supellex cupressus tardus ara cinis tam adstringo crux summopere.",
        initialDate: "2026-05-02T20:58:13.102Z",
        place: {
          direction: "3478 Bath Road, 6002",
          city: "Maracaibo",
          countryCode: "VE"
        }
      },
      {
        name: "Encuentro comunitario - derechos humanos",
        description: "Evento presencial para derechos humanos. Vae ver vulticulus credo comminor nemo tamquam aspicio. Cogito voluptatem alii ulciscor.",
        initialDate: "2026-05-25T20:58:13.103Z",
        place: {
          direction: "612 Mulberry Street, 29329",
          city: "Cali",
          countryCode: "CO"
        }
      }
    ],
    causeId: "832b5160-c556-420e-8e7c-b64e4a0bf937"
  },
  {
    _id: "082cda2f-1127-4ac2-a8ca-bd8e09c1ebea",
    name: "Campaña alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Benevolentia civitas vulariter sumptus vigilo templum laudantium argentum bene voluptatum. At alius sollicito territo.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:46.559Z",
    updatedAt: "2026-01-11T21:58:46.559Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 497,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - salud",
        description: "Evento presencial para salud. Tres pax uberrime distinctio.",
        initialDate: "2026-05-23T20:58:13.165Z",
        place: {
          direction: "6454 Nicolas Fork, 263",
          city: "Lyon",
          countryCode: "FR"
        }
      }
    ],
    causeId: "d73b58d6-f3d3-4a85-8fa2-cbc1a9e6ea40"
  },
  {
    _id: "740ca9d8-4bc4-4b6e-8b13-a13e304d31cd",
    name: "Jornada discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Tenax tergo cavus. Una arca denique abeo demergo caveo tumultus.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:46.622Z",
    updatedAt: "2026-01-11T21:58:46.622Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 239,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Talus vulpes capillus vicinus dolorum sustineo tollo.",
        initialDate: "2026-05-18T20:58:13.228Z",
        place: {
          direction: "469 Mills Pine, 2997",
          city: "Milano",
          countryCode: "IT"
        }
      },
      {
        name: "Jornada solidaria - pobreza",
        description: "Evento presencial para pobreza. Adipiscor demum est baiulus vespillo.",
        initialDate: "2026-06-03T20:58:13.228Z",
        place: {
          direction: "49711 Russell Street, 6835",
          city: "Cali",
          countryCode: "CO"
        }
      }
    ],
    causeId: "90a4c145-5904-466f-814d-ed30b7e82b4a"
  },
  {
    _id: "6516a773-e793-410d-a6d2-c43dd806b308",
    name: "Operación igualdad de género 2027",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Demum damno sortitus. Ex convoco confero decerno compello vitium tergiversatio comburo vix.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:46.683Z",
    updatedAt: "2026-01-11T21:58:46.683Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 239,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 666,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - salud",
        description: "Evento presencial para salud. Repellat appositus vesica vero considero quasi tenuis. Earum eaque aro basium placeat carpo venustas custodia beneficium ipsum.",
        initialDate: "2026-02-08T21:58:13.292Z",
        place: {
          direction: "65092 Willow Road, 622",
          city: "Cancún",
          countryCode: "MX"
        }
      }
    ],
    causeId: "88f95c48-a972-47fb-b6c8-e7cc9fa074a6"
  },
  {
    _id: "adc28046-6d18-4114-b5d7-7b68c5f00ee2",
    name: "Jornada infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Celer cicuta suadeo ustulo tredecim valde pauci.",
    status: "approved",
    reason: "",
    userId: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    createdAt: "2026-01-11T21:58:46.744Z",
    updatedAt: "2026-01-11T21:58:46.744Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 447,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - refugiados",
        description: "Evento presencial para refugiados. Absorbeo reiciendis fuga vulticulus canonicus spectaculum correptius auxilium. Delectatio versus conqueror tergo vestigium praesentium vox dicta valde.",
        initialDate: "2026-05-12T20:58:13.355Z",
        place: {
          direction: "94706 Emmitt Falls, 1806",
          city: "Bilbao",
          countryCode: "ES"
        }
      }
    ],
    causeId: "96a38731-a79d-4a87-b36e-7e56e358cfbc"
  },
  {
    _id: "32dd72ce-50b3-4468-ba64-45b5713183b0",
    name: "Red de apoyo salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Speculum cado amiculum defetiscor sopor suus vulnus voluptatum.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:46.930Z",
    updatedAt: "2026-01-11T21:58:46.930Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 884,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - medio ambiente",
        description: "Evento presencial para medio ambiente. Bardus demonstro tactus veniam acidus chirographum ducimus. Ciminatio thalassinus supplanto cado conor tutis attollo teres creo cetera.",
        initialDate: "2026-03-27T21:58:13.544Z",
        place: {
          direction: "509 South View, 99826",
          city: "Bristol",
          countryCode: "GB"
        }
      },
      {
        name: "Jornada solidaria - agua potable",
        description: "Evento presencial para agua potable. Vero cometes voluntarius velit aggredior delego. Caute exercitationem arma.",
        initialDate: "2026-02-27T21:58:13.544Z",
        place: {
          direction: "3025 Torrance Points, 73290",
          city: "Cancún",
          countryCode: "MX"
        }
      }
    ],
    causeId: "148b5118-7485-4385-af3d-5fa1c82abe19"
  },
  {
    _id: "b49592ce-0270-42f4-af7b-fc4a00c0ee25",
    name: "Jornada pobreza 2027",
    description: "Acción concreta para pobreza con objetivos cuantificables. Auctus comes beatus vilicus turba verus. Villa anser decipio spes coniuratio testimonium cruciamentum.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:58:46.992Z",
    updatedAt: "2026-01-11T21:58:46.992Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 596,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 675,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 182,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - discapacidad",
        description: "Evento presencial para discapacidad. Conventus tubineus vero umbra vesco assumenda aequitas paulatim ustilo. Suscipio consequuntur coma venustas tamen.",
        initialDate: "2026-05-03T20:58:13.605Z",
        place: {
          direction: "45712 Balistreri Courts, 188",
          city: "Maracay",
          countryCode: "VE"
        }
      },
      {
        name: "Evento benéfico - educación",
        description: "Evento presencial para educación. Aurum cuppedia dapifer. Combibo civitas temperantia volup constans voro catena teneo.",
        initialDate: "2026-04-02T20:58:13.605Z",
        place: {
          direction: "9080 Kenna Meadow, 97175",
          city: "São Paulo",
          countryCode: "BR"
        }
      }
    ],
    causeId: "8ed57a88-b492-4364-ab6f-cd7cf9b588c6"
  },
  {
    _id: "23ee9e98-4106-4a00-beb9-93111338411f",
    name: "Acción solidaria emergencias 2026",
    description: "Acción concreta para emergencias con objetivos cuantificables. Vigor victus clementia amplexus cornu.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:47.116Z",
    updatedAt: "2026-01-11T21:58:47.116Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 176,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 625,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 401,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - tercera edad",
        description: "Evento presencial para tercera edad. Aeneus caritas correptius viduo casso arx curto admoveo molestias.",
        initialDate: "2026-02-14T21:58:13.731Z",
        place: {
          direction: "4791 Kling Garden, 162",
          city: "Lima",
          countryCode: "PE"
        }
      },
      {
        name: "Actividad de voluntariado - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Angelus tamisium deputo hic allatus coniuratio.",
        initialDate: "2026-02-11T21:58:13.731Z",
        place: {
          direction: "36834 Erdman Cape, 185",
          city: "Bucaramanga",
          countryCode: "CO"
        }
      }
    ],
    causeId: "70b47bee-154f-44b1-990f-49edd0deea59"
  },
  {
    _id: "c44a3aa4-5588-463f-b423-fafe3b768cc7",
    name: "Campaña medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Absens cogito tam quis absque charisma alias.",
    status: "approved",
    reason: "",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:47.177Z",
    updatedAt: "2026-01-11T21:58:47.177Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 300,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 831,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - emergencias",
        description: "Evento presencial para emergencias. Terebro suus virtus cura teneo. Ait tergum cornu magni valens eaque admoveo stella.",
        initialDate: "2026-03-03T21:58:13.793Z",
        place: {
          direction: "1410 Sipes Port, 397",
          city: "Monterrey",
          countryCode: "MX"
        }
      }
    ],
    causeId: "39420fe8-9661-4e82-9585-20cf8f7442a4"
  },
  {
    _id: "8ca5bf67-ae54-4180-894d-460af0d5708c",
    name: "Campaña pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Ara tepesco caste ratione umerus eligendi adicio arcesso.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:47.239Z",
    updatedAt: "2026-01-11T21:58:47.239Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 245,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - tercera edad",
        description: "Evento presencial para tercera edad. Vox tenus victus maxime sponte cervus casso.",
        initialDate: "2026-03-09T21:58:13.855Z",
        place: {
          direction: "2792 Leuschke Viaduct, 7669",
          city: "Maracay",
          countryCode: "VE"
        }
      },
      {
        name: "Taller formativo - igualdad de género",
        description: "Evento presencial para igualdad de género. Acer culpa ademptio crapula.",
        initialDate: "2026-03-17T21:58:13.855Z",
        place: {
          direction: "223 Danial Fords, 629",
          city: "La Plata",
          countryCode: "AR"
        }
      }
    ],
    causeId: "37c41ada-bebb-4f97-a29a-d4d2519972af"
  },
  {
    _id: "f2c043e3-2c75-442d-8b28-b78cd35a9bb1",
    name: "Proyecto alimentación 2026",
    description: "Acción concreta para alimentación con objetivos cuantificables. Arcesso sophismata sub sustineo curiositas amiculum vel inventore audax. Suus tui tenus omnis paens atqui tametsi celer ultio curiositas",
    status: "approved",
    reason: "",
    userId: "0b7cd027-66cd-4493-8773-89f6f4753502",
    createdAt: "2026-01-11T21:58:47.489Z",
    updatedAt: "2026-01-11T21:58:47.489Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 175,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 689,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 910,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Voro armarium uter virga acidus triduana adiuvo.",
        initialDate: "2026-02-21T21:58:14.105Z",
        place: {
          direction: "97602 Lucienne Valley, 156",
          city: "Trujillo",
          countryCode: "PE"
        }
      },
      {
        name: "Evento benéfico - refugiados",
        description: "Evento presencial para refugiados. Admiratio tabernus spiculum.",
        initialDate: "2026-04-17T20:58:14.105Z",
        place: {
          direction: "4559 Rowland Wall, 4182",
          city: "Edinburgh",
          countryCode: "GB"
        }
      }
    ],
    causeId: "dd85c58b-1fec-4fa2-8023-3da90eb5bc6c"
  },
  {
    _id: "8028688e-c8ae-4cf7-bd22-0a9e5b899cfd",
    name: "Programa derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Degero appello confugo.",
    status: "approved",
    reason: "",
    userId: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    createdAt: "2026-01-11T21:58:47.550Z",
    updatedAt: "2026-01-11T21:58:47.550Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 139,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - agua potable",
        description: "Evento presencial para agua potable. Theologus contabesco summa arcesso aspernatur alter tres basium libero. Auctus astrum depraedor earum volutabrum.",
        initialDate: "2026-03-23T21:58:14.167Z",
        place: {
          direction: "34177 S Monroe Street, 803",
          city: "Medellín",
          countryCode: "CO"
        }
      },
      {
        name: "Taller formativo - educación",
        description: "Evento presencial para educación. Stabilis solio debeo copia. Delectus alii ascit velut quaerat anser adversus.",
        initialDate: "2026-06-11T20:58:14.167Z",
        place: {
          direction: "8613 South Street, 3537",
          city: "Lima",
          countryCode: "PE"
        }
      }
    ],
    causeId: "13653ee5-63f9-451a-8513-3121f89d3cad"
  },
  {
    _id: "9ba5930a-9026-4f7e-a25c-5d302c3c84a0",
    name: "Red de apoyo infancia 2026",
    description: "Acción concreta para infancia con objetivos cuantificables. Taceo paulatim conscendo abduco.",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:47.736Z",
    updatedAt: "2026-01-11T21:58:47.736Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 110,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Illum stips quisquam defendo. Cenaculum aranea argentum.",
        initialDate: "2026-05-16T20:58:14.354Z",
        place: {
          direction: "18046 Chanelle Fords, 115",
          city: "La Serena",
          countryCode: "CL"
        }
      },
      {
        name: "Taller formativo - derechos humanos",
        description: "Evento presencial para derechos humanos. Coniuratio caelestis cohibeo vulpes. Cunabula videlicet solium apostolus minima cado tristis cupiditas aequus cur.",
        initialDate: "2026-03-04T21:58:14.355Z",
        place: {
          direction: "469 Dannie Brook, 82478",
          city: "Hamburg",
          countryCode: "DE"
        }
      }
    ],
    causeId: "e00c1a10-c59e-4640-9261-245bbbb55a95"
  },
  {
    _id: "68e9dfee-cbb9-40ec-89fe-6abc9140e8e3",
    name: "Acción solidaria derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Bonus considero tum sponte vomito ascit.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "f593149f-00c4-4277-811f-4d568fb34b92",
    createdAt: "2026-01-11T21:58:47.801Z",
    updatedAt: "2026-01-11T21:58:47.801Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 199,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 157,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 953,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - discapacidad",
        description: "Evento presencial para discapacidad. Cras crux cometes dapifer validus administratio solus. Clibanus terga addo terreo numquam.",
        initialDate: "2026-03-29T20:58:14.416Z",
        place: {
          direction: "34357 Rosalinda Path, 4476",
          city: "Liverpool",
          countryCode: "GB"
        }
      },
      {
        name: "Actividad de voluntariado - vivienda",
        description: "Evento presencial para vivienda. Vel corrumpo supra compono hic vinco verbum.",
        initialDate: "2026-03-22T21:58:14.416Z",
        place: {
          direction: "57534 Manuela Expressway, 854",
          city: "Mendoza",
          countryCode: "AR"
        }
      }
    ],
    causeId: "44e8e71e-e56a-45ad-b5de-f2e047da486d"
  },
  {
    _id: "4d80c48e-3888-471b-ae4d-0a66989361f7",
    name: "Iniciativa infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Cunae tenus cito commodi trucido crudelis asper soluta. Commodi administratio asper ustulo.",
    status: "pending",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:14.492Z",
    updatedAt: "2026-01-11T21:58:14.492Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 125,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 911,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 93,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - tercera edad",
        description: "Evento presencial para tercera edad. Earum campana copia turbo verbum peior ars creber adsidue.",
        initialDate: "2026-01-20T21:58:14.479Z",
        place: {
          direction: "79362 Miguel Corners, 8600",
          city: "Munich",
          countryCode: "DE"
        }
      }
    ],
    causeId: "f2e090df-eacc-43ab-9cb0-ab445ff55870"
  },
  {
    _id: "9efd162b-0b0b-46f0-9523-60c26a9b6040",
    name: "Acción solidaria salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Theca aegre tamdiu harum utpote strues vomica. Venustas incidunt cetera sum quaerat peior sto approbo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:48.001Z",
    updatedAt: "2026-01-11T21:58:48.001Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 334,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 860,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 396,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - educación",
        description: "Evento presencial para educación. Perferendis iusto conventus templum. Decor omnis cattus considero sumo.",
        initialDate: "2026-01-24T21:58:14.604Z",
        place: {
          direction: "844 Orn Branch, 10228",
          city: "Milano",
          countryCode: "IT"
        }
      },
      {
        name: "Evento benéfico - salud",
        description: "Evento presencial para salud. Ventus thymbra animus tondeo canto.",
        initialDate: "2026-05-30T20:58:14.604Z",
        place: {
          direction: "462 Friesen Manors, 78334",
          city: "Cologne",
          countryCode: "DE"
        }
      }
    ],
    causeId: "6632c65a-7e07-4590-ae1f-f2c92af19be4"
  },
  {
    _id: "d16dcff8-6c26-4b55-a78a-981e0c240af7",
    name: "Acción solidaria igualdad de género 2027",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Sunt esse utrum clibanus. Truculenter earum appello.",
    status: "approved",
    reason: "",
    userId: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    createdAt: "2026-01-11T21:58:48.126Z",
    updatedAt: "2026-01-11T21:58:48.126Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 798,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 667,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 118,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - pobreza",
        description: "Evento presencial para pobreza. Video terra adflicto. Cervus cur tollo velut adamo nobis rem verbum sordeo.",
        initialDate: "2026-06-02T20:58:14.728Z",
        place: {
          direction: "2962 Denesik Wall, 437",
          city: "Toulouse",
          countryCode: "FR"
        }
      },
      {
        name: "Taller formativo - educación",
        description: "Evento presencial para educación. Eligendi deleo vilis sursum tricesimus.",
        initialDate: "2026-01-24T21:58:14.728Z",
        place: {
          direction: "32743 Sycamore Avenue, 48653",
          city: "Valencia",
          countryCode: "VE"
        }
      }
    ],
    causeId: "4db56792-f2cf-440a-a7bc-5a3b63584e42"
  },
  {
    _id: "d63da8c4-f328-47b4-866d-cf3f8a217f0d",
    name: "Red de apoyo medio ambiente 2027",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Acervus argentum argumentum adsidue bis demergo conforto.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:48.190Z",
    updatedAt: "2026-01-11T21:58:48.190Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 346,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 28,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - salud",
        description: "Evento presencial para salud. Caelestis ulterius agnitio curriculum cotidie voluptate tabella uberrime conscendo.",
        initialDate: "2026-02-23T21:58:14.791Z",
        place: {
          direction: "415 Western Avenue, 5042",
          city: "Concepción",
          countryCode: "CL"
        }
      }
    ],
    causeId: "02971d91-89cd-486c-a397-c1956f8327e0"
  },
  {
    _id: "fd29fe52-f1bf-443b-9c2c-b77c3298f248",
    name: "Acción solidaria derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Amoveo copiose pariatur at solus voluptatibus nesciunt.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:48.252Z",
    updatedAt: "2026-01-11T21:58:48.252Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 257,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - alimentación",
        description: "Evento presencial para alimentación. Vobis aestas harum solum.",
        initialDate: "2026-02-19T21:58:14.853Z",
        place: {
          direction: "773 Adams Avenue, 1865",
          city: "Brasília",
          countryCode: "BR"
        }
      }
    ],
    causeId: "26557700-53e1-4454-a7e8-c4bf8bac28b6"
  },
  {
    _id: "c2d4e6e3-fa77-4bca-8cd6-f15053b6eaab",
    name: "Jornada pobreza 2027",
    description: "Acción concreta para pobreza con objetivos cuantificables. Iure ustilo surculus sub trucido. Celo patior patior celebrer tumultus cubo.",
    status: "approved",
    reason: "",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:48.314Z",
    updatedAt: "2026-01-11T21:58:48.314Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 480,
        unit: "paquetes",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - educación",
        description: "Evento presencial para educación. Amet cultura curvo usque nam tergo concedo thorax claro corrigo. Solus tamen atqui deludo.",
        initialDate: "2026-04-08T20:58:14.916Z",
        place: {
          direction: "735 Grant Fork, 43574",
          city: "Birmingham",
          countryCode: "GB"
        }
      },
      {
        name: "Reunión de coordinación - refugiados",
        description: "Evento presencial para refugiados. Confero aestus compono thorax aiunt vester aggero. Tergo tero accommodo vulgus avarus spiculum confero.",
        initialDate: "2026-05-08T20:58:14.916Z",
        place: {
          direction: "9624 Marks Fords, 726",
          city: "Glasgow",
          countryCode: "GB"
        }
      }
    ],
    causeId: "02971d91-89cd-486c-a397-c1956f8327e0"
  },
  {
    _id: "a156b6ac-515c-4419-bc25-6378dbc8b630",
    name: "Movimiento educación 2027",
    description: "Acción concreta para educación con objetivos cuantificables. Pax laborum claudeo id atavus tergum synagoga clementia defetiscor.",
    status: "pending",
    userId: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    createdAt: "2026-01-11T21:58:15.052Z",
    updatedAt: "2026-01-11T21:58:15.052Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 118,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 874,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 177,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - emergencias",
        description: "Evento presencial para emergencias. Dapifer usque admoveo.",
        initialDate: "2026-07-08T20:58:15.039Z",
        place: {
          direction: "470 Keaton Ranch, 3450",
          city: "Caracas",
          countryCode: "VE"
        }
      }
    ],
    causeId: "1f892f51-33ae-48d4-880c-4f56b7dc763c"
  },
  {
    _id: "e0354790-edeb-4714-b858-2b5ab8cfca14",
    name: "Iniciativa infancia 2027",
    description: "Acción concreta para infancia con objetivos cuantificables. Vinitor vulpes veritatis desipio cunctatio perspiciatis adsum vespillo ara. Deporto voluptatum compello degenero calcar compello eius admove",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:48.503Z",
    updatedAt: "2026-01-11T21:58:48.503Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 670,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 23,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - refugiados",
        description: "Evento presencial para refugiados. Itaque neque appono. Contigo vallum vulariter adfero vinitor circumvenio.",
        initialDate: "2026-05-29T20:58:15.101Z",
        place: {
          direction: "41528 Dark Lane, 5283",
          city: "Bologna",
          countryCode: "IT"
        }
      },
      {
        name: "Encuentro comunitario - salud",
        description: "Evento presencial para salud. Beatus usque asporto vetus testimonium aperte degero consuasor. Consequuntur vilitas asperiores.",
        initialDate: "2026-04-19T20:58:15.101Z",
        place: {
          direction: "9809 W Grand Avenue, 1418",
          city: "Murcia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "76869ea9-14bc-446d-84d6-03cf9cb4cf2f"
  },
  {
    _id: "14fb660d-b36b-424e-b963-03de4881b7ef",
    name: "Red de apoyo discapacidad 2026",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Paens vulpes deleo cimentarius volutabrum.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:48.565Z",
    updatedAt: "2026-01-11T21:58:48.565Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 437,
        unit: "personas",
        currentAmount: 0
      },
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 725,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 708,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - igualdad de género",
        description: "Evento presencial para igualdad de género. Subito summisse carpo.",
        initialDate: "2026-02-17T21:58:15.163Z",
        place: {
          direction: "9592 Morissette Glens, 856",
          city: "Fortaleza",
          countryCode: "BR"
        }
      }
    ],
    causeId: "62e3592b-abfd-4753-91b6-63b278588ff4"
  },
  {
    _id: "ee552c85-f3e1-4f8c-bab3-3f456b54573a",
    name: "Proyecto discapacidad 2027",
    description: "Acción concreta para discapacidad con objetivos cuantificables. Sollicito clam aperio ver bis curso compono. Cuppedia patrocinor aranea peior.",
    status: "pending",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:15.302Z",
    updatedAt: "2026-01-11T21:58:15.302Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 477,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 602,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 759,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - alimentación",
        description: "Evento presencial para alimentación. Blanditiis audio caries comburo. Vinum quod cicuta terror pecus quidem turpis defungo corona pectus.",
        initialDate: "2026-05-22T20:58:15.288Z",
        place: {
          direction: "79478 The Oaks, 9681",
          city: "Liverpool",
          countryCode: "GB"
        }
      },
      {
        name: "Taller formativo - tercera edad",
        description: "Evento presencial para tercera edad. Cresco speciosus creptio carbo depopulo adsuesco fugit avaritia.",
        initialDate: "2026-06-29T20:58:15.288Z",
        place: {
          direction: "519 Birch Close, 583",
          city: "Cusco",
          countryCode: "PE"
        }
      }
    ],
    causeId: "9ff79f22-0e20-4774-842b-25a1c99fb7a8"
  },
  {
    _id: "38692112-5001-4b40-8617-8d888e40c435",
    name: "Jornada alimentación 2027",
    description: "Acción concreta para alimentación con objetivos cuantificables. Caterva ocer taedium alter corona perspiciatis.",
    status: "approved",
    reason: "",
    userId: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    createdAt: "2026-01-11T21:58:48.754Z",
    updatedAt: "2026-01-11T21:58:48.754Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 813,
        unit: "unidades",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 691,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - vivienda",
        description: "Evento presencial para vivienda. Adhaero tricesimus vivo error adfero casso abeo. Calculus canis beneficium attero commodi amor terra amor.",
        initialDate: "2026-06-26T20:58:15.352Z",
        place: {
          direction: "8529 Addie Coves, 32337",
          city: "Chiclayo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "8ed57a88-b492-4364-ab6f-cd7cf9b588c6"
  },
  {
    _id: "4cc5896a-44cf-4393-80f0-ed282a31aa93",
    name: "Jornada pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Assumenda dolor trado aliqua adsum aestus vespillo.",
    status: "approved",
    reason: "",
    userId: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    createdAt: "2026-01-11T21:58:48.815Z",
    updatedAt: "2026-01-11T21:58:48.815Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 873,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - alimentación",
        description: "Evento presencial para alimentación. Spargo cotidie pecco abundans saepe soleo. Cornu viridis cavus debilito ambitus ver cetera.",
        initialDate: "2026-05-13T20:58:15.415Z",
        place: {
          direction: "25765 Ali Roads, 2024",
          city: "Birmingham",
          countryCode: "GB"
        }
      },
      {
        name: "Encuentro comunitario - educación",
        description: "Evento presencial para educación. Desipio cupiditate adfectus canonicus apparatus corporis. Iure iure tyrannus conor conculco.",
        initialDate: "2026-02-18T21:58:15.416Z",
        place: {
          direction: "77527 Leora Pass, 94379",
          city: "Murcia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "db7adc43-dc8a-4f00-b245-77a7952aa63b"
  },
  {
    _id: "8d3aeb36-e33a-4f9c-aacf-3347a9e69097",
    name: "Proyecto pobreza 2027",
    description: "Acción concreta para pobreza con objetivos cuantificables. Quidem clamo decumbo ascisco amoveo beatae. Alioqui compono unus accusantium caelum ancilla thema abstergo tergo.",
    status: "approved",
    reason: "",
    userId: "03155a0c-21a4-441c-8030-482a570867dc",
    createdAt: "2026-01-11T21:58:49.004Z",
    updatedAt: "2026-01-11T21:58:49.004Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 352,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - educación",
        description: "Evento presencial para educación. Patruus molestias clamo caveo advenio repellendus tabgo.",
        initialDate: "2026-01-27T21:58:15.602Z",
        place: {
          direction: "371 Lisandro Parkways, 82936",
          city: "Birmingham",
          countryCode: "GB"
        }
      }
    ],
    causeId: "6d0c3bf3-9c2c-4dfb-9e08-dc685e4057b1"
  },
  {
    _id: "dc57035e-f491-489c-8f07-86a8b4122274",
    name: "Programa vivienda 2026",
    description: "Acción concreta para vivienda con objetivos cuantificables. Balbus cubitum canonicus ocer amplitudo theologus consequatur ascisco nesciunt appositus. Spero totam tutamen subnecto verbera terga autem i",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:49.065Z",
    updatedAt: "2026-01-11T21:58:49.065Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 389,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - desarrollo sostenible",
        description: "Evento presencial para desarrollo sostenible. Appositus delego validus conturbo adversus ipsum beatus conservo claudeo careo. Demens templum aut odio brevis animus tum.",
        initialDate: "2026-05-20T20:58:15.665Z",
        place: {
          direction: "492 Helena Harbor, 4275",
          city: "Monterrey",
          countryCode: "MX"
        }
      },
      {
        name: "Evento benéfico - agua potable",
        description: "Evento presencial para agua potable. Tepesco cibo terebro abstergo textus aequus tripudio culpa crux.",
        initialDate: "2026-07-10T20:58:15.665Z",
        place: {
          direction: "3854 Graham Mills, 855",
          city: "Marseille",
          countryCode: "FR"
        }
      }
    ],
    causeId: "c96f87e1-26c3-4925-94f8-538145cbc249"
  },
  {
    _id: "7f430df9-3be0-44b9-bce6-c035975fde1c",
    name: "Proyecto vivienda 2027",
    description: "Acción concreta para vivienda con objetivos cuantificables. Thalassinus urbs ubi patior theatrum crapula eius delectatio tenetur.",
    status: "approved",
    reason: "",
    userId: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    createdAt: "2026-01-11T21:58:49.259Z",
    updatedAt: "2026-01-11T21:58:49.259Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 272,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 980,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 667,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - infancia",
        description: "Evento presencial para infancia. Nihil voluptate tumultus uter culpo supra fugiat. Confido villa tandem antiquus sapiente.",
        initialDate: "2026-02-02T21:58:15.852Z",
        place: {
          direction: "7825 Sanford Heights, 543",
          city: "Paris",
          countryCode: "FR"
        }
      }
    ],
    causeId: "f3048f6e-6be6-456a-b365-b8fe4d25c329"
  },
  {
    _id: "1188d324-2709-4f62-9463-48072055862a",
    name: "Movimiento pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Audax bene vomer. Agnitio possimus enim viridis quibusdam vesica dolorum voro ustulo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:49.390Z",
    updatedAt: "2026-01-11T21:58:49.390Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 211,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - igualdad de género",
        description: "Evento presencial para igualdad de género. Candidus fuga suppono cibo.",
        initialDate: "2026-07-12T20:58:15.976Z",
        place: {
          direction: "7365 Cleveland Street, 87898",
          city: "Ciudad de México",
          countryCode: "MX"
        }
      }
    ],
    causeId: "ae3eb1ec-3e16-4835-a8c9-06df78246056"
  },
  {
    _id: "e20893e3-a361-48bf-a142-5ca0cd178f2d",
    name: "Acción solidaria medio ambiente 2026",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Attollo vehemens at saepe tui laboriosam cresco cuius contego tempus. Capillus aqua assumenda sub comis curis viriliter decor cibus al",
    status: "approved",
    reason: "",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:49.451Z",
    updatedAt: "2026-01-11T21:58:49.451Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 754,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - emergencias",
        description: "Evento presencial para emergencias. Vulpes stips odio terra cresco apto apud delectatio. Stella tenax vitae eos acerbitas adaugeo carus pecus usque blandior.",
        initialDate: "2026-03-08T21:58:16.038Z",
        place: {
          direction: "7052 Rosenbaum Radial, 47659",
          city: "Rosario",
          countryCode: "AR"
        }
      },
      {
        name: "Jornada solidaria - tercera edad",
        description: "Evento presencial para tercera edad. Vos talus amet.",
        initialDate: "2026-05-09T20:58:16.038Z",
        place: {
          direction: "92897 W Broadway Avenue, 9129",
          city: "Trujillo",
          countryCode: "PE"
        }
      }
    ],
    causeId: "f8b59a9a-bacf-4909-ad22-aa5a69507c93"
  },
  {
    _id: "40124211-3af6-4d76-af33-b484af1adf47",
    name: "Red de apoyo derechos humanos 2027",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Sto summa fuga theca dignissimos.",
    status: "approved",
    reason: "",
    userId: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    createdAt: "2026-01-11T21:58:49.514Z",
    updatedAt: "2026-01-11T21:58:49.514Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 797,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 106,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 752,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - salud",
        description: "Evento presencial para salud. Solio complectus cui. Tot eius tondeo.",
        initialDate: "2026-03-06T21:58:16.102Z",
        place: {
          direction: "99708 Coy Union, 225",
          city: "Córdoba",
          countryCode: "AR"
        }
      },
      {
        name: "Jornada solidaria - agua potable",
        description: "Evento presencial para agua potable. Aptus ambulo beatae cohaero earum. Damno neque architecto textus capio tamquam paens.",
        initialDate: "2026-04-23T20:58:16.102Z",
        place: {
          direction: "79597 Block Highway, 20194",
          city: "Valparaíso",
          countryCode: "CL"
        }
      }
    ],
    causeId: "ae3eb1ec-3e16-4835-a8c9-06df78246056"
  },
  {
    _id: "6c73c157-2bcf-45dc-9f8e-bf339d7a57f0",
    name: "Operación igualdad de género 2026",
    description: "Acción concreta para igualdad de género con objetivos cuantificables. Voluptas suscipio verecundia. Tabernus beatae curatio cotidie soluta candidus vergo summa.",
    status: "pending",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:16.178Z",
    updatedAt: "2026-01-11T21:58:16.178Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Limpieza ambiental",
        description: "Limpiar y recuperar espacios naturales degradados",
        quantity: 234,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - derechos humanos",
        description: "Evento presencial para derechos humanos. Ambitus admoveo suffragium textilis confido reprehenderit aveho vilis quia. Approbo aveho ex.",
        initialDate: "2026-02-17T21:58:16.163Z",
        place: {
          direction: "125 Adams Street, 272",
          city: "Torino",
          countryCode: "IT"
        }
      },
      {
        name: "Actividad de voluntariado - infancia",
        description: "Evento presencial para infancia. Asporto tui adflicto barba apostolus et degusto.",
        initialDate: "2026-02-22T21:58:16.163Z",
        place: {
          direction: "579 Brendan View, 91101",
          city: "Fortaleza",
          countryCode: "BR"
        }
      }
    ],
    causeId: "f8b59a9a-bacf-4909-ad22-aa5a69507c93"
  },
  {
    _id: "78c2538a-4206-4465-a242-fb644864d992",
    name: "Jornada educación 2026",
    description: "Acción concreta para educación con objetivos cuantificables. Arcesso ars terga pecco nostrum. Asper volo quidem audeo acceptus curiositas thesaurus tener caritas excepturi.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    createdAt: "2026-01-11T21:58:49.640Z",
    updatedAt: "2026-01-11T21:58:49.640Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 582,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 849,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 434,
        unit: "horas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - educación",
        description: "Evento presencial para educación. Agnosco error amet vox argentum deficio cicuta avaritia. Sollicito suus caelestis color ver crux terra via certus.",
        initialDate: "2026-06-13T20:58:16.224Z",
        place: {
          direction: "73812 Bramble Close, 4490",
          city: "Tijuana",
          countryCode: "MX"
        }
      },
      {
        name: "Taller formativo - salud",
        description: "Evento presencial para salud. Studio laboriosam adeptio.",
        initialDate: "2026-05-08T20:58:16.224Z",
        place: {
          direction: "94124 Kessler Lodge, 8066",
          city: "Barranquilla",
          countryCode: "CO"
        }
      }
    ],
    causeId: "23221843-2c2d-4d7c-864b-1d1c222bc8a6"
  },
  {
    _id: "522e7fa8-478b-48ac-90c7-77194c2b41c1",
    name: "Programa emergencias 2027",
    description: "Acción concreta para emergencias con objetivos cuantificables. Sint tenax cado texo crinis aro toties.",
    status: "approved",
    reason: "",
    userId: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    createdAt: "2026-01-11T21:58:49.704Z",
    updatedAt: "2026-01-11T21:58:49.704Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 277,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 592,
        unit: "unidades",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - vivienda",
        description: "Evento presencial para vivienda. Molestiae sufficio denuncio vaco fuga repudiandae paens tepidus iste repellendus.",
        initialDate: "2026-05-13T20:58:16.285Z",
        place: {
          direction: "856 S Mill Street, 3518",
          city: "Caracas",
          countryCode: "VE"
        }
      },
      {
        name: "Jornada solidaria - alimentación",
        description: "Evento presencial para alimentación. Cura esse crebro sum molestiae cupiditate tutamen.",
        initialDate: "2026-01-25T21:58:16.285Z",
        place: {
          direction: "413 Marguerite Forges, 6640",
          city: "Fortaleza",
          countryCode: "BR"
        }
      }
    ],
    causeId: "d73b58d6-f3d3-4a85-8fa2-cbc1a9e6ea40"
  },
  {
    _id: "3add0613-0eda-4d24-9bcf-98c8e374556a",
    name: "Iniciativa derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Aranea tametsi colo viduo allatus versus solutio amplus.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "29478f16-bf12-4bc0-963a-5c216491299e",
    createdAt: "2026-01-11T21:58:49.890Z",
    updatedAt: "2026-01-11T21:58:49.890Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recaudación de fondos",
        description: "Obtener recursos económicos para financiar las actividades",
        quantity: 161,
        unit: "paquetes",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 625,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 671,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Encuentro comunitario - derechos humanos",
        description: "Evento presencial para derechos humanos. Asper commemoro aveho voluptate. Subvenio cui comitatus defungo.",
        initialDate: "2026-05-16T20:58:16.470Z",
        place: {
          direction: "854 Maple Street, 17730",
          city: "Berlin",
          countryCode: "DE"
        }
      },
      {
        name: "Evento benéfico - derechos humanos",
        description: "Evento presencial para derechos humanos. Sollicito tenuis degero at aranea. Vindico aperte ea super amplus temptatio.",
        initialDate: "2026-05-24T20:58:16.470Z",
        place: {
          direction: "7208 Toby Road, 940",
          city: "Valencia",
          countryCode: "ES"
        }
      }
    ],
    causeId: "90a4c145-5904-466f-814d-ed30b7e82b4a"
  },
  {
    _id: "3bd20aea-c6be-4158-8587-18e583780a06",
    name: "Operación salud 2026",
    description: "Acción concreta para salud con objetivos cuantificables. Tepidus canis adiuvo cupio cibo adiuvo angustus clamo coma tactus.",
    status: "pending",
    userId: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    createdAt: "2026-01-11T21:58:16.545Z",
    updatedAt: "2026-01-11T21:58:16.545Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Distribución de materiales",
        description: "Entregar materiales educativos o de primera necesidad",
        quantity: 503,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 613,
        unit: "cajas",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 546,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Evento benéfico - igualdad de género",
        description: "Evento presencial para igualdad de género. Alienus vorago vulnus a uredo tamisium aegre tibi defero.",
        initialDate: "2026-07-11T20:58:16.532Z",
        place: {
          direction: "863 Donnelly Divide, 913",
          city: "Cusco",
          countryCode: "PE"
        }
      },
      {
        name: "Evento benéfico - discapacidad",
        description: "Evento presencial para discapacidad. Reprehenderit sono aequitas suscipit comitatus angelus vulnus. Taceo tam curriculum tam terebro arcesso audax non.",
        initialDate: "2026-06-08T20:58:16.532Z",
        place: {
          direction: "644 O'Connell Viaduct, 56730",
          city: "Cancún",
          countryCode: "MX"
        }
      }
    ],
    causeId: "ac4bf9dd-e877-48cd-b2e9-8dd16a6f614e"
  },
  {
    _id: "02b07b31-ccc2-4857-86c8-e4cf7207c4d1",
    name: "Red de apoyo medio ambiente 2027",
    description: "Acción concreta para medio ambiente con objetivos cuantificables. Ascit cuppedia tutamen virga illum vereor videlicet bibo. Ratione viscus ipsam vomer dignissimos somniculosus ceno sumo celebrer.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:50.078Z",
    updatedAt: "2026-01-11T21:58:50.078Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Construcción",
        description: "Construir o reparar infraestructuras básicas",
        quantity: 945,
        unit: "litros",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 388,
        unit: "euros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - discapacidad",
        description: "Evento presencial para discapacidad. Tricesimus cavus venio.",
        initialDate: "2026-03-04T21:58:16.656Z",
        place: {
          direction: "4880 Monte Groves, 6853",
          city: "Paris",
          countryCode: "FR"
        }
      },
      {
        name: "Reunión de coordinación - infancia",
        description: "Evento presencial para infancia. Concedo nisi constans alter corpus summopere depereo verto vir.",
        initialDate: "2026-01-31T21:58:16.656Z",
        place: {
          direction: "7259 N Water Street, 764",
          city: "Hamburg",
          countryCode: "DE"
        }
      }
    ],
    causeId: "c96f87e1-26c3-4925-94f8-538145cbc249"
  },
  {
    _id: "409f599f-f71f-44c3-8c54-17cf29563b78",
    name: "Campaña salud 2027",
    description: "Acción concreta para salud con objetivos cuantificables. Qui vaco doloribus tubineus umquam velut vito attollo.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "cc105c39-e779-4094-b288-bfd56c20280f",
    createdAt: "2026-01-11T21:58:50.140Z",
    updatedAt: "2026-01-11T21:58:50.140Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 986,
        unit: "euros",
        currentAmount: 0
      },
      {
        name: "Capacitación",
        description: "Formar a beneficiarios en habilidades específicas",
        quantity: 181,
        unit: "kilogramos",
        currentAmount: 0
      },
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 110,
        unit: "kilogramos",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Taller formativo - igualdad de género",
        description: "Evento presencial para igualdad de género. Cedo stillicidium acerbitas.",
        initialDate: "2026-04-03T20:58:16.719Z",
        place: {
          direction: "343 Darlene Hill, 6499",
          city: "Bordeaux",
          countryCode: "FR"
        }
      },
      {
        name: "Taller formativo - refugiados",
        description: "Evento presencial para refugiados. Odio arbor succedo abscido. Damnatio charisma culpo confido astrum amitto bis deficio ver tenetur.",
        initialDate: "2026-04-22T20:58:16.719Z",
        place: {
          direction: "4716 Canal Street, 5577",
          city: "Barcelona",
          countryCode: "ES"
        }
      }
    ],
    causeId: "d571ef73-ae41-43a0-aa8e-5e4409c504a1"
  },
  {
    _id: "a7679e95-9d10-4827-876e-f6233f123248",
    name: "Programa derechos humanos 2026",
    description: "Acción concreta para derechos humanos con objetivos cuantificables. Solus audax aequus laboriosam adfectus pectus colo arx.",
    status: "approved",
    reason: "",
    userId: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    createdAt: "2026-01-11T21:58:50.203Z",
    updatedAt: "2026-01-11T21:58:50.203Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 908,
        unit: "personas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Jornada solidaria - derechos humanos",
        description: "Evento presencial para derechos humanos. Amplitudo alias collum vinculum antiquus nam brevis esse dens.",
        initialDate: "2026-02-03T21:58:16.781Z",
        place: {
          direction: "7111 Kuhic Greens, 77215",
          city: "Bucaramanga",
          countryCode: "CO"
        }
      }
    ],
    causeId: "3f1c2650-8608-4f67-9b8c-454addeeb255"
  },
  {
    _id: "7818d4f6-9dcd-4970-a9c9-456dde36781f",
    name: "Programa pobreza 2027",
    description: "Acción concreta para pobreza con objetivos cuantificables. Pecto voro verumtamen.",
    status: "rejected",
    reason: "Rejected by seed script",
    userId: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    createdAt: "2026-01-11T21:58:50.264Z",
    updatedAt: "2026-01-11T21:58:50.264Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Recolección de alimentos",
        description: "Recolectar alimentos no perecederos para familias necesitadas",
        quantity: 48,
        unit: "horas",
        currentAmount: 0
      },
      {
        name: "Captación de voluntarios",
        description: "Reclutar y formar nuevos voluntarios para el proyecto",
        quantity: 866,
        unit: "litros",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Actividad de voluntariado - salud",
        description: "Evento presencial para salud. Abutor beneficium suffragium eos delicate aggero victoria articulus decerno.",
        initialDate: "2026-03-06T21:58:16.844Z",
        place: {
          direction: "915 Kendall Keys, 478",
          city: "Ciudad de México",
          countryCode: "MX"
        }
      }
    ],
    causeId: "6a4c5934-d75f-4e22-915a-284b43962916"
  },
  {
    _id: "e8decdad-1ff3-4589-a3cd-32e1d4981423",
    name: "Red de apoyo pobreza 2026",
    description: "Acción concreta para pobreza con objetivos cuantificables. Beatus trado aperte curriculum adimpleo super. Cubicularis casso quasi valens odit vinco.",
    status: "approved",
    reason: "",
    userId: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    createdAt: "2026-01-11T21:58:50.326Z",
    updatedAt: "2026-01-11T21:58:50.326Z",
    __v: 0,
    type: "action",
    objectives: [
      {
        name: "Atención sanitaria",
        description: "Proporcionar servicios básicos de salud",
        quantity: 386,
        unit: "cajas",
        currentAmount: 0
      }
    ],
    events: [
      {
        name: "Reunión de coordinación - discapacidad",
        description: "Evento presencial para discapacidad. Bellum deprecator desolo cerno artificiose cruentus asper via dicta curtus. Abbas usitas teneo apparatus volutabrum certus nam balbus baiulus suscipit.",
        initialDate: "2026-02-12T21:58:16.906Z",
        place: {
          direction: "73185 Abernathy Street, 3385",
          city: "Cancún",
          countryCode: "MX"
        }
      },
      {
        name: "Evento benéfico - emergencias",
        description: "Evento presencial para emergencias. Appello curis somnus cimentarius clementia demulceo strues ascit dens trucido. Commemoro voluptatibus testimonium caveo pecco pecco volaticus utrum subseco amitto.",
        initialDate: "2026-06-19T20:58:16.906Z",
        place: {
          direction: "298 The Oval, 727",
          city: "Antofagasta",
          countryCode: "CL"
        }
      }
    ],
    causeId: "c96f87e1-26c3-4925-94f8-538145cbc249"
  }
]);

// users (318 documents)
print('  Loading users...');
db.users.deleteMany({});
db.users.insertMany([
  {
    _id: "7100d6a0-3ecc-4b8a-867e-481bec26749c",
    fullName: "Connor Mertz O'Keefe-Rohan",
    username: "madalynwillms0",
    phone: "+57012688976",
    location: {
      city: "Medellín",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:44.910Z",
    updatedAt: "2026-01-11T21:56:44.910Z",
    __v: 0
  },
  {
    _id: "9c079bb1-2d11-4fac-bdc6-0381e167afe6",
    fullName: "Juliana Bechtelar Rempel",
    username: "rebekaschroed1",
    phone: "+34022447151",
    location: {
      city: "Sevilla",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:44.955Z",
    updatedAt: "2026-01-11T21:56:44.955Z",
    __v: 0
  },
  {
    _id: "ca04adb2-362c-4600-9c72-a341c28a79e7",
    fullName: "Piper Wiza Towne",
    username: "jeromeratke2",
    phone: "+52522749952",
    location: {
      city: "Tijuana",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.021Z",
    updatedAt: "2026-01-11T21:56:45.021Z",
    __v: 0
  },
  {
    _id: "0bc52c1e-ff78-4870-be4c-03471daa4d5e",
    fullName: "Reymundo Baumbach Grimes",
    username: "lizaconroy3",
    phone: "+55568657294",
    location: {
      city: "Rio de Janeiro",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.081Z",
    updatedAt: "2026-01-11T21:56:45.081Z",
    __v: 0
  },
  {
    _id: "aba0558b-1a32-4b4b-a04c-e94d193b8050",
    fullName: "Avis Kohler Powlowski",
    username: "mikaylajerde4",
    phone: "+44097136311",
    location: {
      city: "Manchester",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.145Z",
    updatedAt: "2026-01-11T21:56:45.145Z",
    __v: 0
  },
  {
    _id: "0f3048fa-3aa7-476e-91a7-3352f026715c",
    fullName: "Korey Bahringer Jerde",
    username: "leilasmitham5",
    phone: "+58747829873",
    location: {
      city: "Caracas",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.205Z",
    updatedAt: "2026-01-11T21:56:45.205Z",
    __v: 0
  },
  {
    _id: "5b88c9f8-c0fb-48fb-a5e6-d9eecb28e2be",
    fullName: "Opal Cormier Ruecker",
    username: "damionkoch6",
    phone: "+33258348305",
    location: {
      city: "Paris",
      countryCode: "FR"
    },
    communityMemberships: [
      {
        communityId: "7f218af0-5719-4a6b-9d04-b8c7b3b6033a",
        communityName: "Colectivo Lang Group por agua potable",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:45.266Z",
    updatedAt: "2026-01-11T21:57:13.807Z",
    __v: 1
  },
  {
    _id: "d6f4bfd6-f7d3-4b35-9cb5-51958b410eca",
    fullName: "Delpha Russel Champlin",
    username: "malloryorn7",
    phone: "+54632210022",
    location: {
      city: "Córdoba",
      countryCode: "AR"
    },
    communityMemberships: [
      {
        communityId: "bc7b53ca-4212-4601-86eb-af5cad4d98fb",
        communityName: "Comunidad Balistreri LLC por desarrollo sostenible",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:45.329Z",
    updatedAt: "2026-01-11T21:57:12.981Z",
    __v: 1
  },
  {
    _id: "7812947a-5a25-4afa-b511-feac536c7cfa",
    fullName: "Terrance Hansen Kunze",
    username: "haroldblanda8",
    phone: "+52677374714",
    location: {
      city: "Tijuana",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.394Z",
    updatedAt: "2026-01-11T21:56:45.394Z",
    __v: 0
  },
  {
    _id: "450d1413-8001-4464-b44c-34f919124e08",
    fullName: "Sammie Botsford Jerde",
    username: "abagailparker9",
    phone: "+56334519541",
    location: {
      city: "Concepción",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.453Z",
    updatedAt: "2026-01-11T21:56:45.453Z",
    __v: 0
  },
  {
    _id: "b2043986-e90d-4d88-9b1d-d521c0ac57bf",
    fullName: "Bailey Wolf Dibbert",
    username: "leonhalvorson10",
    phone: "+58626264229",
    location: {
      city: "Caracas",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.513Z",
    updatedAt: "2026-01-11T21:56:45.513Z",
    __v: 0
  },
  {
    _id: "24caa5dd-77fb-4a75-8e93-64defbd10667",
    fullName: "Abel Heller Lebsack",
    username: "crystalgleich11",
    phone: "+44546171620",
    location: {
      city: "London",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.574Z",
    updatedAt: "2026-01-11T21:56:45.574Z",
    __v: 0
  },
  {
    _id: "9cf986bf-765b-4032-a7f8-fdbd0cc67787",
    fullName: "Karli Crooks Renner",
    username: "vickyrau12",
    phone: "+58917185594",
    location: {
      city: "Valencia",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.636Z",
    updatedAt: "2026-01-11T21:56:45.636Z",
    __v: 0
  },
  {
    _id: "820ac9c8-8e65-41d5-879f-bde326a854c9",
    fullName: "Crystal Emmerich Stamm",
    username: "tomasparisian13",
    phone: "+49276385882",
    location: {
      city: "Frankfurt",
      countryCode: "DE"
    },
    communityMemberships: [
      {
        communityId: "df149923-f276-49e3-b828-e3c0e4ec205f",
        communityName: "Colectivo Schoen, Herman and Christiansen por infa",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:45.697Z",
    updatedAt: "2026-01-11T21:57:13.494Z",
    __v: 1
  },
  {
    _id: "eb3a18de-54f3-4f27-8811-e93bb37a53c1",
    fullName: "Marta Heller Williamson",
    username: "eileenbauch14",
    phone: "+57084334844",
    location: {
      city: "Bogotá",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.758Z",
    updatedAt: "2026-01-11T21:56:45.758Z",
    __v: 0
  },
  {
    _id: "d4d787d9-f9e8-47d4-b111-c9e61a0d3773",
    fullName: "Joany Witting Kassulke",
    username: "ladariusdare15",
    phone: "+57558360739",
    location: {
      city: "Medellín",
      countryCode: "CO"
    },
    communityMemberships: [
      {
        communityId: "60bd8eba-a4bb-43a5-9834-a9bcfc8fe210",
        communityName: "Fundación Hammes - Macejkovic por alimentación",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:45.820Z",
    updatedAt: "2026-01-11T21:57:10.885Z",
    __v: 1
  },
  {
    _id: "b8cc95bb-e731-430b-a1f2-dfad99a64afb",
    fullName: "Christy Lehner Hagenes",
    username: "elsiemedhurst16",
    phone: "+58242129485",
    location: {
      city: "Maracaibo",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.879Z",
    updatedAt: "2026-01-11T21:56:45.879Z",
    __v: 0
  },
  {
    _id: "c5ce77e8-c2ad-4126-bb13-6e6a6b5b4513",
    fullName: "Kay Ullrich Turcotte",
    username: "brooklynwiza17",
    phone: "+51950033785",
    location: {
      city: "Lima",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:45.940Z",
    updatedAt: "2026-01-11T21:56:45.940Z",
    __v: 0
  },
  {
    _id: "9291d8a8-b44e-4a29-8ad0-8890021c7c3c",
    fullName: "Larry Wehner Tillman",
    username: "kenyonswift18",
    phone: "+44278066071",
    location: {
      city: "Manchester",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.000Z",
    updatedAt: "2026-01-11T21:56:46.000Z",
    __v: 0
  },
  {
    _id: "dd679a27-781e-4b34-8ceb-0f979e97e683",
    fullName: "Remington Schmeler Schneider",
    username: "elianewatsica19",
    phone: "+34915666315",
    location: {
      city: "Bilbao",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.059Z",
    updatedAt: "2026-01-11T21:56:46.059Z",
    __v: 0
  },
  {
    _id: "f51f70f5-7799-4df6-8236-7cf2d0ad618a",
    fullName: "Clint Schultz Welch",
    username: "rudykohlerkuh20",
    phone: "+51593565142",
    location: {
      city: "Trujillo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.218Z",
    updatedAt: "2026-01-11T21:56:46.218Z",
    __v: 0
  },
  {
    _id: "83267969-698a-42eb-921e-18f9f8e3fe8f",
    fullName: "Rebeca Wilkinson Mills",
    username: "erynokuneva21",
    phone: "+54472026471",
    location: {
      city: "Tucumán",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.278Z",
    updatedAt: "2026-01-11T21:56:46.278Z",
    __v: 0
  },
  {
    _id: "5958bd0e-e77f-4039-a8de-5678e4cb0de2",
    fullName: "Dayana Bernhard Heathcote",
    username: "yeseniawehner22",
    phone: "+49703006964",
    location: {
      city: "Munich",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.338Z",
    updatedAt: "2026-01-11T21:56:46.338Z",
    __v: 0
  },
  {
    _id: "edf7c0d7-9b19-44e5-b707-e83ef2c62bd2",
    fullName: "Mya Greenholt Bernier",
    username: "mariloulubowi23",
    phone: "+49722396902",
    location: {
      city: "Dresden",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.401Z",
    updatedAt: "2026-01-11T21:56:46.401Z",
    __v: 0
  },
  {
    _id: "f9bf67fc-754c-4c8c-a31a-d30f4a8c7374",
    fullName: "Edwin Gorczany D'Amore",
    username: "demondwolf24",
    phone: "+51027295576",
    location: {
      city: "Trujillo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.460Z",
    updatedAt: "2026-01-11T21:56:46.460Z",
    __v: 0
  },
  {
    _id: "44a8df4a-2c6b-4f01-8d23-1b09ed6a3cbb",
    fullName: "Orval Bogan Friesen",
    username: "susierau25",
    phone: "+44299523674",
    location: {
      city: "Manchester",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.520Z",
    updatedAt: "2026-01-11T21:56:46.520Z",
    __v: 0
  },
  {
    _id: "08eeb1ec-c76d-4389-b5c3-5c6b0b1b2253",
    fullName: "Otho Fadel Bergnaum",
    username: "davonolson26",
    phone: "+52249546528",
    location: {
      city: "Ciudad de México",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.580Z",
    updatedAt: "2026-01-11T21:56:46.580Z",
    __v: 0
  },
  {
    _id: "cff10ed8-1e65-45ef-9475-e25daa5e0820",
    fullName: "Sedrick Treutel Nienow",
    username: "savannahhaag27",
    phone: "+49051502785",
    location: {
      city: "Berlin",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.639Z",
    updatedAt: "2026-01-11T21:56:46.639Z",
    __v: 0
  },
  {
    _id: "559f9b98-4765-481d-b208-1afd86f12af0",
    fullName: "Gerardo Metz Nikolaus",
    username: "ismaelcrooks28",
    phone: "+54145719388",
    location: {
      city: "Tucumán",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.699Z",
    updatedAt: "2026-01-11T21:56:46.699Z",
    __v: 0
  },
  {
    _id: "bb24f3d8-66b2-4866-b195-9b1eecb47ea7",
    fullName: "Simone Kerluke Pfeffer",
    username: "rashadmayert29",
    phone: "+51742736085",
    location: {
      city: "Lima",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.763Z",
    updatedAt: "2026-01-11T21:56:46.763Z",
    __v: 0
  },
  {
    _id: "cc46d331-0bb8-41f1-b087-ce97dadca0af",
    fullName: "Thomas Homenick-Wintheiser Kuvalis",
    username: "earnestkirlin30",
    phone: "+33355021928",
    location: {
      city: "Lille",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.820Z",
    updatedAt: "2026-01-11T21:56:46.820Z",
    __v: 0
  },
  {
    _id: "24b2b23f-672b-40f5-aac4-9c642b8a51f2",
    fullName: "Breanne Davis Tremblay",
    username: "dinokutch31",
    phone: "+58751325988",
    location: {
      city: "Maracay",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.881Z",
    updatedAt: "2026-01-11T21:56:46.881Z",
    __v: 0
  },
  {
    _id: "66753be2-4fd0-46f4-98c1-66dfd69bd2b1",
    fullName: "Eloy Reichert Witting",
    username: "serenitygoodw32",
    phone: "+51559495930",
    location: {
      city: "Arequipa",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:46.943Z",
    updatedAt: "2026-01-11T21:56:46.943Z",
    __v: 0
  },
  {
    _id: "08e671e1-0a7e-4d80-af93-e43eacadf71b",
    fullName: "Eloisa Mitchell Beier",
    username: "lindsaymohr33",
    phone: "+39669816078",
    location: {
      city: "Napoli",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.003Z",
    updatedAt: "2026-01-11T21:56:47.003Z",
    __v: 0
  },
  {
    _id: "6d1e9761-8b72-4767-9144-038cd49ad369",
    fullName: "Alize Dietrich Heaney",
    username: "westonwisoky34",
    phone: "+39521786316",
    location: {
      city: "Bologna",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.064Z",
    updatedAt: "2026-01-11T21:56:47.064Z",
    __v: 0
  },
  {
    _id: "0e6fd646-c890-46cc-94ab-22a0b975d246",
    fullName: "Lincoln Schumm-Hane Russel",
    username: "julienbaumbac35",
    phone: "+44796124757",
    location: {
      city: "Edinburgh",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.125Z",
    updatedAt: "2026-01-11T21:56:47.125Z",
    __v: 0
  },
  {
    _id: "9903e732-adb8-43a1-be30-bef37047873e",
    fullName: "Laila Moen Towne",
    username: "mayhayes36",
    phone: "+39672812375",
    location: {
      city: "Roma",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.185Z",
    updatedAt: "2026-01-11T21:56:47.185Z",
    __v: 0
  },
  {
    _id: "6a0519e8-5d00-4988-82f8-e6041f61915f",
    fullName: "Fausto Corkery Waters",
    username: "williefeil37",
    phone: "+44882205888",
    location: {
      city: "Birmingham",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.246Z",
    updatedAt: "2026-01-11T21:56:47.246Z",
    __v: 0
  },
  {
    _id: "f6b85e7d-5224-4acf-b5d7-0fd4ce6c0fab",
    fullName: "Carolina Carroll Upton",
    username: "ruthbrown38",
    phone: "+54210883031",
    location: {
      city: "Rosario",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.307Z",
    updatedAt: "2026-01-11T21:56:47.307Z",
    __v: 0
  },
  {
    _id: "b8275f84-755b-4804-8788-ee925b100f54",
    fullName: "Lilly Leannon Homenick",
    username: "mittieprice39",
    phone: "+55229417454",
    location: {
      city: "São Paulo",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.367Z",
    updatedAt: "2026-01-11T21:56:47.367Z",
    __v: 0
  },
  {
    _id: "d7d42334-db02-4d6c-9946-9c9591c8d6e1",
    fullName: "Eunice Labadie Grant",
    username: "rahulkesslerg40",
    phone: "+56580100391",
    location: {
      city: "Santiago",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.540Z",
    updatedAt: "2026-01-11T21:56:47.540Z",
    __v: 0
  },
  {
    _id: "ec938592-0931-4729-8b6b-fb8687626484",
    fullName: "Clare Klein Metz",
    username: "kathrynwilkin41",
    phone: "+33512041603",
    location: {
      city: "Paris",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.601Z",
    updatedAt: "2026-01-11T21:56:47.601Z",
    __v: 0
  },
  {
    _id: "12782c49-d1b5-4853-b55e-7f8c4070c429",
    fullName: "Domenick Hane Dibbert",
    username: "clemmiegerhol42",
    phone: "+52886615378",
    location: {
      city: "Ciudad de México",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.662Z",
    updatedAt: "2026-01-11T21:56:47.662Z",
    __v: 0
  },
  {
    _id: "cf18ff91-fe5e-421c-8bcb-bce9f001832d",
    fullName: "Kris Olson Gusikowski",
    username: "jamieprosacco43",
    phone: "+51981408152",
    location: {
      city: "Lima",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.721Z",
    updatedAt: "2026-01-11T21:56:47.721Z",
    __v: 0
  },
  {
    _id: "f739e981-82dd-4582-99fb-118808da769c",
    fullName: "Rossie Hartmann Konopelski",
    username: "thomaskerluke44",
    phone: "+33985602158",
    location: {
      city: "Paris",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.782Z",
    updatedAt: "2026-01-11T21:56:47.782Z",
    __v: 0
  },
  {
    _id: "40e8f124-ce72-4876-982d-8c209f122cc5",
    fullName: "Kyle Turcotte Torphy",
    username: "khalilwisoky45",
    phone: "+54806985077",
    location: {
      city: "Mendoza",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.842Z",
    updatedAt: "2026-01-11T21:56:47.842Z",
    __v: 0
  },
  {
    _id: "610d9a96-7b06-46b4-8498-1bea34e65818",
    fullName: "Morgan Johnston Spencer",
    username: "stephoncole46",
    phone: "+54056115216",
    location: {
      city: "Tucumán",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.903Z",
    updatedAt: "2026-01-11T21:56:47.903Z",
    __v: 0
  },
  {
    _id: "11e2cffe-2380-41b9-8cf2-7155ac904d05",
    fullName: "Sebastian Kshlerin Schumm",
    username: "camrynkub47",
    phone: "+52264120340",
    location: {
      city: "Cancún",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:47.965Z",
    updatedAt: "2026-01-11T21:56:47.965Z",
    __v: 0
  },
  {
    _id: "f256a724-1c58-4356-be6b-4ac7546f0652",
    fullName: "Jammie Nolan Parisian",
    username: "talonfarrell48",
    phone: "+51870440121",
    location: {
      city: "Trujillo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.022Z",
    updatedAt: "2026-01-11T21:56:48.022Z",
    __v: 0
  },
  {
    _id: "078dc24b-a562-4c64-a15e-8563adf79807",
    fullName: "Gene Kutch Effertz",
    username: "javonkling49",
    phone: "+58183210239",
    location: {
      city: "Valencia",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.083Z",
    updatedAt: "2026-01-11T21:56:48.083Z",
    __v: 0
  },
  {
    _id: "de959a61-8e84-4014-b448-a7ade6eb0528",
    fullName: "Mekhi Medhurst Altenwerth",
    username: "catherinestie50",
    phone: "+44931873008",
    location: {
      city: "Glasgow",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.145Z",
    updatedAt: "2026-01-11T21:56:48.145Z",
    __v: 0
  },
  {
    _id: "02e86ec3-c0d9-459f-b181-e046b8b2e2a1",
    fullName: "Cordie O'Kon Effertz",
    username: "dorthabergnau51",
    phone: "+56864600754",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [
      {
        communityId: "58c55259-195b-4e2b-b2f1-00f30b02197a",
        communityName: "Grupo Franey Group por refugiados",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:48.203Z",
    updatedAt: "2026-01-11T21:57:12.112Z",
    __v: 1
  },
  {
    _id: "9a7041d1-34b7-4628-b4e0-e72f075dcd3f",
    fullName: "Cordie Jast Pouros",
    username: "joanylegros52",
    phone: "+51973555443",
    location: {
      city: "Cusco",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.263Z",
    updatedAt: "2026-01-11T21:56:48.263Z",
    __v: 0
  },
  {
    _id: "88e2a55b-9179-4d36-827c-d1c4513fb147",
    fullName: "Felton Harris O'Connell",
    username: "israelmurazik53",
    phone: "+57823135553",
    location: {
      city: "Bogotá",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.325Z",
    updatedAt: "2026-01-11T21:56:48.325Z",
    __v: 0
  },
  {
    _id: "b5ba4b8e-8930-48d4-9bb0-cbd1fd41eda6",
    fullName: "Roy Grant Douglas-Tremblay",
    username: "ivoryfriesen54",
    phone: "+44936003137",
    location: {
      city: "Glasgow",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.385Z",
    updatedAt: "2026-01-11T21:56:48.385Z",
    __v: 0
  },
  {
    _id: "d65f824c-6ba1-4c7d-9fb6-ec8380b23bdd",
    fullName: "Hassan Doyle-Cartwright Johnson",
    username: "eloisadooley55",
    phone: "+44750442275",
    location: {
      city: "London",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.444Z",
    updatedAt: "2026-01-11T21:56:48.444Z",
    __v: 0
  },
  {
    _id: "668eae23-4257-4492-8a77-c9f899cace6f",
    fullName: "Makenzie Bayer Schiller",
    username: "terrellbayer56",
    phone: "+55364412961",
    location: {
      city: "Brasília",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.507Z",
    updatedAt: "2026-01-11T21:56:48.507Z",
    __v: 0
  },
  {
    _id: "ca24fc21-94d4-4155-a370-675a61745b79",
    fullName: "Rick Mraz Sauer",
    username: "princecremin57",
    phone: "+57177395613",
    location: {
      city: "Cartagena",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.566Z",
    updatedAt: "2026-01-11T21:56:48.566Z",
    __v: 0
  },
  {
    _id: "7ae078d0-a269-4f90-9bef-9e2b24e6ad0b",
    fullName: "Marcel Rutherford Turcotte",
    username: "veronicacassi58",
    phone: "+52917460093",
    location: {
      city: "Monterrey",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.628Z",
    updatedAt: "2026-01-11T21:56:48.628Z",
    __v: 0
  },
  {
    _id: "11f20805-a656-43a5-acc0-96d8f801859e",
    fullName: "Helen Fritsch Rath",
    username: "rebecaleuschk59",
    phone: "+57452072423",
    location: {
      city: "Cali",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.689Z",
    updatedAt: "2026-01-11T21:56:48.689Z",
    __v: 0
  },
  {
    _id: "77135aed-8266-4b62-ba06-87914d1bf4ed",
    fullName: "Aurelio Connelly Welch",
    username: "rebeccasanfor60",
    phone: "+49408452041",
    location: {
      city: "Stuttgart",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.856Z",
    updatedAt: "2026-01-11T21:56:48.856Z",
    __v: 0
  },
  {
    _id: "9a2c63dd-399b-4a70-89ed-4bb8ef78ef1b",
    fullName: "Ferne Bernhard Kunde",
    username: "joellefarrell61",
    phone: "+58750727860",
    location: {
      city: "Maracay",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.916Z",
    updatedAt: "2026-01-11T21:56:48.916Z",
    __v: 0
  },
  {
    _id: "716101fc-1a60-4623-a729-d2233feeffd7",
    fullName: "Fiona Nienow Mraz",
    username: "jerelmillshom62",
    phone: "+44560103833",
    location: {
      city: "Glasgow",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:48.978Z",
    updatedAt: "2026-01-11T21:56:48.978Z",
    __v: 0
  },
  {
    _id: "630e07db-b849-4e1f-9908-f3296fff8fb7",
    fullName: "Caroline Konopelski Oberbrunner",
    username: "orphasipes63",
    phone: "+55296660140",
    location: {
      city: "Salvador",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.038Z",
    updatedAt: "2026-01-11T21:56:49.038Z",
    __v: 0
  },
  {
    _id: "43628eff-5c72-4adf-87a6-99a2e99e4280",
    fullName: "Unique Kuhic Schulist",
    username: "waldofeest64",
    phone: "+39737383563",
    location: {
      city: "Torino",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.096Z",
    updatedAt: "2026-01-11T21:56:49.096Z",
    __v: 0
  },
  {
    _id: "71f5fbe9-aa90-48bc-821e-656cc5b221bb",
    fullName: "Enola Bednar Ryan",
    username: "reubenmacejko65",
    phone: "+51519313095",
    location: {
      city: "Trujillo",
      countryCode: "PE"
    },
    communityMemberships: [
      {
        communityId: "4d00e939-7fdc-4195-bf34-2f1cbf4e84af",
        communityName: "Grupo Ledner - Dickinson por discapacidad",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:49.156Z",
    updatedAt: "2026-01-11T21:57:12.588Z",
    __v: 1
  },
  {
    _id: "3b1ebbad-3527-4227-a2f4-d23ea755e44e",
    fullName: "Barton Roob Block",
    username: "jarrettconn66",
    phone: "+49173446872",
    location: {
      city: "Berlin",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.216Z",
    updatedAt: "2026-01-11T21:56:49.216Z",
    __v: 0
  },
  {
    _id: "3c91593f-e9f7-4ed0-a6d8-5f2f724758a8",
    fullName: "Helga Reinger Waters",
    username: "eugeniabernha67",
    phone: "+39734157555",
    location: {
      city: "Roma",
      countryCode: "IT"
    },
    communityMemberships: [
      {
        communityId: "645a3d2c-9c30-4138-bb08-561b55173d6e",
        communityName: "Colectivo Lakin Group por desarrollo sostenible",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:49.277Z",
    updatedAt: "2026-01-11T21:57:12.315Z",
    __v: 1
  },
  {
    _id: "fc822861-127e-461c-92ad-bd59a3b52d0e",
    fullName: "Christ Kessler Bechtelar",
    username: "rowlandbaumba68",
    phone: "+39972320643",
    location: {
      city: "Firenze",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.338Z",
    updatedAt: "2026-01-11T21:56:49.338Z",
    __v: 0
  },
  {
    _id: "5377d8ab-7bea-4287-9932-27b91277c6a4",
    fullName: "Ardith Sawayn Hansen",
    username: "anissawatsica69",
    phone: "+44726386550",
    location: {
      city: "Edinburgh",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.399Z",
    updatedAt: "2026-01-11T21:56:49.399Z",
    __v: 0
  },
  {
    _id: "0838ecfa-2d60-49c7-af76-1e5ae3659b2b",
    fullName: "Houston Ondricka Rau-Powlowski",
    username: "casperbeatty70",
    phone: "+49756674458",
    location: {
      city: "Frankfurt",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.459Z",
    updatedAt: "2026-01-11T21:56:49.459Z",
    __v: 0
  },
  {
    _id: "eb885d47-cd51-4450-b98c-0ca6d322d01c",
    fullName: "Serenity Schowalter Breitenberg-Gleason",
    username: "priscillamora71",
    phone: "+52115365468",
    location: {
      city: "Guadalajara",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.518Z",
    updatedAt: "2026-01-11T21:56:49.518Z",
    __v: 0
  },
  {
    _id: "e76676b6-7865-4843-a16a-c38377094f28",
    fullName: "Jayme Anderson Durgan",
    username: "pricemayer72",
    phone: "+58218638585",
    location: {
      city: "Barquisimeto",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.579Z",
    updatedAt: "2026-01-11T21:56:49.579Z",
    __v: 0
  },
  {
    _id: "c31e04c7-bfd2-4127-874d-8612b9f43658",
    fullName: "Lucienne Sipes Stark",
    username: "jessikachrist73",
    phone: "+58921548053",
    location: {
      city: "Caracas",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.638Z",
    updatedAt: "2026-01-11T21:56:49.638Z",
    __v: 0
  },
  {
    _id: "e7d74bab-3cab-43c8-a176-90f6119178ac",
    fullName: "Sarah Hagenes Rice",
    username: "roelgrimeskir74",
    phone: "+49847000350",
    location: {
      city: "Dresden",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.697Z",
    updatedAt: "2026-01-11T21:56:49.697Z",
    __v: 0
  },
  {
    _id: "481e56e3-1350-4ec2-b665-d545bbaae3f4",
    fullName: "Maryjane Wiegand Batz",
    username: "glendaleuschk75",
    phone: "+34239265086",
    location: {
      city: "Zaragoza",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.758Z",
    updatedAt: "2026-01-11T21:56:49.758Z",
    __v: 0
  },
  {
    _id: "cbd8471b-dccd-482e-8768-1d5f8ef3311e",
    fullName: "Timothy Jacobi Weber",
    username: "shayleewittin76",
    phone: "+54941182667",
    location: {
      city: "Córdoba",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.817Z",
    updatedAt: "2026-01-11T21:56:49.817Z",
    __v: 0
  },
  {
    _id: "fc2bc963-4c65-4936-bc9c-e7882058d0e8",
    fullName: "Amani Hane D'Amore",
    username: "mateomante77",
    phone: "+49867810395",
    location: {
      city: "Stuttgart",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.877Z",
    updatedAt: "2026-01-11T21:56:49.877Z",
    __v: 0
  },
  {
    _id: "161ec767-aa17-4bff-8d31-9ead9f996144",
    fullName: "Dallin Kutch Stroman",
    username: "cruzmaggio78",
    phone: "+44562006385",
    location: {
      city: "Manchester",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:49.936Z",
    updatedAt: "2026-01-11T21:56:49.936Z",
    __v: 0
  },
  {
    _id: "dc70689c-ded6-4002-a1c2-a30485c4b16c",
    fullName: "Jerrold Labadie Dare",
    username: "adriennewelch79",
    phone: "+51345370546",
    location: {
      city: "Lima",
      countryCode: "PE"
    },
    communityMemberships: [
      {
        communityId: "49c42598-bfaf-43df-8ebe-17518570bae9",
        communityName: "Red Schneider - Wolff por educación",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:49.996Z",
    updatedAt: "2026-01-11T21:57:10.994Z",
    __v: 1
  },
  {
    _id: "ab8ad48c-9715-4bde-9312-59d13892c8fe",
    fullName: "Lura Champlin Kub",
    username: "marquiseflatl80",
    phone: "+58866428651",
    location: {
      city: "Maracaibo",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.162Z",
    updatedAt: "2026-01-11T21:56:50.162Z",
    __v: 0
  },
  {
    _id: "b512ee22-3270-4127-a4fb-11f6f80c346f",
    fullName: "Lizeth Strosin Reilly",
    username: "coltenhagenes81",
    phone: "+54802392984",
    location: {
      city: "Mar del Plata",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.220Z",
    updatedAt: "2026-01-11T21:56:50.220Z",
    __v: 0
  },
  {
    _id: "143bd675-7247-4280-affb-4cbfde008355",
    fullName: "Aliza Bailey Effertz",
    username: "mafaldaschmid82",
    phone: "+57081702185",
    location: {
      city: "Medellín",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.281Z",
    updatedAt: "2026-01-11T21:56:50.281Z",
    __v: 0
  },
  {
    _id: "891189d3-64e7-47a3-bfe9-41ecc39137d5",
    fullName: "Ervin Schowalter-Stanton Kassulke",
    username: "deannaparisia83",
    phone: "+39230831853",
    location: {
      city: "Napoli",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.343Z",
    updatedAt: "2026-01-11T21:56:50.343Z",
    __v: 0
  },
  {
    _id: "28bef1d5-436d-48e4-8d06-75b85120fef5",
    fullName: "Karianne Weber Shanahan",
    username: "montanaherzog84",
    phone: "+55993633872",
    location: {
      city: "Brasília",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.402Z",
    updatedAt: "2026-01-11T21:56:50.402Z",
    __v: 0
  },
  {
    _id: "531e4b40-c4ef-4a94-9f9e-a6a038274bbc",
    fullName: "Kameron Windler Schiller",
    username: "sarahcorwin85",
    phone: "+52507490355",
    location: {
      city: "Guadalajara",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.460Z",
    updatedAt: "2026-01-11T21:56:50.460Z",
    __v: 0
  },
  {
    _id: "0acaf16b-9181-447a-bfc5-5dc62a3464f2",
    fullName: "Braxton Feest Hoeger",
    username: "priscillawuns86",
    phone: "+56128893528",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.523Z",
    updatedAt: "2026-01-11T21:56:50.523Z",
    __v: 0
  },
  {
    _id: "129dc1c0-2764-432a-9636-b977fbd46330",
    fullName: "Priscilla Herzog Braun",
    username: "judgeharber87",
    phone: "+34092574037",
    location: {
      city: "Barcelona",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.584Z",
    updatedAt: "2026-01-11T21:56:50.584Z",
    __v: 0
  },
  {
    _id: "beec9477-0856-4ec7-855d-8bf01c366eda",
    fullName: "Ezra Daugherty Reynolds",
    username: "lewschultz88",
    phone: "+55787103161",
    location: {
      city: "Brasília",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.644Z",
    updatedAt: "2026-01-11T21:56:50.644Z",
    __v: 0
  },
  {
    _id: "e21f232e-24cf-42b9-a510-ad9611e10a68",
    fullName: "Ronaldo Thiel Grant-Rolfson",
    username: "denaquigley89",
    phone: "+56137416038",
    location: {
      city: "Concepción",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.706Z",
    updatedAt: "2026-01-11T21:56:50.706Z",
    __v: 0
  },
  {
    _id: "5f57bae0-7fb6-4bff-99c2-d37f054d19a6",
    fullName: "Lizeth Pfeffer Shanahan-Bahringer",
    username: "briannemuller90",
    phone: "+56132474714",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.767Z",
    updatedAt: "2026-01-11T21:56:50.767Z",
    __v: 0
  },
  {
    _id: "390c4542-772f-4887-9d90-5053803f2c76",
    fullName: "Reid Bogisich Langworth",
    username: "alisharippin91",
    phone: "+52973331131",
    location: {
      city: "León",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.827Z",
    updatedAt: "2026-01-11T21:56:50.827Z",
    __v: 0
  },
  {
    _id: "c328e43a-efe5-4fc1-94d2-7be2afb22cb0",
    fullName: "Antonetta Bauch Kertzmann",
    username: "bessiegoyette92",
    phone: "+51708586304",
    location: {
      city: "Cusco",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.886Z",
    updatedAt: "2026-01-11T21:56:50.886Z",
    __v: 0
  },
  {
    _id: "d140aacb-d3cb-4ba5-ad82-8610bae87d1d",
    fullName: "Jesse Funk Ferry-Gerlach",
    username: "marlinabbott93",
    phone: "+34911022333",
    location: {
      city: "Zaragoza",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:50.946Z",
    updatedAt: "2026-01-11T21:56:50.946Z",
    __v: 0
  },
  {
    _id: "b37ff72d-f725-4cde-a5d8-3fe6c9d80002",
    fullName: "Lia Greenholt Feil",
    username: "stephanyconro94",
    phone: "+57316749006",
    location: {
      city: "Medellín",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.007Z",
    updatedAt: "2026-01-11T21:56:51.007Z",
    __v: 0
  },
  {
    _id: "d1b8151d-d8dd-4ef7-9134-15ce5684940d",
    fullName: "Hulda Ledner Marks",
    username: "janessahaag95",
    phone: "+56295596470",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [
      {
        communityId: "ca9aa4c0-e660-4f37-89fe-bff0f1083f48",
        communityName: "Red Homenick, Shanahan and Macejkovic por discapac",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:51.066Z",
    updatedAt: "2026-01-11T21:57:11.069Z",
    __v: 1
  },
  {
    _id: "e07dfe66-6f3a-4be0-8c69-41f7539dadbc",
    fullName: "Lisa Dietrich Schulist",
    username: "nellafadel96",
    phone: "+57486295591",
    location: {
      city: "Cartagena",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.125Z",
    updatedAt: "2026-01-11T21:56:51.125Z",
    __v: 0
  },
  {
    _id: "29478f16-bf12-4bc0-963a-5c216491299e",
    fullName: "Delia Blanda Prohaska",
    username: "carleechampli97",
    phone: "+57397888785",
    location: {
      city: "Cali",
      countryCode: "CO"
    },
    communityMemberships: [
      {
        communityId: "40054622-29aa-4ce8-97c1-8d8d6cff7878",
        communityName: "Fundación Kozey, Dare and Hintz por educación",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:51.184Z",
    updatedAt: "2026-01-11T21:57:11.461Z",
    __v: 1
  },
  {
    _id: "1c8d33ac-3890-4a83-b054-262b290e174d",
    fullName: "Florian Ritchie Hermann",
    username: "kielbogisich98",
    phone: "+39089940544",
    location: {
      city: "Bologna",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.245Z",
    updatedAt: "2026-01-11T21:56:51.245Z",
    __v: 0
  },
  {
    _id: "ebbc188e-fc13-4a6c-bef3-37d930a1eecf",
    fullName: "Lincoln McDermott Predovic",
    username: "ramiromraz99",
    phone: "+52180921666",
    location: {
      city: "Monterrey",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.306Z",
    updatedAt: "2026-01-11T21:56:51.306Z",
    __v: 0
  },
  {
    _id: "9a396e15-c5c4-45d9-8340-e9eab64cb075",
    fullName: "Claudine Miller O'Connell",
    username: "doloresdickin100",
    phone: "+49209704637",
    location: {
      city: "Berlin",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.474Z",
    updatedAt: "2026-01-11T21:56:51.474Z",
    __v: 0
  },
  {
    _id: "9bb9421a-bda2-41f4-9169-e9e3b20cfc1d",
    fullName: "Mae Von Emmerich",
    username: "eduardogerhol101",
    phone: "+52827350848",
    location: {
      city: "Ciudad de México",
      countryCode: "MX"
    },
    communityMemberships: [
      {
        communityId: "0db2d9b5-ff38-479a-aaee-2b28f649cb11",
        communityName: "Colectivo Bode LLC por vivienda",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:51.535Z",
    updatedAt: "2026-01-11T21:57:13.682Z",
    __v: 1
  },
  {
    _id: "3c29c70c-3ffb-4c9f-a13d-26ccd943e440",
    fullName: "Ellis Schultz-Schoen Schimmel",
    username: "orvillebruen102",
    phone: "+58499292333",
    location: {
      city: "Maracaibo",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.594Z",
    updatedAt: "2026-01-11T21:56:51.594Z",
    __v: 0
  },
  {
    _id: "710f709e-2fdc-4ccf-be14-2a140e98987c",
    fullName: "Alverta Gibson Hessel",
    username: "liawindlercon103",
    phone: "+57099451041",
    location: {
      city: "Bogotá",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.653Z",
    updatedAt: "2026-01-11T21:56:51.653Z",
    __v: 0
  },
  {
    _id: "cb9bd6bc-48d0-4c2d-9cb1-e0cfceef7566",
    fullName: "Kaitlin Mante Klocko",
    username: "marcelinacorm104",
    phone: "+51575945852",
    location: {
      city: "Chiclayo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.713Z",
    updatedAt: "2026-01-11T21:56:51.713Z",
    __v: 0
  },
  {
    _id: "92371060-dcf9-46ca-8e64-1953af2c8e2d",
    fullName: "Isom Farrell Thompson",
    username: "garrygoldner105",
    phone: "+39747026488",
    location: {
      city: "Milano",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.773Z",
    updatedAt: "2026-01-11T21:56:51.773Z",
    __v: 0
  },
  {
    _id: "d830ab5d-e4f9-4450-9181-7753dd5e451f",
    fullName: "Harmon Goldner Hagenes",
    username: "nataliaschult106",
    phone: "+39087315005",
    location: {
      city: "Roma",
      countryCode: "IT"
    },
    communityMemberships: [
      {
        communityId: "70b00318-33b6-482d-87dd-22c518933f0e",
        communityName: "Fundación Kessler - Quitzon por refugiados",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:51.833Z",
    updatedAt: "2026-01-11T21:57:13.558Z",
    __v: 1
  },
  {
    _id: "f5533f46-7293-4e49-9201-b7ee0be2e43d",
    fullName: "Pauline Jenkins Swift",
    username: "hersheldietri107",
    phone: "+49359864938",
    location: {
      city: "Dresden",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.893Z",
    updatedAt: "2026-01-11T21:56:51.893Z",
    __v: 0
  },
  {
    _id: "2d544cfd-51c4-4335-8227-6b2579ca1535",
    fullName: "Jerel Moen Kulas",
    username: "americohermis108",
    phone: "+39238134075",
    location: {
      city: "Bologna",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:51.954Z",
    updatedAt: "2026-01-11T21:56:51.954Z",
    __v: 0
  },
  {
    _id: "62cc3be8-3eed-4ff9-a771-032a8d5adcde",
    fullName: "Maureen Dietrich Keebler",
    username: "calebstark109",
    phone: "+58082080847",
    location: {
      city: "Barquisimeto",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.015Z",
    updatedAt: "2026-01-11T21:56:52.015Z",
    __v: 0
  },
  {
    _id: "4815021c-07f8-4779-b936-ae4e022fd2f4",
    fullName: "Dorian Ryan Rippin",
    username: "hollybahringe110",
    phone: "+49900722757",
    location: {
      city: "Munich",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.078Z",
    updatedAt: "2026-01-11T21:56:52.078Z",
    __v: 0
  },
  {
    _id: "af865b54-1470-4cb7-ad37-5a83ab756e4f",
    fullName: "Chaim Hahn Erdman-Davis",
    username: "noemybernhard111",
    phone: "+33724164037",
    location: {
      city: "Toulouse",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.142Z",
    updatedAt: "2026-01-11T21:56:52.142Z",
    __v: 0
  },
  {
    _id: "b8f802c2-2a5e-4e1c-bb5c-fca34ef31747",
    fullName: "Alfredo Ernser Marks",
    username: "orphabechtela112",
    phone: "+49355628259",
    location: {
      city: "Stuttgart",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.201Z",
    updatedAt: "2026-01-11T21:56:52.201Z",
    __v: 0
  },
  {
    _id: "ff8f3a55-99c9-4d31-980b-85e0cc2ccb35",
    fullName: "Bradly Lehner Bode",
    username: "myrnaschmeler113",
    phone: "+51073005415",
    location: {
      city: "Cusco",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.260Z",
    updatedAt: "2026-01-11T21:56:52.260Z",
    __v: 0
  },
  {
    _id: "46116bd2-bcad-4b7c-af37-e5c4da1aa73a",
    fullName: "Marcia Brown Terry",
    username: "alanisvolkman114",
    phone: "+54469802677",
    location: {
      city: "Buenos Aires",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.319Z",
    updatedAt: "2026-01-11T21:56:52.319Z",
    __v: 0
  },
  {
    _id: "37459de5-c538-401a-bb74-b17d76fb1c54",
    fullName: "Houston Lueilwitz Carroll",
    username: "chelsiekoch115",
    phone: "+49582813229",
    location: {
      city: "Hamburg",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.382Z",
    updatedAt: "2026-01-11T21:56:52.382Z",
    __v: 0
  },
  {
    _id: "6f9a3f3b-313b-4b21-8554-a0bb5b20bfa4",
    fullName: "Imogene Sawayn Boyle",
    username: "willissatterf116",
    phone: "+51427058826",
    location: {
      city: "Cusco",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.442Z",
    updatedAt: "2026-01-11T21:56:52.442Z",
    __v: 0
  },
  {
    _id: "88caceec-5522-449b-8dea-c38f5ea5f724",
    fullName: "Gretchen Mertz Frami",
    username: "demariofraney117",
    phone: "+58233379943",
    location: {
      city: "Caracas",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.503Z",
    updatedAt: "2026-01-11T21:56:52.503Z",
    __v: 0
  },
  {
    _id: "5f3ac85d-d74a-4d56-ad01-287d62556de4",
    fullName: "Carolanne Pacocha Cremin",
    username: "jovanyschulis118",
    phone: "+52413965597",
    location: {
      city: "Puebla",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.563Z",
    updatedAt: "2026-01-11T21:56:52.563Z",
    __v: 0
  },
  {
    _id: "2b0b78bf-58be-4603-b3d1-f7cf482b93d5",
    fullName: "Ubaldo O'Keefe Cormier",
    username: "javonschneide119",
    phone: "+58202601198",
    location: {
      city: "Maracay",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.623Z",
    updatedAt: "2026-01-11T21:56:52.623Z",
    __v: 0
  },
  {
    _id: "54b349f9-11ee-48a1-8473-fc79cdb9d675",
    fullName: "Enola Doyle Lehner",
    username: "verliejerde120",
    phone: "+52820308004",
    location: {
      city: "León",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.801Z",
    updatedAt: "2026-01-11T21:56:52.801Z",
    __v: 0
  },
  {
    _id: "2e55fad8-a832-483e-acc7-4649d39af9de",
    fullName: "Mariam Stroman Flatley",
    username: "roderickbeier121",
    phone: "+54323743839",
    location: {
      city: "Mar del Plata",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.862Z",
    updatedAt: "2026-01-11T21:56:52.862Z",
    __v: 0
  },
  {
    _id: "fa87024b-e9c1-495f-a154-0497f616ad2f",
    fullName: "Cassandra Schamberger-Rolfson Schmitt",
    username: "kathrynjohns122",
    phone: "+34050727255",
    location: {
      city: "Murcia",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.925Z",
    updatedAt: "2026-01-11T21:56:52.925Z",
    __v: 0
  },
  {
    _id: "bd905e42-4578-49a7-b034-68f28db1ebf7",
    fullName: "Darron Marks Tremblay",
    username: "vestaschimmel123",
    phone: "+55428927523",
    location: {
      city: "Fortaleza",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:52.987Z",
    updatedAt: "2026-01-11T21:56:52.987Z",
    __v: 0
  },
  {
    _id: "c28c0a77-f12f-4542-a333-9858713bb5b9",
    fullName: "Matilde Jacobson Waters",
    username: "isachermann124",
    phone: "+56523709131",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [
      {
        communityId: "6cd3e7f7-c1b3-47a0-948c-83060ca95b11",
        communityName: "Red Greenfelder LLC por refugiados",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:53.045Z",
    updatedAt: "2026-01-11T21:57:12.902Z",
    __v: 1
  },
  {
    _id: "5894481c-f223-4378-beee-f5e093cda947",
    fullName: "Landen Stehr Tremblay",
    username: "hobartraynor125",
    phone: "+44861125897",
    location: {
      city: "Liverpool",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.107Z",
    updatedAt: "2026-01-11T21:56:53.107Z",
    __v: 0
  },
  {
    _id: "677a8401-ae21-4e88-8901-29217e6b3cca",
    fullName: "Eleanore Steuber Reilly",
    username: "jarrellwill126",
    phone: "+34723870923",
    location: {
      city: "Zaragoza",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.169Z",
    updatedAt: "2026-01-11T21:56:53.169Z",
    __v: 0
  },
  {
    _id: "bc788050-96b9-4e3a-8d30-e439a2ae3b73",
    fullName: "Jasmin Rutherford Steuber",
    username: "camilawatsica127",
    phone: "+55678159452",
    location: {
      city: "Brasília",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.229Z",
    updatedAt: "2026-01-11T21:56:53.229Z",
    __v: 0
  },
  {
    _id: "5a91a6ab-77b3-49a2-ae80-ae83047594ed",
    fullName: "Octavia Ortiz Daniel",
    username: "murlsenger128",
    phone: "+34357887153",
    location: {
      city: "Valencia",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.286Z",
    updatedAt: "2026-01-11T21:56:53.286Z",
    __v: 0
  },
  {
    _id: "f965c576-0546-4103-9c5d-34fd5959fcfb",
    fullName: "Stephany Walker Powlowski",
    username: "antoniayost129",
    phone: "+51362776759",
    location: {
      city: "Chiclayo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.347Z",
    updatedAt: "2026-01-11T21:56:53.347Z",
    __v: 0
  },
  {
    _id: "e951db08-6601-4e07-b02a-5eaf6068a220",
    fullName: "Loma Schiller Sawayn",
    username: "erniecummings130",
    phone: "+58777049699",
    location: {
      city: "Maracaibo",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.452Z",
    updatedAt: "2026-01-11T21:56:53.452Z",
    __v: 0
  },
  {
    _id: "472ea461-19a6-4a9f-aaf1-757c07c6bd6e",
    fullName: "Cierra Price Gutmann",
    username: "nolanhuels131",
    phone: "+51594907238",
    location: {
      city: "Arequipa",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.485Z",
    updatedAt: "2026-01-11T21:56:53.485Z",
    __v: 0
  },
  {
    _id: "50b424d7-2608-4e08-a5c2-345ece3342ff",
    fullName: "Malinda Hahn Metz",
    username: "lilianeschade132",
    phone: "+54484559467",
    location: {
      city: "Rosario",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.545Z",
    updatedAt: "2026-01-11T21:56:53.545Z",
    __v: 0
  },
  {
    _id: "67b6a320-698c-49f4-b65d-3ac34e10c19e",
    fullName: "Dell Dach Altenwerth",
    username: "angelokilback133",
    phone: "+39032790386",
    location: {
      city: "Roma",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.603Z",
    updatedAt: "2026-01-11T21:56:53.603Z",
    __v: 0
  },
  {
    _id: "8580ebe3-b178-4500-80cf-25f0c732c15b",
    fullName: "Dorothy Pagac Friesen",
    username: "eleazarwelch134",
    phone: "+55025974495",
    location: {
      city: "Salvador",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.662Z",
    updatedAt: "2026-01-11T21:56:53.662Z",
    __v: 0
  },
  {
    _id: "cad22482-7fb6-4080-8b28-b6b8d1a03e1e",
    fullName: "Alyce Daugherty Ledner",
    username: "omaribogisich135",
    phone: "+55189658158",
    location: {
      city: "Rio de Janeiro",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.721Z",
    updatedAt: "2026-01-11T21:56:53.721Z",
    __v: 0
  },
  {
    _id: "7a8ef4d5-c821-4fba-9a98-839171d78daf",
    fullName: "Yasmeen Jenkins Hammes",
    username: "jedediahtorp136",
    phone: "+54491722772",
    location: {
      city: "Mendoza",
      countryCode: "AR"
    },
    communityMemberships: [
      {
        communityId: "270bcccb-8cff-459d-a243-e33c878cfb6d",
        communityName: "Fundación Dietrich - Waters por desarrollo sosteni",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:53.782Z",
    updatedAt: "2026-01-11T21:57:11.595Z",
    __v: 1
  },
  {
    _id: "f730c479-d758-42d9-b925-49fd9335e998",
    fullName: "Antone Marquardt Herzog",
    username: "donnellschimm137",
    phone: "+54947382392",
    location: {
      city: "Buenos Aires",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.841Z",
    updatedAt: "2026-01-11T21:56:53.841Z",
    __v: 0
  },
  {
    _id: "c960fe43-4c79-48e4-84bf-a2afe273071e",
    fullName: "Pearline Moore Turner",
    username: "luzadams138",
    phone: "+56991602962",
    location: {
      city: "Santiago",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.907Z",
    updatedAt: "2026-01-11T21:56:53.907Z",
    __v: 0
  },
  {
    _id: "44f7e64c-c8a2-4c85-9fdc-d50c6a505fce",
    fullName: "Stone Considine Hermann",
    username: "holliehessels139",
    phone: "+34584728137",
    location: {
      city: "Madrid",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:53.971Z",
    updatedAt: "2026-01-11T21:56:53.971Z",
    __v: 0
  },
  {
    _id: "522b8c69-f36b-478b-8a27-8ca0f25f9a35",
    fullName: "Dayton Gibson Medhurst-Fay",
    username: "lindadare140",
    phone: "+39487479513",
    location: {
      city: "Roma",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.136Z",
    updatedAt: "2026-01-11T21:56:54.136Z",
    __v: 0
  },
  {
    _id: "9a01410a-7ddc-4f1f-8a49-327afeb0e30b",
    fullName: "Ernesto Hegmann-Hauck Oberbrunner",
    username: "kaypowlowski141",
    phone: "+58474058107",
    location: {
      city: "Caracas",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.195Z",
    updatedAt: "2026-01-11T21:56:54.195Z",
    __v: 0
  },
  {
    _id: "63e8aa52-38ba-4cb7-8a76-3439af3dd13d",
    fullName: "Gail Howe Tremblay",
    username: "davonbogisich142",
    phone: "+39924389344",
    location: {
      city: "Roma",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.254Z",
    updatedAt: "2026-01-11T21:56:54.254Z",
    __v: 0
  },
  {
    _id: "79f0a864-c06b-4924-99f5-c96928f71cc6",
    fullName: "Mina Rempel Witting",
    username: "hendersonlars143",
    phone: "+54961392614",
    location: {
      city: "La Plata",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.314Z",
    updatedAt: "2026-01-11T21:56:54.314Z",
    __v: 0
  },
  {
    _id: "b8558a01-0bbb-4f3c-b7fb-2e8ac8dd1fd4",
    fullName: "Catherine Kemmer Altenwerth",
    username: "alfordstanton144",
    phone: "+54739037401",
    location: {
      city: "Mar del Plata",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.373Z",
    updatedAt: "2026-01-11T21:56:54.373Z",
    __v: 0
  },
  {
    _id: "9efd14f1-6e6f-4df1-aaa1-c01931576d40",
    fullName: "Alvera Wunsch Quigley",
    username: "bethelbaumbac145",
    phone: "+34222460585",
    location: {
      city: "Bilbao",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.440Z",
    updatedAt: "2026-01-11T21:56:54.440Z",
    __v: 0
  },
  {
    _id: "dc764393-163e-4755-b5e4-0642c0d97e7e",
    fullName: "Earline Donnelly Kuhn",
    username: "arliegrant146",
    phone: "+44270389198",
    location: {
      city: "Edinburgh",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.495Z",
    updatedAt: "2026-01-11T21:56:54.495Z",
    __v: 0
  },
  {
    _id: "a78faed7-86f2-4057-ae7f-5f2f39c0bc7d",
    fullName: "Shea Mitchell Kuvalis",
    username: "nolanhilll147",
    phone: "+54541971239",
    location: {
      city: "Buenos Aires",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.555Z",
    updatedAt: "2026-01-11T21:56:54.555Z",
    __v: 0
  },
  {
    _id: "ea7a4ea0-48f9-403e-8bf0-62b8fd2283aa",
    fullName: "Charlene Morissette Waelchi",
    username: "erabraun148",
    phone: "+56733297118",
    location: {
      city: "La Serena",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.613Z",
    updatedAt: "2026-01-11T21:56:54.613Z",
    __v: 0
  },
  {
    _id: "8cc4ab89-c14b-4d31-ad20-187e76d2e8da",
    fullName: "Janice Stark Halvorson",
    username: "wavawisozk149",
    phone: "+56455047381",
    location: {
      city: "Concepción",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.678Z",
    updatedAt: "2026-01-11T21:56:54.678Z",
    __v: 0
  },
  {
    _id: "96c41d90-8cd5-4b01-95e7-e691eff4ea01",
    fullName: "Hester Lowe Haley",
    username: "anabelleondri150",
    phone: "+56429113602",
    location: {
      city: "La Serena",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.738Z",
    updatedAt: "2026-01-11T21:56:54.738Z",
    __v: 0
  },
  {
    _id: "0b7cd027-66cd-4493-8773-89f6f4753502",
    fullName: "Branson Kilback Cremin",
    username: "altaschusters151",
    phone: "+33161820839",
    location: {
      city: "Nice",
      countryCode: "FR"
    },
    communityMemberships: [
      {
        communityId: "bb21e942-ebfd-45e7-9ca5-e3da915cb7c9",
        communityName: "Fundación Labadie Inc por infancia",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:54.796Z",
    updatedAt: "2026-01-11T21:57:11.927Z",
    __v: 1
  },
  {
    _id: "0d796a28-539a-4745-ac33-2f1139e519af",
    fullName: "Genevieve Wisoky Heidenreich",
    username: "henristreich152",
    phone: "+44989013397",
    location: {
      city: "Edinburgh",
      countryCode: "GB"
    },
    communityMemberships: [
      {
        communityId: "a2af7dd0-850b-41f7-8a52-9fcb0278a793",
        communityName: "Grupo Hilpert LLC por pobreza",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:54.855Z",
    updatedAt: "2026-01-11T21:57:11.530Z",
    __v: 1
  },
  {
    _id: "211dd07e-afe7-4a62-be0a-5d6d67fac290",
    fullName: "Timmy Crona-Lockman Metz",
    username: "adrienkeebler153",
    phone: "+57712046439",
    location: {
      city: "Cartagena",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.915Z",
    updatedAt: "2026-01-11T21:56:54.915Z",
    __v: 0
  },
  {
    _id: "9167a6fd-193f-4d65-9743-1460149c8ba8",
    fullName: "Claud Corkery Kuhn",
    username: "lizakshlerin154",
    phone: "+49277591532",
    location: {
      city: "Hamburg",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:54.976Z",
    updatedAt: "2026-01-11T21:56:54.976Z",
    __v: 0
  },
  {
    _id: "ac60841f-6024-4f7a-9807-ac8af295aed4",
    fullName: "Corbin Lindgren Johns",
    username: "rosaliajohns155",
    phone: "+57245430240",
    location: {
      city: "Cartagena",
      countryCode: "CO"
    },
    communityMemberships: [
      {
        communityId: "9b7dfa76-8966-4e21-8bd3-26415933f7ee",
        communityName: "Asociación Deckow, Monahan and Hand por igualdad d",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:55.035Z",
    updatedAt: "2026-01-11T21:57:12.716Z",
    __v: 1
  },
  {
    _id: "c18cc491-3c29-491a-8c49-85cb7ff79a90",
    fullName: "Wilton Cruickshank-Weimann Wiegand",
    username: "peytondavis156",
    phone: "+54973497701",
    location: {
      city: "Rosario",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.096Z",
    updatedAt: "2026-01-11T21:56:55.096Z",
    __v: 0
  },
  {
    _id: "ebdd9b54-28b4-42ac-8787-d3907f3daad2",
    fullName: "Milan Carter Leuschke",
    username: "ryanabernathy157",
    phone: "+49099939254",
    location: {
      city: "Cologne",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.154Z",
    updatedAt: "2026-01-11T21:56:55.154Z",
    __v: 0
  },
  {
    _id: "f13ae7c6-70c7-4068-a3be-b6a3bbfa2a6d",
    fullName: "Ophelia Corwin Smitham",
    username: "millierosenba158",
    phone: "+44684793558",
    location: {
      city: "Manchester",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.213Z",
    updatedAt: "2026-01-11T21:56:55.213Z",
    __v: 0
  },
  {
    _id: "50aae9e9-0d54-4b03-8d37-77744d43d60c",
    fullName: "Wilton Bayer Shields",
    username: "jamesonwatsic159",
    phone: "+52835863870",
    location: {
      city: "Ciudad de México",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.276Z",
    updatedAt: "2026-01-11T21:56:55.276Z",
    __v: 0
  },
  {
    _id: "4bc76ce3-cead-4bfe-8c2f-7c1997c227cf",
    fullName: "Isabell Mayert Johnson",
    username: "carlieritchie160",
    phone: "+56666048438",
    location: {
      city: "Santiago",
      countryCode: "CL"
    },
    communityMemberships: [
      {
        communityId: "28429ef1-d52f-4e4f-9df3-efa33e8fc351",
        communityName: "Red Abernathy - Halvorson por vivienda",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:55.439Z",
    updatedAt: "2026-01-11T21:57:13.177Z",
    __v: 1
  },
  {
    _id: "bf289095-ed05-40ff-a1d3-4edd5589c6a4",
    fullName: "Nella McCullough Moore",
    username: "gretchenbarro161",
    phone: "+44899033995",
    location: {
      city: "Glasgow",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.500Z",
    updatedAt: "2026-01-11T21:56:55.500Z",
    __v: 0
  },
  {
    _id: "d2a8d8ea-5a71-4d23-916d-6b5576cd490e",
    fullName: "Kaela Huels Becker",
    username: "torreyleuschk162",
    phone: "+56094665141",
    location: {
      city: "Santiago",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.561Z",
    updatedAt: "2026-01-11T21:56:55.561Z",
    __v: 0
  },
  {
    _id: "cbbbfe20-8ab9-4a93-be5d-81fdca2c5664",
    fullName: "Lulu Bartell Reilly",
    username: "dorcasprosacc163",
    phone: "+33586476104",
    location: {
      city: "Marseille",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.622Z",
    updatedAt: "2026-01-11T21:56:55.622Z",
    __v: 0
  },
  {
    _id: "15dea375-7501-46f2-bc54-16e495e6159e",
    fullName: "Gina Donnelly Bode",
    username: "darenvonruede164",
    phone: "+51265220977",
    location: {
      city: "Trujillo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.681Z",
    updatedAt: "2026-01-11T21:56:55.681Z",
    __v: 0
  },
  {
    _id: "5b6ca4b3-86e7-4acd-a805-130205a4d860",
    fullName: "Devon Larson Denesik",
    username: "chasitysanfor165",
    phone: "+44641390433",
    location: {
      city: "Glasgow",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.742Z",
    updatedAt: "2026-01-11T21:56:55.742Z",
    __v: 0
  },
  {
    _id: "768e682e-2954-4313-9339-c58bb4d0ea85",
    fullName: "Myrtie DuBuque Fadel-Douglas",
    username: "gavinkuhn166",
    phone: "+39635321243",
    location: {
      city: "Bologna",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.800Z",
    updatedAt: "2026-01-11T21:56:55.800Z",
    __v: 0
  },
  {
    _id: "48764024-0cc0-4dac-8b8a-f5acfb0ae443",
    fullName: "Furman Mayert Weissnat",
    username: "maeswaniawski167",
    phone: "+57794695297",
    location: {
      city: "Bogotá",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.861Z",
    updatedAt: "2026-01-11T21:56:55.861Z",
    __v: 0
  },
  {
    _id: "dc9bc680-28a1-430e-a5f3-fd36a5b865fe",
    fullName: "Sylvester Thompson Donnelly",
    username: "tristianfries168",
    phone: "+49323563911",
    location: {
      city: "Berlin",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.921Z",
    updatedAt: "2026-01-11T21:56:55.921Z",
    __v: 0
  },
  {
    _id: "fe7e3ca6-abdf-4655-b26d-58b3ac64bc52",
    fullName: "Eliezer Koss Ondricka",
    username: "ellenbrowndic169",
    phone: "+51842957948",
    location: {
      city: "Trujillo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:55.981Z",
    updatedAt: "2026-01-11T21:56:55.981Z",
    __v: 0
  },
  {
    _id: "e682ad2e-90de-48e4-a5d5-dc76a998647c",
    fullName: "Milo Nicolas Kerluke",
    username: "amarasporer170",
    phone: "+58385121606",
    location: {
      city: "Caracas",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.040Z",
    updatedAt: "2026-01-11T21:56:56.040Z",
    __v: 0
  },
  {
    _id: "6771ba89-9677-4d45-8682-67256d0d2fd9",
    fullName: "Luther Baumbach Runolfsdottir",
    username: "alexandrealyn171",
    phone: "+56778169178",
    location: {
      city: "Antofagasta",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.100Z",
    updatedAt: "2026-01-11T21:56:56.100Z",
    __v: 0
  },
  {
    _id: "fe97582d-ef06-4edc-91da-644fdcd81a97",
    fullName: "Loraine Grady Hodkiewicz",
    username: "minahodkiewic172",
    phone: "+52702313991",
    location: {
      city: "Ciudad de México",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.162Z",
    updatedAt: "2026-01-11T21:56:56.162Z",
    __v: 0
  },
  {
    _id: "97bbe5ec-401b-4ced-b754-004da396e806",
    fullName: "Elijah Weissnat Dicki",
    username: "emmetbradtke173",
    phone: "+44911959476",
    location: {
      city: "Edinburgh",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.223Z",
    updatedAt: "2026-01-11T21:56:56.223Z",
    __v: 0
  },
  {
    _id: "0108bf82-0f56-4691-bde4-a90312679aef",
    fullName: "Braulio Kutch Sauer",
    username: "jadynhills174",
    phone: "+58411954716",
    location: {
      city: "Caracas",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.282Z",
    updatedAt: "2026-01-11T21:56:56.282Z",
    __v: 0
  },
  {
    _id: "d497755d-830e-4baf-9d6d-02ee3eeb778a",
    fullName: "Nathaniel Schuster Volkman",
    username: "caitlyntorp175",
    phone: "+56267775697",
    location: {
      city: "Santiago",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.343Z",
    updatedAt: "2026-01-11T21:56:56.343Z",
    __v: 0
  },
  {
    _id: "80177d80-5342-40b7-a81a-583608b6462e",
    fullName: "Pablo Dare Bednar",
    username: "rosamondaufde176",
    phone: "+39720910413",
    location: {
      city: "Napoli",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.403Z",
    updatedAt: "2026-01-11T21:56:56.403Z",
    __v: 0
  },
  {
    _id: "ce36d973-dc22-421e-b42a-c900324bb333",
    fullName: "Antwan Schaden Rowe",
    username: "cicerobernier177",
    phone: "+54594589055",
    location: {
      city: "Buenos Aires",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.465Z",
    updatedAt: "2026-01-11T21:56:56.465Z",
    __v: 0
  },
  {
    _id: "b809843e-21c7-4399-adb2-bbfa7bb2fd89",
    fullName: "Karl Toy Turner",
    username: "reubenorn178",
    phone: "+58806543996",
    location: {
      city: "Maracay",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.522Z",
    updatedAt: "2026-01-11T21:56:56.522Z",
    __v: 0
  },
  {
    _id: "a224d499-2f62-451b-8cdd-2c521e9e012c",
    fullName: "Retha Mitchell Strosin",
    username: "alizeankundin179",
    phone: "+58661849492",
    location: {
      city: "Caracas",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.582Z",
    updatedAt: "2026-01-11T21:56:56.582Z",
    __v: 0
  },
  {
    _id: "e6e8e2ec-8084-4848-8b1d-da34335a0aa7",
    fullName: "Madilyn Weissnat Hand",
    username: "clementinecor180",
    phone: "+58761765285",
    location: {
      city: "Maracaibo",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.746Z",
    updatedAt: "2026-01-11T21:56:56.746Z",
    __v: 0
  },
  {
    _id: "762c64d9-a776-44b4-a39f-668c8166e994",
    fullName: "Fletcher Bayer Veum",
    username: "oranbosco181",
    phone: "+55592049009",
    location: {
      city: "São Paulo",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.808Z",
    updatedAt: "2026-01-11T21:56:56.808Z",
    __v: 0
  },
  {
    _id: "9d34983d-bef4-4326-a422-393ab3aa917d",
    fullName: "Mandy Hudson Bosco",
    username: "charlenelangw182",
    phone: "+52214806369",
    location: {
      city: "León",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.869Z",
    updatedAt: "2026-01-11T21:56:56.869Z",
    __v: 0
  },
  {
    _id: "f4d0bbe4-65a8-45fa-9908-4eadb42c72a5",
    fullName: "Nannie Cronin Franecki",
    username: "berthowe183",
    phone: "+49616407786",
    location: {
      city: "Berlin",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.929Z",
    updatedAt: "2026-01-11T21:56:56.929Z",
    __v: 0
  },
  {
    _id: "13fb2014-3feb-4d68-b196-a0446e33e407",
    fullName: "Wellington Dickens Zemlak",
    username: "geovanybarton184",
    phone: "+39040137889",
    location: {
      city: "Milano",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:56.988Z",
    updatedAt: "2026-01-11T21:56:56.988Z",
    __v: 0
  },
  {
    _id: "1eda417f-2b2f-4bef-98d3-f50dc3ebccaa",
    fullName: "Milan Douglas-Hudson Keeling",
    username: "zoralittle185",
    phone: "+49883839789",
    location: {
      city: "Hamburg",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.047Z",
    updatedAt: "2026-01-11T21:56:57.047Z",
    __v: 0
  },
  {
    _id: "052a2144-487f-4468-bd98-5a4581238303",
    fullName: "Ellsworth Schroeder Hartmann",
    username: "jermainhilll186",
    phone: "+44136436315",
    location: {
      city: "Liverpool",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.107Z",
    updatedAt: "2026-01-11T21:56:57.107Z",
    __v: 0
  },
  {
    _id: "12c4869e-f520-4bbe-8de2-47fa169b0b48",
    fullName: "Salma Vandervort Feest",
    username: "jeromeoberbru187",
    phone: "+34561518946",
    location: {
      city: "Murcia",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.168Z",
    updatedAt: "2026-01-11T21:56:57.168Z",
    __v: 0
  },
  {
    _id: "a49af038-437d-4036-bbbb-1a56683c93e5",
    fullName: "Nova Conroy Ebert",
    username: "olgaziemann188",
    phone: "+57274671324",
    location: {
      city: "Bogotá",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.228Z",
    updatedAt: "2026-01-11T21:56:57.228Z",
    __v: 0
  },
  {
    _id: "d7d59067-401b-47f4-9300-00de53e68f5f",
    fullName: "Aylin Morissette Mills",
    username: "reneeshanahan189",
    phone: "+39074076223",
    location: {
      city: "Torino",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.287Z",
    updatedAt: "2026-01-11T21:56:57.287Z",
    __v: 0
  },
  {
    _id: "b190157e-c0ff-4e9d-858e-d9d96bf758a4",
    fullName: "Eliane Hilll Greenfelder",
    username: "mariopadberg190",
    phone: "+39212634017",
    location: {
      city: "Torino",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.349Z",
    updatedAt: "2026-01-11T21:56:57.349Z",
    __v: 0
  },
  {
    _id: "03155a0c-21a4-441c-8030-482a570867dc",
    fullName: "Soledad Stokes Glover",
    username: "alishadietric191",
    phone: "+49052213805",
    location: {
      city: "Frankfurt",
      countryCode: "DE"
    },
    communityMemberships: [
      {
        communityId: "d607c398-a6ec-4474-a49d-de4585aeeaff",
        communityName: "Colectivo Turcotte LLC por salud",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:56:57.415Z",
    updatedAt: "2026-01-11T21:57:13.038Z",
    __v: 1
  },
  {
    _id: "b183a7ab-33ca-40ea-89dc-213d092fdb93",
    fullName: "Susie Lindgren Fay",
    username: "codyhessel192",
    phone: "+57537936280",
    location: {
      city: "Medellín",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.475Z",
    updatedAt: "2026-01-11T21:56:57.475Z",
    __v: 0
  },
  {
    _id: "69e77156-e497-4a89-ae5b-4ee5eced165a",
    fullName: "Sid Streich Friesen",
    username: "antonewillms193",
    phone: "+52989005820",
    location: {
      city: "Ciudad de México",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.534Z",
    updatedAt: "2026-01-11T21:56:57.534Z",
    __v: 0
  },
  {
    _id: "85a04968-609b-4b7d-adc7-ff36c439f315",
    fullName: "Rhiannon Berge Mueller",
    username: "averyhuel194",
    phone: "+54696359323",
    location: {
      city: "La Plata",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.594Z",
    updatedAt: "2026-01-11T21:56:57.594Z",
    __v: 0
  },
  {
    _id: "c5337402-0355-4067-8441-d0be99c93867",
    fullName: "Richard Block Zieme",
    username: "elinoreaberna195",
    phone: "+54365871416",
    location: {
      city: "Buenos Aires",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.652Z",
    updatedAt: "2026-01-11T21:56:57.652Z",
    __v: 0
  },
  {
    _id: "86752758-3bdc-41f0-8cbc-decb0a9e9ffc",
    fullName: "Elenora Hagenes Wiegand",
    username: "gunnarblick196",
    phone: "+57099281790",
    location: {
      city: "Cali",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.713Z",
    updatedAt: "2026-01-11T21:56:57.713Z",
    __v: 0
  },
  {
    _id: "d2d3d040-a971-477d-9875-edeb258804e8",
    fullName: "Sierra Robel Homenick",
    username: "lessieschmidt197",
    phone: "+44011109691",
    location: {
      city: "Glasgow",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.776Z",
    updatedAt: "2026-01-11T21:56:57.776Z",
    __v: 0
  },
  {
    _id: "480ddbf8-99f0-4b3d-9bbe-51aab746d731",
    fullName: "Keegan Romaguera Harvey",
    username: "petraschinner198",
    phone: "+49416770516",
    location: {
      city: "Berlin",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.835Z",
    updatedAt: "2026-01-11T21:56:57.835Z",
    __v: 0
  },
  {
    _id: "290de7c0-6759-4431-8401-7513f20d823b",
    fullName: "Hank Olson Ebert",
    username: "elisabethorei199",
    phone: "+33469341772",
    location: {
      city: "Paris",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:57.895Z",
    updatedAt: "2026-01-11T21:56:57.895Z",
    __v: 0
  },
  {
    _id: "57682957-7857-42a2-b3d0-1e71eb295a80",
    fullName: "Gladys Ward Bartell",
    username: "albertjacobso200",
    phone: "+56167451641",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.057Z",
    updatedAt: "2026-01-11T21:56:58.057Z",
    __v: 0
  },
  {
    _id: "b5fc6fda-03b7-4ac1-9e82-8dd0aac96b6c",
    fullName: "Everette Franey-Koepp Kris",
    username: "milokoss201",
    phone: "+33295114858",
    location: {
      city: "Toulouse",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.116Z",
    updatedAt: "2026-01-11T21:56:58.116Z",
    __v: 0
  },
  {
    _id: "ae07eb3c-3ad9-4648-b9e0-43447d9b7c51",
    fullName: "Hulda Kling Stark",
    username: "ignatiuspouro202",
    phone: "+56633087211",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.178Z",
    updatedAt: "2026-01-11T21:56:58.178Z",
    __v: 0
  },
  {
    _id: "b70034e6-a127-4a80-a909-f93ece82683a",
    fullName: "Macey Wisoky MacGyver",
    username: "ocierohan203",
    phone: "+49017997401",
    location: {
      city: "Dresden",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.237Z",
    updatedAt: "2026-01-11T21:56:58.237Z",
    __v: 0
  },
  {
    _id: "df0102d6-f8a6-4671-87e1-de6d0487bd7d",
    fullName: "Justina Turcotte Toy",
    username: "fritzschowalt204",
    phone: "+33647504608",
    location: {
      city: "Bordeaux",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.296Z",
    updatedAt: "2026-01-11T21:56:58.296Z",
    __v: 0
  },
  {
    _id: "73b02959-4695-4a8f-b63b-2e9085f0571e",
    fullName: "Arden Runolfsson Pacocha",
    username: "adammurray205",
    phone: "+57397054500",
    location: {
      city: "Barranquilla",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.357Z",
    updatedAt: "2026-01-11T21:56:58.357Z",
    __v: 0
  },
  {
    _id: "0c738290-b2cc-445b-ad7e-5555db35c94d",
    fullName: "Jennyfer Smitham Witting",
    username: "rahsaansteube206",
    phone: "+52366007748",
    location: {
      city: "Ciudad de México",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.418Z",
    updatedAt: "2026-01-11T21:56:58.418Z",
    __v: 0
  },
  {
    _id: "0579248d-99a1-4430-b856-2e24f1cee5a4",
    fullName: "Augustine Corwin Halvorson",
    username: "alekwunsch207",
    phone: "+49249802871",
    location: {
      city: "Berlin",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.478Z",
    updatedAt: "2026-01-11T21:56:58.478Z",
    __v: 0
  },
  {
    _id: "a50d6a4e-7c01-47e8-9ccc-4664641f9158",
    fullName: "Joshua Jerde Crist",
    username: "alfredaruecke208",
    phone: "+55581408237",
    location: {
      city: "Fortaleza",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.537Z",
    updatedAt: "2026-01-11T21:56:58.537Z",
    __v: 0
  },
  {
    _id: "4cc0f563-d7c6-42d2-8c16-c7d358a54249",
    fullName: "Lorenz Koelpin Langosh",
    username: "shawnharber209",
    phone: "+58375151182",
    location: {
      city: "Maracay",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.597Z",
    updatedAt: "2026-01-11T21:56:58.597Z",
    __v: 0
  },
  {
    _id: "d29a0f32-ef9c-483f-91d8-9458a81823fd",
    fullName: "Kayley Kunde Schmitt",
    username: "yesseniabecke210",
    phone: "+34644109814",
    location: {
      city: "Murcia",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.657Z",
    updatedAt: "2026-01-11T21:56:58.657Z",
    __v: 0
  },
  {
    _id: "c024edb4-9290-40d6-8f44-dfafcd77d11a",
    fullName: "Enrique Bayer Connelly",
    username: "madelinereing211",
    phone: "+56615337480",
    location: {
      city: "La Serena",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.719Z",
    updatedAt: "2026-01-11T21:56:58.719Z",
    __v: 0
  },
  {
    _id: "019c6342-f39e-4f61-8c0c-8e2fbc226af5",
    fullName: "Ignatius Ondricka Collins",
    username: "whitneykrajci212",
    phone: "+58715044792",
    location: {
      city: "Barquisimeto",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.778Z",
    updatedAt: "2026-01-11T21:56:58.778Z",
    __v: 0
  },
  {
    _id: "853b4a3f-c81e-493e-bec1-9744fa1e2f11",
    fullName: "Onie Berge Thiel",
    username: "elizamacejkov213",
    phone: "+54520404648",
    location: {
      city: "Córdoba",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.837Z",
    updatedAt: "2026-01-11T21:56:58.837Z",
    __v: 0
  },
  {
    _id: "9e909a14-4a26-441a-9711-b4dcf0b604a9",
    fullName: "Santina Lockman Little",
    username: "rogersfahey214",
    phone: "+54277445419",
    location: {
      city: "Córdoba",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.901Z",
    updatedAt: "2026-01-11T21:56:58.901Z",
    __v: 0
  },
  {
    _id: "9a208370-a7a4-4340-b47d-fd1ad6c5bc67",
    fullName: "Randy Treutel Ward",
    username: "brettrogahn215",
    phone: "+33836500401",
    location: {
      city: "Lyon",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:58.959Z",
    updatedAt: "2026-01-11T21:56:58.959Z",
    __v: 0
  },
  {
    _id: "705d42de-44f1-4de2-8a74-0f82fdeb1377",
    fullName: "Mary Wintheiser MacGyver",
    username: "lonniegleason216",
    phone: "+54136063164",
    location: {
      city: "La Plata",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.019Z",
    updatedAt: "2026-01-11T21:56:59.019Z",
    __v: 0
  },
  {
    _id: "ee1cf6e1-1333-4175-aef8-c6aa0cb2e3d8",
    fullName: "Dena Walker Blanda",
    username: "bretschmitt217",
    phone: "+39576093218",
    location: {
      city: "Roma",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.082Z",
    updatedAt: "2026-01-11T21:56:59.082Z",
    __v: 0
  },
  {
    _id: "581bf7d5-0606-4796-bcd8-8a255f107e7e",
    fullName: "Nona Ziemann Metz",
    username: "candidoschmel218",
    phone: "+34024572582",
    location: {
      city: "Sevilla",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.142Z",
    updatedAt: "2026-01-11T21:56:59.142Z",
    __v: 0
  },
  {
    _id: "4b8649a9-f4cb-48d2-820b-99780605108a",
    fullName: "Isabell Paucek Bergstrom",
    username: "dayanacarterj219",
    phone: "+55230709760",
    location: {
      city: "Salvador",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.203Z",
    updatedAt: "2026-01-11T21:56:59.203Z",
    __v: 0
  },
  {
    _id: "b765791d-8f72-46b8-a102-5413e2887aa7",
    fullName: "Ivah Balistreri Doyle",
    username: "jeannenikolau220",
    phone: "+49131699878",
    location: {
      city: "Hamburg",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.366Z",
    updatedAt: "2026-01-11T21:56:59.366Z",
    __v: 0
  },
  {
    _id: "f08efe02-a28b-461c-b723-d56dd366b628",
    fullName: "Shana Borer Denesik",
    username: "michalekuhlma221",
    phone: "+56197933499",
    location: {
      city: "Santiago",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.427Z",
    updatedAt: "2026-01-11T21:56:59.427Z",
    __v: 0
  },
  {
    _id: "b58dc95e-a364-432c-9148-868cecf4c3e3",
    fullName: "Marquis Paucek Nitzsche",
    username: "clintonzieme222",
    phone: "+51370196535",
    location: {
      city: "Trujillo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.486Z",
    updatedAt: "2026-01-11T21:56:59.486Z",
    __v: 0
  },
  {
    _id: "5bfa7249-e8ca-4dda-ae1e-ebf2f1c82927",
    fullName: "Tatyana Bashirian Pfeffer",
    username: "jamarcusledne223",
    phone: "+57902887692",
    location: {
      city: "Cali",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.546Z",
    updatedAt: "2026-01-11T21:56:59.546Z",
    __v: 0
  },
  {
    _id: "ea222257-594a-454a-8604-91066bd8340e",
    fullName: "Winnifred Veum Mills",
    username: "francescobart224",
    phone: "+54719065726",
    location: {
      city: "Tucumán",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.606Z",
    updatedAt: "2026-01-11T21:56:59.606Z",
    __v: 0
  },
  {
    _id: "552f7463-6c8b-40de-9978-0f0b0d121644",
    fullName: "Hulda Hodkiewicz-Grady Schimmel-Macejkovic",
    username: "cheyanneerdma225",
    phone: "+58961362455",
    location: {
      city: "Barquisimeto",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.666Z",
    updatedAt: "2026-01-11T21:56:59.666Z",
    __v: 0
  },
  {
    _id: "52033540-0781-47f7-b6f4-74910b55490d",
    fullName: "Colton Kuvalis Effertz",
    username: "myrlprice226",
    phone: "+34933228829",
    location: {
      city: "Valencia",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.725Z",
    updatedAt: "2026-01-11T21:56:59.725Z",
    __v: 0
  },
  {
    _id: "d7b8e532-0a5a-4557-92e2-50b2ac804c64",
    fullName: "Cornelius Zboncak Von",
    username: "morganhudson227",
    phone: "+52193361753",
    location: {
      city: "Ciudad de México",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.793Z",
    updatedAt: "2026-01-11T21:56:59.793Z",
    __v: 0
  },
  {
    _id: "bbe3b400-639a-4843-9ce2-55cd5b18aef9",
    fullName: "Alison Spencer Koss",
    username: "andreskris228",
    phone: "+51905891817",
    location: {
      city: "Trujillo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.844Z",
    updatedAt: "2026-01-11T21:56:59.844Z",
    __v: 0
  },
  {
    _id: "7c4aae76-32ea-4fc0-bd1a-7f678f1fc664",
    fullName: "Myron Kub Marquardt",
    username: "willyhermann229",
    phone: "+52578900893",
    location: {
      city: "Cancún",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.904Z",
    updatedAt: "2026-01-11T21:56:59.904Z",
    __v: 0
  },
  {
    _id: "b4efb7ed-864c-44a7-87df-aaad888e2114",
    fullName: "Vincenzo Schowalter Grimes",
    username: "herbertgoyett230",
    phone: "+44008377805",
    location: {
      city: "Liverpool",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:56:59.965Z",
    updatedAt: "2026-01-11T21:56:59.965Z",
    __v: 0
  },
  {
    _id: "2cc6fc92-d5fe-48ec-84ac-37acbfc12680",
    fullName: "Baby Kris Weber-Hansen",
    username: "bellkilbackme231",
    phone: "+52183029779",
    location: {
      city: "Cancún",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.025Z",
    updatedAt: "2026-01-11T21:57:00.025Z",
    __v: 0
  },
  {
    _id: "d77939e2-ce31-4d09-a906-55dd522b716a",
    fullName: "Oswaldo Harris Gottlieb",
    username: "titusjast232",
    phone: "+54014059795",
    location: {
      city: "Rosario",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.086Z",
    updatedAt: "2026-01-11T21:57:00.086Z",
    __v: 0
  },
  {
    _id: "475af8da-b71f-4c34-8844-fbd475d79078",
    fullName: "Megane Jerde Monahan",
    username: "harmonmurazik233",
    phone: "+57406999897",
    location: {
      city: "Bogotá",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.145Z",
    updatedAt: "2026-01-11T21:57:00.145Z",
    __v: 0
  },
  {
    _id: "c11f94f3-3856-4c76-82d7-62eb3a381af5",
    fullName: "Devin Fritsch Ziemann",
    username: "benedictdecko234",
    phone: "+55326563172",
    location: {
      city: "Brasília",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.207Z",
    updatedAt: "2026-01-11T21:57:00.207Z",
    __v: 0
  },
  {
    _id: "71471d2e-db28-4cce-ae78-28bb36542fc5",
    fullName: "Ferne Frami McGlynn",
    username: "nicoletteocon235",
    phone: "+34756187539",
    location: {
      city: "Zaragoza",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.269Z",
    updatedAt: "2026-01-11T21:57:00.269Z",
    __v: 0
  },
  {
    _id: "145d756f-bcc4-4c50-bc35-8928a873dbf7",
    fullName: "Merlin Mayert Douglas",
    username: "orvillereiche236",
    phone: "+55837703354",
    location: {
      city: "Salvador",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.328Z",
    updatedAt: "2026-01-11T21:57:00.328Z",
    __v: 0
  },
  {
    _id: "a02ccfa7-366d-46ea-bf03-a3675e55e781",
    fullName: "Betsy Christiansen Lebsack",
    username: "brandonitzsch237",
    phone: "+52466054259",
    location: {
      city: "Cancún",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.387Z",
    updatedAt: "2026-01-11T21:57:00.387Z",
    __v: 0
  },
  {
    _id: "4610604b-c3f0-4136-b327-fc468495e379",
    fullName: "Deangelo Klocko Quigley",
    username: "clevehegmannl238",
    phone: "+51421241920",
    location: {
      city: "Chiclayo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.448Z",
    updatedAt: "2026-01-11T21:57:00.448Z",
    __v: 0
  },
  {
    _id: "a73ad2c8-2d8a-4e4c-9e5e-b675c1e2ccd4",
    fullName: "Nayeli Mueller Legros",
    username: "yasminehowe239",
    phone: "+52327429224",
    location: {
      city: "Guadalajara",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.509Z",
    updatedAt: "2026-01-11T21:57:00.509Z",
    __v: 0
  },
  {
    _id: "52f4960a-bde9-4d40-8bed-b24175ff6ed4",
    fullName: "Kristin Osinski Rau",
    username: "lennabayer240",
    phone: "+57656170467",
    location: {
      city: "Medellín",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.670Z",
    updatedAt: "2026-01-11T21:57:00.670Z",
    __v: 0
  },
  {
    _id: "3b21ca69-43d7-4353-9700-60acaa8fdb43",
    fullName: "Elbert Koepp Mertz",
    username: "veronicakshle241",
    phone: "+52611781825",
    location: {
      city: "Cancún",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.731Z",
    updatedAt: "2026-01-11T21:57:00.731Z",
    __v: 0
  },
  {
    _id: "99fa46ed-d27f-4c66-b0e9-f1f4e420a870",
    fullName: "Hank Bednar Moore",
    username: "micaelaquitzo242",
    phone: "+56702612496",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.790Z",
    updatedAt: "2026-01-11T21:57:00.790Z",
    __v: 0
  },
  {
    _id: "ad4f5e53-6156-4031-8332-8f719f7a79a5",
    fullName: "Selena Trantow McGlynn",
    username: "javontelockma243",
    phone: "+56499891776",
    location: {
      city: "La Serena",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.849Z",
    updatedAt: "2026-01-11T21:57:00.849Z",
    __v: 0
  },
  {
    _id: "9bff967d-e21f-4e35-93af-8b0c62551914",
    fullName: "Terence Greenholt Cole",
    username: "destinywiza244",
    phone: "+39212418938",
    location: {
      city: "Bologna",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.918Z",
    updatedAt: "2026-01-11T21:57:00.918Z",
    __v: 0
  },
  {
    _id: "471ef92f-af08-4b9a-9c93-4660a1d51134",
    fullName: "Antoinette Jacobson Marquardt",
    username: "metahilpert245",
    phone: "+51738170335",
    location: {
      city: "Trujillo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:00.981Z",
    updatedAt: "2026-01-11T21:57:00.981Z",
    __v: 0
  },
  {
    _id: "9ca731df-743c-4524-ac9a-09542c210cea",
    fullName: "Magnus Jacobson Considine",
    username: "gradygrady246",
    phone: "+44243697727",
    location: {
      city: "Birmingham",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.041Z",
    updatedAt: "2026-01-11T21:57:01.041Z",
    __v: 0
  },
  {
    _id: "f38216a9-e5f8-460f-bd37-048d9fe118e4",
    fullName: "Vladimir Tremblay Ward",
    username: "olengoyette247",
    phone: "+49233973449",
    location: {
      city: "Dresden",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.100Z",
    updatedAt: "2026-01-11T21:57:01.100Z",
    __v: 0
  },
  {
    _id: "ba3133da-50e5-4125-b782-bf3a4fb63a77",
    fullName: "Leola Nikolaus Roob",
    username: "evapacocha248",
    phone: "+52982642288",
    location: {
      city: "Tijuana",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.161Z",
    updatedAt: "2026-01-11T21:57:01.161Z",
    __v: 0
  },
  {
    _id: "834c2e9a-cec2-4661-8b73-6d0bb6430da7",
    fullName: "Meda Price Feeney",
    username: "cathyleuschke249",
    phone: "+49348162309",
    location: {
      city: "Hamburg",
      countryCode: "DE"
    },
    communityMemberships: [
      {
        communityId: "00b75a73-f239-4162-9c90-55c4bedeb9df",
        communityName: "Colectivo Padberg - Barton por derechos humanos",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:57:01.221Z",
    updatedAt: "2026-01-11T21:57:12.652Z",
    __v: 1
  },
  {
    _id: "c46c98ed-b979-437f-83a6-cb91826a3a23",
    fullName: "Kali Dibbert Walsh",
    username: "percivalhetti250",
    phone: "+56177333429",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.283Z",
    updatedAt: "2026-01-11T21:57:01.283Z",
    __v: 0
  },
  {
    _id: "a045d46c-4dfc-43dc-a175-b9742077b4a1",
    fullName: "Corbin Roberts Keebler",
    username: "beaucrona251",
    phone: "+34793263478",
    location: {
      city: "Madrid",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.342Z",
    updatedAt: "2026-01-11T21:57:01.342Z",
    __v: 0
  },
  {
    _id: "a59defc2-e4df-4632-aab0-1ed3138dd4ca",
    fullName: "Amos Blick Hudson",
    username: "holdenschambe252",
    phone: "+49389379731",
    location: {
      city: "Dresden",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.404Z",
    updatedAt: "2026-01-11T21:57:01.404Z",
    __v: 0
  },
  {
    _id: "ac35cc46-2e74-4ad4-acd1-45b08cb0aea7",
    fullName: "Loyce Goodwin Koepp",
    username: "linnealehner253",
    phone: "+55747090081",
    location: {
      city: "São Paulo",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.467Z",
    updatedAt: "2026-01-11T21:57:01.467Z",
    __v: 0
  },
  {
    _id: "f0d53808-ff06-472c-928e-78c5741730c8",
    fullName: "Patricia Bradtke Durgan-Reilly",
    username: "ervinlabadie254",
    phone: "+39586846407",
    location: {
      city: "Roma",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.525Z",
    updatedAt: "2026-01-11T21:57:01.525Z",
    __v: 0
  },
  {
    _id: "9dbf09ba-49f5-428c-ba2d-2bf89e4ecd61",
    fullName: "Neva Feil-Beatty Braun",
    username: "carletonlitte255",
    phone: "+34976656012",
    location: {
      city: "Sevilla",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.585Z",
    updatedAt: "2026-01-11T21:57:01.585Z",
    __v: 0
  },
  {
    _id: "63cb0725-f769-4ba2-8b4c-c4e739d0cf02",
    fullName: "Maudie Wuckert Okuneva-Labadie",
    username: "madelynwilder256",
    phone: "+56723370063",
    location: {
      city: "Antofagasta",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.642Z",
    updatedAt: "2026-01-11T21:57:01.642Z",
    __v: 0
  },
  {
    _id: "c6237902-c3f2-472a-ae02-99f1c374d9b8",
    fullName: "Keaton Zboncak Hansen-O'Reilly",
    username: "milfordgutkow257",
    phone: "+33132756336",
    location: {
      city: "Lyon",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.703Z",
    updatedAt: "2026-01-11T21:57:01.703Z",
    __v: 0
  },
  {
    _id: "88cf6cee-cca6-44f7-b4fb-2a99d44ae010",
    fullName: "Madison Walter Hudson",
    username: "alfredacrooks258",
    phone: "+51903906490",
    location: {
      city: "Lima",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.763Z",
    updatedAt: "2026-01-11T21:57:01.763Z",
    __v: 0
  },
  {
    _id: "e3f0cdf2-891d-40a4-a406-51c51dec7ff6",
    fullName: "Alene Yundt-Graham Huel-Cronin",
    username: "judsonpollich259",
    phone: "+55879786114",
    location: {
      city: "Salvador",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.821Z",
    updatedAt: "2026-01-11T21:57:01.821Z",
    __v: 0
  },
  {
    _id: "8106baea-4863-49ba-9253-b5718df249be",
    fullName: "Bernadine Streich Blanda",
    username: "jacksonmedhur260",
    phone: "+55763623495",
    location: {
      city: "Brasília",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:01.994Z",
    updatedAt: "2026-01-11T21:57:01.994Z",
    __v: 0
  },
  {
    _id: "aebf81c9-cc23-4b41-9007-ff8dcbad59d2",
    fullName: "Diamond Lemke Williamson",
    username: "alenaglover261",
    phone: "+54919143169",
    location: {
      city: "La Plata",
      countryCode: "AR"
    },
    communityMemberships: [
      {
        communityId: "ced550b3-15ec-44de-bb86-51117ddbe581",
        communityName: "Colectivo McClure, Heller and Collins por derechos",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:57:02.055Z",
    updatedAt: "2026-01-11T21:57:12.527Z",
    __v: 1
  },
  {
    _id: "c08be028-f3ea-4ce9-b768-5d9099ff224a",
    fullName: "Allison Lang Barton",
    username: "jamesonpfeffe262",
    phone: "+34912279840",
    location: {
      city: "Murcia",
      countryCode: "ES"
    },
    communityMemberships: [
      {
        communityId: "5178e187-45f5-4c9b-bb39-6c53faa34d62",
        communityName: "Comunidad Goldner - Bartoletti por infancia",
        role: "creator"
      },
      {
        communityId: "2f40cde8-4789-4616-843c-b98967b76ed1",
        communityName: "Asociación Witting and Sons por pobreza",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:57:02.116Z",
    updatedAt: "2026-01-11T21:57:13.928Z",
    __v: 2
  },
  {
    _id: "7b3abbc9-bd22-453a-99ba-0eb7419e0fce",
    fullName: "Elza Schuppe Kulas",
    username: "rileyorn263",
    phone: "+52517001533",
    location: {
      city: "Cancún",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.181Z",
    updatedAt: "2026-01-11T21:57:02.181Z",
    __v: 0
  },
  {
    _id: "e8b1391f-81f8-48bd-8a57-ea716cad6305",
    fullName: "Myrl Powlowski Muller",
    username: "gerardschumm264",
    phone: "+55165104135",
    location: {
      city: "São Paulo",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.241Z",
    updatedAt: "2026-01-11T21:57:02.241Z",
    __v: 0
  },
  {
    _id: "5486bb74-c312-4360-9242-7b5c3480234f",
    fullName: "Magdalen Bruen Stracke",
    username: "ricohackett265",
    phone: "+52141193679",
    location: {
      city: "Tijuana",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.303Z",
    updatedAt: "2026-01-11T21:57:02.303Z",
    __v: 0
  },
  {
    _id: "31f83f0d-a181-4504-ac5c-fc05dc898fc6",
    fullName: "Vida Ryan Wintheiser",
    username: "luciuswehner266",
    phone: "+57936163733",
    location: {
      city: "Bucaramanga",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.365Z",
    updatedAt: "2026-01-11T21:57:02.365Z",
    __v: 0
  },
  {
    _id: "2fc6cd4f-956c-461b-aefe-f299a2c85dce",
    fullName: "Katelyn Rempel Friesen",
    username: "karirippin267",
    phone: "+56551059195",
    location: {
      city: "La Serena",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.423Z",
    updatedAt: "2026-01-11T21:57:02.423Z",
    __v: 0
  },
  {
    _id: "56a617e1-1252-4cb7-8399-aba2c9548a16",
    fullName: "Jerrold Bins Steuber",
    username: "candicemorar268",
    phone: "+49325359696",
    location: {
      city: "Dresden",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.481Z",
    updatedAt: "2026-01-11T21:57:02.481Z",
    __v: 0
  },
  {
    _id: "fe7664de-78d6-4a4c-a4bb-92b11a70f7f7",
    fullName: "Damion Shields Reinger",
    username: "nicoleankundi269",
    phone: "+39696794241",
    location: {
      city: "Milano",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.540Z",
    updatedAt: "2026-01-11T21:57:02.540Z",
    __v: 0
  },
  {
    _id: "7df7ae6c-bc6d-4836-941f-e0231e891b35",
    fullName: "Brant Harris Beahan",
    username: "waltonkub270",
    phone: "+54599987178",
    location: {
      city: "Mendoza",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.599Z",
    updatedAt: "2026-01-11T21:57:02.599Z",
    __v: 0
  },
  {
    _id: "70529fad-abe8-4317-8e41-0427cb9b9717",
    fullName: "Tess Moore Rohan",
    username: "clarissaroob271",
    phone: "+54378044084",
    location: {
      city: "Tucumán",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.658Z",
    updatedAt: "2026-01-11T21:57:02.658Z",
    __v: 0
  },
  {
    _id: "b2c91611-038e-4d95-a85c-6085858b978b",
    fullName: "Fernando Skiles Pacocha",
    username: "elnorapfeffer272",
    phone: "+52367051427",
    location: {
      city: "León",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.719Z",
    updatedAt: "2026-01-11T21:57:02.719Z",
    __v: 0
  },
  {
    _id: "03c3052f-b08c-4f60-8753-f3d61ad6a37a",
    fullName: "Camila Smith Boyer",
    username: "brycewalker273",
    phone: "+57972858790",
    location: {
      city: "Barranquilla",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.778Z",
    updatedAt: "2026-01-11T21:57:02.778Z",
    __v: 0
  },
  {
    _id: "9b20cdd3-ed70-4ad5-b05c-feece8c985a2",
    fullName: "Elsie Oberbrunner Boehm",
    username: "kristaklocko274",
    phone: "+56236995435",
    location: {
      city: "Valparaíso",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.837Z",
    updatedAt: "2026-01-11T21:57:02.837Z",
    __v: 0
  },
  {
    _id: "cfccf0aa-acd9-47f0-8d06-4d595721cf49",
    fullName: "Forest Dietrich Jast",
    username: "mossieroob275",
    phone: "+44007633016",
    location: {
      city: "Liverpool",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.907Z",
    updatedAt: "2026-01-11T21:57:02.907Z",
    __v: 0
  },
  {
    _id: "d558b4bb-a011-4c61-a09a-adf79430e9cc",
    fullName: "Tobin Heidenreich Cassin",
    username: "foresthand276",
    phone: "+39831344993",
    location: {
      city: "Firenze",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:02.971Z",
    updatedAt: "2026-01-11T21:57:02.971Z",
    __v: 0
  },
  {
    _id: "1fc5424e-b3af-48ac-a20e-da3de05cb31d",
    fullName: "Lizeth Mertz Murazik",
    username: "isidroheidenr277",
    phone: "+33945264256",
    location: {
      city: "Toulouse",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.029Z",
    updatedAt: "2026-01-11T21:57:03.029Z",
    __v: 0
  },
  {
    _id: "fb047b0b-93b8-4c4d-912f-70a08e008439",
    fullName: "Aiyana Homenick-Adams Towne",
    username: "tremaineryan278",
    phone: "+55056628131",
    location: {
      city: "Rio de Janeiro",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.090Z",
    updatedAt: "2026-01-11T21:57:03.090Z",
    __v: 0
  },
  {
    _id: "f51405fb-92b4-4239-80c3-ef602d934b5a",
    fullName: "Allison Dicki Reinger",
    username: "eugenenienow279",
    phone: "+33043612498",
    location: {
      city: "Toulouse",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.151Z",
    updatedAt: "2026-01-11T21:57:03.151Z",
    __v: 0
  },
  {
    _id: "ff3c00e3-02a6-4d4a-a9f3-c5c373271497",
    fullName: "Cullen Boehm Maggio",
    username: "nonakiehn280",
    phone: "+51296057305",
    location: {
      city: "Arequipa",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.320Z",
    updatedAt: "2026-01-11T21:57:03.320Z",
    __v: 0
  },
  {
    _id: "bb627f34-ae5f-483c-85af-1587b816b65a",
    fullName: "Cory Torphy Osinski",
    username: "cielocole281",
    phone: "+44800816670",
    location: {
      city: "Liverpool",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.377Z",
    updatedAt: "2026-01-11T21:57:03.377Z",
    __v: 0
  },
  {
    _id: "bf7b1f3b-90cf-4918-9872-0374ba700514",
    fullName: "Kirstin Harris Stoltenberg",
    username: "mackmarquardt282",
    phone: "+49207247782",
    location: {
      city: "Stuttgart",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.436Z",
    updatedAt: "2026-01-11T21:57:03.436Z",
    __v: 0
  },
  {
    _id: "f555d1ce-7f90-4a29-8104-d551f6be2a8e",
    fullName: "Art Bernhard Kutch",
    username: "williamhauck283",
    phone: "+55578948680",
    location: {
      city: "Rio de Janeiro",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.495Z",
    updatedAt: "2026-01-11T21:57:03.495Z",
    __v: 0
  },
  {
    _id: "8015dfe8-9a98-480d-a734-c07f01a1d093",
    fullName: "Lorenza Gleason Schaden",
    username: "beryllabadie284",
    phone: "+56414961899",
    location: {
      city: "La Serena",
      countryCode: "CL"
    },
    communityMemberships: [
      {
        communityId: "389e77f6-a369-4240-babb-e3e20a8624c3",
        communityName: "Comunidad Ruecker Group por vivienda",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:57:03.553Z",
    updatedAt: "2026-01-11T21:57:12.837Z",
    __v: 1
  },
  {
    _id: "84e6ca94-f1c7-4261-ac38-dd50532b5ec8",
    fullName: "Cathrine Ledner Hermann",
    username: "sharonschneid285",
    phone: "+57057781550",
    location: {
      city: "Barranquilla",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.612Z",
    updatedAt: "2026-01-11T21:57:03.612Z",
    __v: 0
  },
  {
    _id: "dea62ca6-837a-4ef3-b10e-8e9ff258015c",
    fullName: "Leta Pfannerstill Mitchell",
    username: "harmonstroman286",
    phone: "+49192011168",
    location: {
      city: "Hamburg",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.674Z",
    updatedAt: "2026-01-11T21:57:03.674Z",
    __v: 0
  },
  {
    _id: "4c487694-8f53-4ddc-a029-a90b362f56fc",
    fullName: "Kory Schultz Purdy",
    username: "cleoramiller287",
    phone: "+54558156208",
    location: {
      city: "Rosario",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.732Z",
    updatedAt: "2026-01-11T21:57:03.732Z",
    __v: 0
  },
  {
    _id: "27bc2960-14a8-47ad-92a4-c093ae592cdd",
    fullName: "Chaya Vandervort Nader",
    username: "jacksonprosac288",
    phone: "+57899905839",
    location: {
      city: "Cali",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.791Z",
    updatedAt: "2026-01-11T21:57:03.791Z",
    __v: 0
  },
  {
    _id: "d1615bda-77a8-49c6-9559-f6749e3655d8",
    fullName: "Emory Ward Denesik",
    username: "wendellherman289",
    phone: "+55098609396",
    location: {
      city: "Fortaleza",
      countryCode: "BR"
    },
    communityMemberships: [
      {
        communityId: "9c523675-68c7-4a13-a37c-39f961d71bb0",
        communityName: "Asociación Daugherty Inc por derechos humanos",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:57:03.852Z",
    updatedAt: "2026-01-11T21:57:11.726Z",
    __v: 1
  },
  {
    _id: "2213d413-2bdc-45fc-b5e5-5f054e7e67ab",
    fullName: "Joana Lubowitz-Kutch Collier",
    username: "melvinframi290",
    phone: "+51450559071",
    location: {
      city: "Cusco",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.912Z",
    updatedAt: "2026-01-11T21:57:03.912Z",
    __v: 0
  },
  {
    _id: "5d188010-4a63-49f7-bf8a-d472a6f92563",
    fullName: "Sasha Schmidt Hilll",
    username: "rexreilly291",
    phone: "+58737153940",
    location: {
      city: "Caracas",
      countryCode: "VE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:03.973Z",
    updatedAt: "2026-01-11T21:57:03.973Z",
    __v: 0
  },
  {
    _id: "eef3d3e1-31de-4e65-8c59-af92f572dadf",
    fullName: "Maritza White Parisian",
    username: "stephaniabosc292",
    phone: "+57072580710",
    location: {
      city: "Barranquilla",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.035Z",
    updatedAt: "2026-01-11T21:57:04.035Z",
    __v: 0
  },
  {
    _id: "292127a2-7217-4f5f-b525-1c32317fc28a",
    fullName: "Aida Gerlach Considine",
    username: "joeykiehn293",
    phone: "+51777020691",
    location: {
      city: "Chiclayo",
      countryCode: "PE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.096Z",
    updatedAt: "2026-01-11T21:57:04.096Z",
    __v: 0
  },
  {
    _id: "81a70050-bc38-4106-aeaa-9d51fe6ec618",
    fullName: "Rebekah Hoeger Fay",
    username: "joshfay294",
    phone: "+33291663658",
    location: {
      city: "Lille",
      countryCode: "FR"
    },
    communityMemberships: [
      {
        communityId: "b9026d61-05b2-4c6d-ba42-332aedc783a5",
        communityName: "Grupo Frami - Kuhic por salud",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:57:04.154Z",
    updatedAt: "2026-01-11T21:57:11.988Z",
    __v: 1
  },
  {
    _id: "8464f7e4-c3b4-4a50-96b8-960ff22aae53",
    fullName: "Ulices Legros-Jacobson Reichert",
    username: "jamiecormier295",
    phone: "+54444110299",
    location: {
      city: "Mar del Plata",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.213Z",
    updatedAt: "2026-01-11T21:57:04.213Z",
    __v: 0
  },
  {
    _id: "4b6164c2-bb12-465e-8c34-96f74c72c763",
    fullName: "Emanuel Schuster Wolff",
    username: "hectorfadel296",
    phone: "+44851309862",
    location: {
      city: "Liverpool",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.272Z",
    updatedAt: "2026-01-11T21:57:04.272Z",
    __v: 0
  },
  {
    _id: "8ee8f6b3-8bc9-494c-b5ca-bd649930cfb0",
    fullName: "Cordell Mann Baumbach-Russel",
    username: "chasedach297",
    phone: "+52700828838",
    location: {
      city: "Tijuana",
      countryCode: "MX"
    },
    communityMemberships: [
      {
        communityId: "7ea16f99-d785-4624-b156-f181f3961a76",
        communityName: "Fundación Schumm Inc por infancia",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:57:04.332Z",
    updatedAt: "2026-01-11T21:57:13.432Z",
    __v: 1
  },
  {
    _id: "f593149f-00c4-4277-811f-4d568fb34b92",
    fullName: "Sophie Beier Dach",
    username: "augustabernha298",
    phone: "+52725263462",
    location: {
      city: "Cancún",
      countryCode: "MX"
    },
    communityMemberships: [
      {
        communityId: "9e57ef83-d35b-45b9-becf-e9e465d37ed1",
        communityName: "Comunidad Kuhlman - Roob por agua potable",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:57:04.399Z",
    updatedAt: "2026-01-11T21:57:11.662Z",
    __v: 1
  },
  {
    _id: "e624ad77-068b-431f-a279-9a313685aec5",
    fullName: "Kendra Quitzon Rowe",
    username: "mallorygoodwi299",
    phone: "+49817611307",
    location: {
      city: "Dresden",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.464Z",
    updatedAt: "2026-01-11T21:57:04.464Z",
    __v: 0
  },
  {
    _id: "968e0c4e-63c3-4d03-a42c-06ddefbe913a",
    fullName: "Clotilde Ward Lebsack",
    username: "heidipurdy300",
    phone: "+57373648956",
    location: {
      city: "Cali",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.627Z",
    updatedAt: "2026-01-11T21:57:04.627Z",
    __v: 0
  },
  {
    _id: "093f6763-d8f0-4103-8bf0-bf711c57b994",
    fullName: "Rory Rempel Hammes",
    username: "eltonkirlin301",
    phone: "+44914390843",
    location: {
      city: "London",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.689Z",
    updatedAt: "2026-01-11T21:57:04.689Z",
    __v: 0
  },
  {
    _id: "34e90f80-1ff2-40de-9b80-06314ad8210a",
    fullName: "Erna Schowalter Roberts",
    username: "daijatromp302",
    phone: "+55166145788",
    location: {
      city: "Brasília",
      countryCode: "BR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.747Z",
    updatedAt: "2026-01-11T21:57:04.747Z",
    __v: 0
  },
  {
    _id: "4bb852ef-619c-4a11-95c4-dc1d5b052233",
    fullName: "Allen Reynolds Lockman",
    username: "zenawillms303",
    phone: "+54471735319",
    location: {
      city: "Rosario",
      countryCode: "AR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.806Z",
    updatedAt: "2026-01-11T21:57:04.806Z",
    __v: 0
  },
  {
    _id: "fefb3eab-6e96-4c43-9fab-4c65174a8079",
    fullName: "Baylee Osinski Kuvalis",
    username: "jeffereymuell304",
    phone: "+39453595701",
    location: {
      city: "Napoli",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.865Z",
    updatedAt: "2026-01-11T21:57:04.865Z",
    __v: 0
  },
  {
    _id: "4b018569-43a4-4d70-9241-3e2fbe9de054",
    fullName: "Brooke Weimann Leuschke",
    username: "miaklein305",
    phone: "+52955412715",
    location: {
      city: "Cancún",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.924Z",
    updatedAt: "2026-01-11T21:57:04.924Z",
    __v: 0
  },
  {
    _id: "57373e32-29b0-40fe-990d-14698f83b0fd",
    fullName: "Markus Schroeder Christiansen",
    username: "garretklein306",
    phone: "+33293236744",
    location: {
      city: "Paris",
      countryCode: "FR"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:04.984Z",
    updatedAt: "2026-01-11T21:57:04.984Z",
    __v: 0
  },
  {
    _id: "4ddc2fb5-3b3b-4699-af90-5865c7bfe6bb",
    fullName: "Edythe VonRueden Corkery",
    username: "rolandovon307",
    phone: "+52364354978",
    location: {
      city: "Cancún",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.042Z",
    updatedAt: "2026-01-11T21:57:05.042Z",
    __v: 0
  },
  {
    _id: "9572edad-8d3d-4418-951e-f4042530e679",
    fullName: "Anabel Prosacco Zboncak",
    username: "augustineflat308",
    phone: "+34347304885",
    location: {
      city: "Valencia",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.102Z",
    updatedAt: "2026-01-11T21:57:05.102Z",
    __v: 0
  },
  {
    _id: "73082862-4557-48d0-8cd8-54c29275c3fb",
    fullName: "Wilma Cormier Klein",
    username: "floydwalker309",
    phone: "+44902473218",
    location: {
      city: "London",
      countryCode: "GB"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.161Z",
    updatedAt: "2026-01-11T21:57:05.161Z",
    __v: 0
  },
  {
    _id: "cc105c39-e779-4094-b288-bfd56c20280f",
    fullName: "Warren Nolan Schmidt",
    username: "rhiannonschme310",
    phone: "+56682489021",
    location: {
      city: "Antofagasta",
      countryCode: "CL"
    },
    communityMemberships: [
      {
        communityId: "f55ee3ea-983e-4ab2-adc5-b3e24c3b15d0",
        communityName: "Fundación Haag, Emmerich and Hermann por educación",
        role: "creator"
      }
    ],
    createdAt: "2026-01-11T21:57:05.222Z",
    updatedAt: "2026-01-11T21:57:12.054Z",
    __v: 1
  },
  {
    _id: "c80bd94c-3009-4884-b79a-e7e1497cfac8",
    fullName: "Garnett Marvin Kirlin",
    username: "albinsipes311",
    phone: "+49272312694",
    location: {
      city: "Munich",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.282Z",
    updatedAt: "2026-01-11T21:57:05.282Z",
    __v: 0
  },
  {
    _id: "332cd5c8-c3fe-45d2-a093-a651c7d769fb",
    fullName: "Marlen Satterfield Feeney",
    username: "larissadougla312",
    phone: "+49318850497",
    location: {
      city: "Berlin",
      countryCode: "DE"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.340Z",
    updatedAt: "2026-01-11T21:57:05.340Z",
    __v: 0
  },
  {
    _id: "9476a971-59e7-47ca-807b-1cfdc3d73aaa",
    fullName: "Kurt Borer Ratke-Hettinger",
    username: "zachariahkohl313",
    phone: "+34294934477",
    location: {
      city: "Madrid",
      countryCode: "ES"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.397Z",
    updatedAt: "2026-01-11T21:57:05.397Z",
    __v: 0
  },
  {
    _id: "724bb8b5-007d-4d3d-b060-10f8c8b4e75b",
    fullName: "Lauren Roberts Hand",
    username: "kyleesmitham314",
    phone: "+57905919720",
    location: {
      city: "Bucaramanga",
      countryCode: "CO"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.456Z",
    updatedAt: "2026-01-11T21:57:05.456Z",
    __v: 0
  },
  {
    _id: "31ab2457-aaa4-4dbd-9e17-467cfa1497c2",
    fullName: "Leonie Graham Medhurst",
    username: "veldatromp315",
    phone: "+52858169392",
    location: {
      city: "Guadalajara",
      countryCode: "MX"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.516Z",
    updatedAt: "2026-01-11T21:57:05.516Z",
    __v: 0
  },
  {
    _id: "0286d442-ccce-4023-9c62-71a075184b3e",
    fullName: "Ottilie Graham Cummerata",
    username: "gregtremblay316",
    phone: "+39715852900",
    location: {
      city: "Roma",
      countryCode: "IT"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.574Z",
    updatedAt: "2026-01-11T21:57:05.574Z",
    __v: 0
  },
  {
    _id: "ad0c4bfc-50e7-4fad-8121-9da020a8f210",
    fullName: "Myriam Gerhold Rowe",
    username: "fatimawaters317",
    phone: "+56953162311",
    location: {
      city: "Santiago",
      countryCode: "CL"
    },
    communityMemberships: [],
    createdAt: "2026-01-11T21:57:05.632Z",
    updatedAt: "2026-01-11T21:57:05.632Z",
    __v: 0
  }
]);

print('✅ Loaded 1019 documents from 3 collections');
