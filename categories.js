/**
 * categories.js — Kunstmuseum
 * Comprehensive Wikimedia Commons painting categories.
 * Photographs are filtered out in app.js via medium metadata checks.
 */

const CATEGORIES = {

  // ════════════════════════════════════════════════════════
  // RELIGIOUS
  // ════════════════════════════════════════════════════════
  religious: [
    // ── General ──
    { name: "Religious Paintings",               category: "Category:Religious paintings" },
    { name: "Christian Paintings",               category: "Category:Christian art" },
    { name: "Biblical Paintings",                category: "Category:Biblical paintings" },
    { name: "Old Testament Paintings",           category: "Category:Old Testament paintings" },
    { name: "New Testament Paintings",           category: "Category:New Testament paintings" },

    // ── Jesus Christ ──
    { name: "Jesus Christ",                      category: "Category:Paintings of Jesus" },
    { name: "The Nativity",                      category: "Category:Nativity of Jesus in paintings" },
    { name: "The Annunciation",                  category: "Category:Annunciation paintings" },
    { name: "The Baptism of Christ",             category: "Category:Baptism of Christ in paintings" },
    { name: "The Sermon on the Mount",           category: "Category:Sermon on the Mount in art" },
    { name: "The Last Supper",                   category: "Category:Last Supper paintings" },
    { name: "The Agony in the Garden",           category: "Category:Agony in the Garden paintings" },
    { name: "The Betrayal of Christ",            category: "Category:Betrayal of Christ in art" },
    { name: "Christ before Pilate",              category: "Category:Christ before Pilate in art" },
    { name: "The Crucifixion",                   category: "Category:Crucifixion of Jesus in paintings" },
    { name: "The Deposition",                    category: "Category:Deposition of Christ in art" },
    { name: "The Pietà",                         category: "Category:Pietà paintings" },
    { name: "The Entombment",                    category: "Category:Entombment of Christ in art" },
    { name: "The Resurrection",                  category: "Category:Resurrection of Jesus in paintings" },
    { name: "The Ascension",                     category: "Category:Ascension of Jesus in art" },
    { name: "The Transfiguration",               category: "Category:Transfiguration of Jesus in art" },
    { name: "Christ Pantocrator",                category: "Category:Christ Pantocrator" },
    { name: "Ecce Homo",                         category: "Category:Ecce Homo paintings" },
    { name: "Christ in the Garden",              category: "Category:Christ in the Garden of Gethsemane in art" },

    // ── Virgin Mary ──
    { name: "Virgin Mary",                       category: "Category:Paintings of the Virgin Mary" },
    { name: "Madonna and Child",                 category: "Category:Madonna and Child paintings" },
    { name: "Madonna Enthroned",                 category: "Category:Madonna enthroned paintings" },
    { name: "The Immaculate Conception",         category: "Category:Immaculate Conception paintings" },
    { name: "The Assumption of Mary",            category: "Category:Assumption of Mary in art" },
    { name: "The Coronation of the Virgin",      category: "Category:Coronation of the Virgin paintings" },
    { name: "Adoration of the Magi",             category: "Category:Adoration of the Magi paintings" },
    { name: "The Flight into Egypt",             category: "Category:Rest on the Flight into Egypt" },
    { name: "The Holy Family",                   category: "Category:Holy Family paintings" },
    { name: "The Visitation",                    category: "Category:Visitation paintings" },

    // ── Apostles & Evangelists ──
    { name: "Saint Peter",                       category: "Category:Peter the Apostle in art" },
    { name: "Saint Paul",                        category: "Category:Paul the Apostle in art" },
    { name: "Saint John the Apostle",            category: "Category:John the Apostle in art" },
    { name: "Saint John the Baptist",            category: "Category:John the Baptist in paintings" },
    { name: "Saint Matthew",                     category: "Category:Matthew the Apostle in art" },
    { name: "Saint Mark",                        category: "Category:Mark the Evangelist in art" },
    { name: "Saint Luke",                        category: "Category:Luke the Evangelist in art" },
    { name: "Saint Thomas",                      category: "Category:Thomas the Apostle in art" },
    { name: "Saint James",                       category: "Category:James son of Zebedee in art" },
    { name: "Judas Iscariot",                    category: "Category:Judas Iscariot in art" },

    // ── Old Testament Figures ──
    { name: "Adam and Eve",                      category: "Category:Adam and Eve paintings" },
    { name: "Moses",                             category: "Category:Moses in art" },
    { name: "Noah",                              category: "Category:Noah in art" },
    { name: "Abraham",                           category: "Category:Abraham in art" },
    { name: "David",                             category: "Category:David in art" },
    { name: "Solomon",                           category: "Category:Solomon in art" },
    { name: "Samson",                            category: "Category:Samson in art" },
    { name: "Judith",                            category: "Category:Judith paintings" },
    { name: "Susanna",                           category: "Category:Susanna and the Elders paintings" },
    { name: "Joseph",                            category: "Category:Joseph son of Jacob in art" },
    { name: "Elijah",                            category: "Category:Elijah in art" },
    { name: "Job",                               category: "Category:Job in art" },
    { name: "Salome",                            category: "Category:Salome in art" },
    { name: "Esther",                            category: "Category:Esther in art" },
    { name: "Ruth",                              category: "Category:Ruth in art" },
    { name: "Bathsheba",                         category: "Category:Bathsheba paintings" },
    { name: "The Tower of Babel",                category: "Category:Tower of Babel paintings" },
    { name: "Cain and Abel",                     category: "Category:Cain and Abel in art" },

    // ── Saints ──
    { name: "Saints in Paintings",              category: "Category:Saints in paintings" },
    { name: "Saint Sebastian",                  category: "Category:Sebastian in paintings" },
    { name: "Saint Jerome",                     category: "Category:Jerome in paintings" },
    { name: "Saint Francis of Assisi",          category: "Category:Francis of Assisi in paintings" },
    { name: "Saint Catherine of Alexandria",    category: "Category:Catherine of Alexandria in art" },
    { name: "Saint George",                     category: "Category:Saint George in paintings" },
    { name: "Saint Anthony",                    category: "Category:Anthony the Great in art" },
    { name: "Saint Mary Magdalene",             category: "Category:Mary Magdalene in paintings" },
    { name: "Saint Barbara",                    category: "Category:Barbara in art" },
    { name: "Saint Nicholas",                   category: "Category:Nicholas of Myra in art" },
    { name: "Saint Stephen",                    category: "Category:Stephen in art" },
    { name: "Saint Lawrence",                   category: "Category:Lawrence of Rome in art" },
    { name: "Saint Agnes",                      category: "Category:Agnes of Rome in art" },
    { name: "Saint Teresa of Avila",            category: "Category:Teresa of Ávila in art" },
    { name: "Saint Dominic",                    category: "Category:Dominic de Guzmán in art" },
    { name: "Saint Benedict",                   category: "Category:Benedict of Nursia in art" },
    { name: "Saint Augustine",                  category: "Category:Augustine of Hippo in art" },
    { name: "Saint Thomas Aquinas",             category: "Category:Thomas Aquinas in art" },
    { name: "Saint Cecilia",                    category: "Category:Cecilia in art" },
    { name: "Saint Christopher",               category: "Category:Christopher in art" },

    // ── Angels & Archangels ──
    { name: "Angels in Paintings",             category: "Category:Angels in paintings" },
    { name: "Archangel Michael",               category: "Category:Michael in art" },
    { name: "Archangel Gabriel",               category: "Category:Gabriel in art" },
    { name: "Archangel Raphael",               category: "Category:Raphael archangel in art" },

    // ── World Religions ──
    { name: "Buddhist Paintings",              category: "Category:Buddhist paintings" },
    { name: "Hindu Deities in Art",            category: "Category:Hindu deities in art" },
    { name: "Krishna",                         category: "Category:Krishna in art" },
    { name: "Vishnu",                          category: "Category:Vishnu in art" },
    { name: "Shiva",                           category: "Category:Shiva in art" },
    { name: "Ganesha",                         category: "Category:Ganesha in art" },
    { name: "Islamic Art",                     category: "Category:Islamic paintings" },
    { name: "Jewish Art",                      category: "Category:Jewish art" },
  ],

  // ════════════════════════════════════════════════════════
  // MYTHOLOGICAL
  // ════════════════════════════════════════════════════════
  mythological: [
    // ── General ──
    { name: "Mythological Paintings",          category: "Category:Mythological paintings" },
    { name: "Greek Mythology Paintings",       category: "Category:Greek mythology in paintings" },

    // ── Olympian Gods ──
    { name: "Venus (Aphrodite)",               category: "Category:Venus in paintings" },
    { name: "Apollo",                          category: "Category:Apollo in paintings" },
    { name: "Diana (Artemis)",                 category: "Category:Diana in paintings" },
    { name: "Mars (Ares)",                     category: "Category:Mars in paintings" },
    { name: "Jupiter (Zeus)",                  category: "Category:Jupiter in paintings" },
    { name: "Minerva (Athena)",                category: "Category:Minerva in paintings" },
    { name: "Neptune (Poseidon)",              category: "Category:Neptune in paintings" },
    { name: "Mercury (Hermes)",                category: "Category:Mercury in paintings" },
    { name: "Bacchus (Dionysus)",              category: "Category:Bacchus in paintings" },
    { name: "Cupid (Eros)",                    category: "Category:Cupid in paintings" },
    { name: "Juno (Hera)",                     category: "Category:Juno in paintings" },
    { name: "Pluto (Hades)",                   category: "Category:Pluto in art" },
    { name: "Saturn (Cronus)",                 category: "Category:Saturn in art" },
    { name: "Vulcan (Hephaestus)",             category: "Category:Vulcan in art" },
    { name: "Ceres (Demeter)",                 category: "Category:Ceres in art" },
    { name: "Proserpine (Persephone)",         category: "Category:Persephone in art" },
    { name: "Aurora (Eos)",                    category: "Category:Aurora in paintings" },
    { name: "Pan",                             category: "Category:Pan in art" },
    { name: "Fauna and Satyrs",                category: "Category:Satyrs in art" },

    // ── Heroes & Mortals ──
    { name: "Hercules",                        category: "Category:Hercules in paintings" },
    { name: "Perseus",                         category: "Category:Perseus in paintings" },
    { name: "Theseus",                         category: "Category:Theseus in art" },
    { name: "Achilles",                        category: "Category:Achilles in paintings" },
    { name: "Odysseus (Ulysses)",              category: "Category:Odysseus in paintings" },
    { name: "Jason and the Argonauts",         category: "Category:Jason in art" },
    { name: "Bellerophon",                     category: "Category:Bellerophon in art" },
    { name: "Aeneas",                          category: "Category:Aeneas in art" },
    { name: "Romulus and Remus",               category: "Category:Romulus and Remus in art" },
    { name: "Meleager",                        category: "Category:Meleager in art" },

    // ── Famous Myths & Scenes ──
    { name: "The Birth of Venus",              category: "Category:The Birth of Venus in art" },
    { name: "The Judgement of Paris",          category: "Category:Judgment of Paris in paintings" },
    { name: "Leda and the Swan",               category: "Category:Leda and the swan in paintings" },
    { name: "The Rape of Proserpine",          category: "Category:Rape of Persephone in art" },
    { name: "The Rape of the Sabine Women",    category: "Category:Rape of the Sabine Women in art" },
    { name: "Europa and the Bull",             category: "Category:Europa and the Bull in art" },
    { name: "Danae",                           category: "Category:Danaë in art" },
    { name: "Io",                              category: "Category:Io in art" },
    { name: "Ganymede",                        category: "Category:Ganymede in art" },
    { name: "The Fall of Phaeton",             category: "Category:Phaethon in art" },
    { name: "Icarus",                          category: "Category:Icarus in paintings" },
    { name: "Narcissus",                       category: "Category:Narcissus in paintings" },
    { name: "Echo and Narcissus",              category: "Category:Echo and Narcissus in art" },
    { name: "Orpheus and Eurydice",            category: "Category:Orpheus in paintings" },
    { name: "Prometheus",                      category: "Category:Prometheus in paintings" },
    { name: "Pandora",                         category: "Category:Pandora in art" },
    { name: "Pygmalion and Galatea",           category: "Category:Pygmalion and Galatea in art" },
    { name: "Apollo and Daphne",               category: "Category:Daphne in art" },
    { name: "Actaeon",                         category: "Category:Actaeon in paintings" },
    { name: "Endymion",                        category: "Category:Endymion in art" },
    { name: "The Triumph of Venus",            category: "Category:Triumph of Venus paintings" },
    { name: "The Three Graces",               category: "Category:Three Graces in paintings" },
    { name: "The Muses",                       category: "Category:Muses in art" },
    { name: "Nymphs",                          category: "Category:Nymphs in art" },
    { name: "Centaurs",                        category: "Category:Centaurs in art" },

    // ── Creatures & Monsters ──
    { name: "Medusa",                          category: "Category:Medusa in art" },
    { name: "Andromeda",                       category: "Category:Andromeda in art" },
    { name: "Circe",                           category: "Category:Circe in paintings" },
    { name: "The Sphinx",                      category: "Category:Sphinx in art" },
    { name: "Chimera",                         category: "Category:Chimera in art" },

    // ── Trojan War ──
    { name: "Helen of Troy",                   category: "Category:Helen of Troy in paintings" },
    { name: "Penelope",                        category: "Category:Penelope in paintings" },
    { name: "Cassandra",                       category: "Category:Cassandra in art" },
    { name: "Hecuba",                          category: "Category:Hecuba in art" },
    { name: "The Fall of Troy",                category: "Category:Trojan War in paintings" },

    // ── Norse Mythology ──
    { name: "Odin",                            category: "Category:Odin in paintings" },
    { name: "Thor",                            category: "Category:Thor in paintings" },
    { name: "Freya",                           category: "Category:Freyja in art" },
    { name: "Loki",                            category: "Category:Loki in art" },
    { name: "Valkyries",                       category: "Category:Valkyries in art" },
    { name: "Norse Mythology in Art",          category: "Category:Norse mythology in art" },

    // ── Egyptian Mythology ──
    { name: "Egyptian Mythology in Art",       category: "Category:Egyptian mythology in art" },
    { name: "Isis",                            category: "Category:Isis in art" },
    { name: "Cleopatra",                       category: "Category:Cleopatra in paintings" },
  ],

  // ════════════════════════════════════════════════════════
  // LITERARY & PHILOSOPHICAL
  // ════════════════════════════════════════════════════════
  literary: [
    // ── Ancient Philosophy ──
    { name: "Socrates",                        category: "Category:Socrates in paintings" },
    { name: "Plato",                           category: "Category:Plato in art" },
    { name: "Aristotle",                       category: "Category:Aristotle in paintings" },
    { name: "Diogenes",                        category: "Category:Diogenes of Sinope in art" },
    { name: "Pythagoras",                      category: "Category:Pythagoras in art" },
    { name: "Heraclitus",                      category: "Category:Heraclitus in art" },
    { name: "Democritus",                      category: "Category:Democritus in art" },
    { name: "The School of Athens",            category: "Category:The School of Athens" },
    { name: "The Death of Socrates",           category: "Category:The Death of Socrates" },

    // ── Dante ──
    { name: "Dante Alighieri",                 category: "Category:Dante Alighieri in paintings" },
    { name: "The Divine Comedy",               category: "Category:Divine Comedy in paintings" },
    { name: "Dante's Inferno",                 category: "Category:Inferno paintings" },
    { name: "Paolo and Francesca",             category: "Category:Paolo and Francesca in art" },
    { name: "Virgil",                          category: "Category:Virgil in art" },
    { name: "Beatrice",                        category: "Category:Beatrice Portinari in art" },

    // ── Shakespeare ──
    { name: "Hamlet",                          category: "Category:Hamlet in paintings" },
    { name: "Ophelia",                         category: "Category:Ophelia in paintings" },
    { name: "Romeo and Juliet",                category: "Category:Romeo and Juliet in paintings" },
    { name: "Macbeth",                         category: "Category:Macbeth in paintings" },
    { name: "Lady Macbeth",                    category: "Category:Lady Macbeth in art" },
    { name: "A Midsummer Night's Dream",       category: "Category:A Midsummer Night's Dream in art" },
    { name: "The Tempest",                     category: "Category:The Tempest in art" },
    { name: "Othello",                         category: "Category:Othello in art" },
    { name: "King Lear",                       category: "Category:King Lear in art" },
    { name: "The Merchant of Venice",          category: "Category:The Merchant of Venice in art" },
    { name: "Titania",                         category: "Category:Titania in art" },
    { name: "Prospero",                        category: "Category:Prospero in art" },
    { name: "Falstaff",                        category: "Category:Falstaff in art" },

    // ── Greek Epic & Drama ──
    { name: "Oedipus",                         category: "Category:Oedipus in art" },
    { name: "Antigone",                        category: "Category:Antigone in art" },
    { name: "Medea",                           category: "Category:Medea in paintings" },
    { name: "Electra",                         category: "Category:Electra in art" },
    { name: "Iphigenia",                       category: "Category:Iphigenia in art" },
    { name: "Clytemnestra",                    category: "Category:Clytemnestra in art" },
    { name: "Ariadne",                         category: "Category:Ariadne in paintings" },
    { name: "Phaedra",                         category: "Category:Phaedra in art" },
    { name: "Sappho",                          category: "Category:Sappho in art" },
    { name: "Homer",                           category: "Category:Homer in art" },

    // ── Arthurian Legend ──
    { name: "King Arthur",                     category: "Category:King Arthur in art" },
    { name: "Lancelot",                        category: "Category:Lancelot in art" },
    { name: "Guinevere",                       category: "Category:Guinevere in art" },
    { name: "Merlin",                          category: "Category:Merlin in art" },
    { name: "The Lady of Shalott",             category: "Category:The Lady of Shalott" },
    { name: "Tristan and Isolde",              category: "Category:Tristan and Iseult in art" },
    { name: "Percival",                        category: "Category:Percival in art" },
    { name: "The Holy Grail",                  category: "Category:Holy Grail in art" },

    // ── Medieval & Renaissance Literature ──
    { name: "Don Quixote",                     category: "Category:Don Quixote in paintings" },
    { name: "Faust",                           category: "Category:Faust in paintings" },
    { name: "Don Juan",                        category: "Category:Don Juan in art" },
    { name: "Scheherazade",                    category: "Category:Scheherazade in art" },
    { name: "Orlando Furioso",                 category: "Category:Orlando Furioso in art" },
    { name: "Petrarch",                        category: "Category:Petrarch in art" },
    { name: "Boccaccio",                       category: "Category:Giovanni Boccaccio in art" },
    { name: "Chaucer",                         category: "Category:Geoffrey Chaucer in art" },

    // ── Romantic & Later Literature ──
    { name: "La Belle Dame sans Merci",        category: "Category:La Belle Dame sans Merci" },
    { name: "Undine",                          category: "Category:Undine in art" },
    { name: "Faust and Mephistopheles",        category: "Category:Mephistopheles in art" },
    { name: "Siegfried",                       category: "Category:Siegfried in art" },
    { name: "Brunhilde",                       category: "Category:Brünnhilde in art" },

    // ── Allegory ──
    { name: "Allegory of Vanity",              category: "Category:Allegory of vanity" },
    { name: "Allegory of Justice",             category: "Category:Allegory of justice" },
    { name: "Allegory of Fame",                category: "Category:Allegory of fame" },
    { name: "Allegory of Truth",               category: "Category:Allegory of truth" },
    { name: "Allegory of Virtue",              category: "Category:Allegory of virtue" },
    { name: "Allegory of Fortune",             category: "Category:Allegory of fortune" },
    { name: "Allegory of Time",                category: "Category:Allegory of time" },
    { name: "Allegory of Love",                category: "Category:Allegory of love" },
    { name: "Allegory of War",                 category: "Category:Allegory of war paintings" },
    { name: "Allegory of Peace",               category: "Category:Allegory of peace" },
    { name: "The Four Seasons",                category: "Category:Allegories of the four seasons" },
    { name: "The Five Senses",                 category: "Category:Allegories of the five senses" },
    { name: "Triumph of Death",                category: "Category:Triumph of Death paintings" },
    { name: "Vanitas Paintings",               category: "Category:Vanitas" },
    { name: "Literary Paintings",              category: "Category:Literary subjects in art" },
  ]
};

// Flattened "all" list
CATEGORIES.all = [
  ...CATEGORIES.religious,
  ...CATEGORIES.mythological,
  ...CATEGORIES.literary
];

// Friendly theme labels
const THEME_LABELS = {
  religious:    "✦ Sacred & Religious",
  mythological: "✦ Mythological",
  literary:     "✦ Literary & Philosophical"
};
