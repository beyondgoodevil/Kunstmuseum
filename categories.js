/**
 * categories.js
 * Curated Wikimedia Commons categories for each theme.
 * Each entry: { name: string, category: string (exact WC category title) }
 */

const CATEGORIES = {
  religious: [
    // Biblical / Christian figures
    { name: "Jesus Christ",                  category: "Category:Jesus Christ" },
    { name: "Paintings of Jesus",            category: "Category:Paintings of Jesus" },
    { name: "Virgin Mary",                   category: "Category:Virgin Mary in art" },
    { name: "The Annunciation",              category: "Category:Annunciation paintings" },
    { name: "The Nativity",                  category: "Category:Nativity of Jesus in art" },
    { name: "The Crucifixion",               category: "Category:Crucifixion of Jesus in art" },
    { name: "The Resurrection",             category: "Category:Resurrection of Jesus in art" },
    { name: "The Last Supper",               category: "Category:Last Supper paintings" },
    { name: "Saint John the Baptist",        category: "Category:John the Baptist in art" },
    { name: "Saint Sebastian",              category: "Category:Sebastian in art" },
    { name: "Saint Francis of Assisi",       category: "Category:Francis of Assisi in art" },
    { name: "Saint Jerome",                  category: "Category:Jerome in art" },
    { name: "Saint Catherine",              category: "Category:Catherine of Alexandria in art" },
    { name: "Saint George",                 category: "Category:Saint George in art" },
    { name: "Madonna and Child",             category: "Category:Madonna and Child paintings" },
    { name: "The Pieta",                     category: "Category:Pietà paintings" },
    { name: "The Baptism of Christ",         category: "Category:Baptism of Christ" },
    { name: "The Adoration of the Magi",     category: "Category:Adoration of the Magi paintings" },
    { name: "The Transfiguration",           category: "Category:Transfiguration of Jesus in art" },
    { name: "Old Testament Scenes",          category: "Category:Old Testament paintings" },
    { name: "Buddhist Art",                  category: "Category:Buddhist paintings" },
    { name: "Hindu Deities in Art",          category: "Category:Hindu deities in art" },
    { name: "Islamic Art Figures",           category: "Category:Islamic paintings" },
    { name: "Saints in Art",                 category: "Category:Saints in art" },
    { name: "Religious paintings",           category: "Category:Religious paintings" },
  ],

  mythological: [
    // Greek & Roman
    { name: "Venus (Aphrodite)",             category: "Category:Venus in art" },
    { name: "Apollo",                        category: "Category:Apollo in art" },
    { name: "Diana (Artemis)",               category: "Category:Diana in art" },
    { name: "Mars (Ares)",                   category: "Category:Mars in art" },
    { name: "Jupiter (Zeus)",                category: "Category:Jupiter in art" },
    { name: "Minerva (Athena)",              category: "Category:Minerva in art" },
    { name: "Neptune (Poseidon)",            category: "Category:Neptune in art" },
    { name: "Mercury (Hermes)",              category: "Category:Mercury in art" },
    { name: "Bacchus (Dionysus)",            category: "Category:Bacchus in art" },
    { name: "Cupid (Eros)",                  category: "Category:Cupid in art" },
    { name: "Juno (Hera)",                   category: "Category:Juno in art" },
    { name: "Hercules",                      category: "Category:Hercules in art" },
    { name: "Perseus",                       category: "Category:Perseus in art" },
    { name: "Prometheus",                    category: "Category:Prometheus in art" },
    { name: "Narcissus",                     category: "Category:Narcissus in art" },
    { name: "Leda and the Swan",             category: "Category:Leda and the swan in art" },
    { name: "The Judgement of Paris",        category: "Category:Judgment of Paris" },
    { name: "The Birth of Venus",            category: "Category:The Birth of Venus" },
    { name: "Aurora (Eos)",                  category: "Category:Aurora in art" },
    { name: "Medusa",                        category: "Category:Medusa in art" },
    { name: "Orpheus",                       category: "Category:Orpheus in art" },
    { name: "Icarus",                        category: "Category:Icarus in art" },
    { name: "Actaeon",                       category: "Category:Actaeon in art" },
    { name: "Europa and the Bull",           category: "Category:Europa in art" },
    { name: "Mythological paintings",        category: "Category:Mythological paintings" },
    // Norse / Other
    { name: "Odin",                          category: "Category:Odin in art" },
    { name: "Thor",                          category: "Category:Thor in art" },
  ],

  literary: [
    // Dante
    { name: "Dante Alighieri",               category: "Category:Dante Alighieri in art" },
    { name: "The Divine Comedy",             category: "Category:Divine Comedy in art" },
    // Shakespeare
    { name: "Hamlet",                        category: "Category:Hamlet in art" },
    { name: "Ophelia",                       category: "Category:Ophelia in art" },
    { name: "Romeo and Juliet",              category: "Category:Romeo and Juliet in art" },
    { name: "Macbeth",                       category: "Category:Macbeth in art" },
    { name: "A Midsummer Night's Dream",     category: "Category:A Midsummer Night's Dream in art" },
    { name: "The Tempest",                   category: "Category:The Tempest in art" },
    // Greek literary
    { name: "Achilles",                      category: "Category:Achilles in art" },
    { name: "Odysseus (Ulysses)",            category: "Category:Odysseus in art" },
    { name: "Helen of Troy",                 category: "Category:Helen of Troy in art" },
    { name: "Circe",                         category: "Category:Circe in art" },
    { name: "Penelope",                      category: "Category:Penelope in art" },
    // Philosophy
    { name: "Socrates",                      category: "Category:Socrates in art" },
    { name: "Plato",                         category: "Category:Plato in art" },
    { name: "Aristotle",                     category: "Category:Aristotle in art" },
    { name: "Diogenes",                      category: "Category:Diogenes of Sinope in art" },
    // Don Quixote / literary
    { name: "Don Quixote",                   category: "Category:Don Quixote in art" },
    { name: "Faust",                         category: "Category:Faust in art" },
    { name: "Don Juan",                      category: "Category:Don Juan in art" },
    // Allegorical
    { name: "Allegory of Fame",              category: "Category:Allegory of fame" },
    { name: "Allegory of Justice",           category: "Category:Allegory of justice" },
    { name: "Allegory of Vanity",            category: "Category:Allegory of vanity" },
    { name: "Literary paintings",            category: "Category:Literary subjects in art" },
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
