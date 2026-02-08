import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.landscapeLeft,
    DeviceOrientation.landscapeRight,
  ]);
  runApp(const AutorouteApp());
}

class AutorouteApp extends StatelessWidget {
  const AutorouteApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Autoroute',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.amber),
        textTheme: const TextTheme(
          labelLarge: TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.w900,
            letterSpacing: 1,
          ),
        ),
        filledButtonTheme: FilledButtonThemeData(
          style: FilledButton.styleFrom(
            elevation: 6,
            backgroundColor: Colors.amber,
            foregroundColor: Colors.black,
            minimumSize: const Size(140, 72), // gros boutons 👍
            padding: const EdgeInsets.symmetric(horizontal: 24),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            textStyle: const TextStyle(
              fontSize: 30,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
      ),
      home: const GamePage(),
    );
  }
}

/* =======================
   MODELES
   ======================= */

class PlayingCard {
  final int rank; // 2..14
  final String suit; // clubs diamonds hearts spades

  const PlayingCard(this.rank, this.suit);

  String get assetPath {
    final r = switch (rank) {
      11 => 'jack',
      12 => 'queen',
      13 => 'king',
      14 => 'ace',
      _ => rank.toString(),
    };
    return 'assets/cards/${r}_of_${suit}.png';
  }
}

class Deck {
  final List<PlayingCard> _cards;
  Deck._(this._cards);

  factory Deck.shuffled() {
    const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    final cards = <PlayingCard>[];
    for (final s in suits) {
      for (int r = 2; r <= 14; r++) {
        cards.add(PlayingCard(r, s));
      }
    }
    cards.shuffle(Random());
    return Deck._(cards);
  }

  PlayingCard draw() => _cards.removeLast();
  int get remaining => _cards.length;
}

enum Guess { lower, equal, higher }

/* =======================
   GAME PAGE
   ======================= */

class GamePage extends StatefulWidget {
  const GamePage({super.key});
  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  static const int boardSize = 8;
  static const Set<int> faceDown = {2, 5};
  String? overlayMessage;
  String? overlayGif;
  int _overlayToken = 0;
  bool _overlayLocked = false;

  late Deck deck;
  late List<PlayingCard?> board;
  int index = 0;
  int usedCards = 0;

  @override
  void initState() {
    super.initState();
    _newGame();
  }

  void _newGame() {
    deck = Deck.shuffled();
    usedCards = 0;
    index = 0;
    board = List.filled(boardSize, null);

    for (int i = 0; i < boardSize; i++) {
      if (!faceDown.contains(i)) {
        board[i] = deck.draw();
        usedCards++;
      }
    }
    _handleFaceDown();
    setState(() {});
  }

  void _snack(String msg) {
    ScaffoldMessenger.of(context)
      ..clearSnackBars()
      ..showSnackBar(SnackBar(content: Text(msg)));
  }

  void _handleFaceDown() {
    while (index < boardSize && faceDown.contains(index)) {
      _showOverlay(
        'Péage 🚧, boit 2 gorgées',
        gifs: gifsdrink,
        milliseconds: 3500,
      );
      index++;
    }
  }

  bool _check(Guess g, PlayingCard d, PlayingCard t) {
    switch (g) {
      case Guess.lower:
        return d.rank < t.rank;
      case Guess.equal:
        return d.rank == t.rank;
      case Guess.higher:
        return d.rank > t.rank;
    }
  }

  Future<void> _guess(Guess g) async {
    if (index >= boardSize || faceDown.contains(index)) return;

    if (deck.remaining == 0 || usedCards >= 44) {
      await _showOverlay(
        'Il faut faire le plein ⛽, boit 4 gorgées',
        gifs: gifsdrink,
        milliseconds: 7000,
        lock: true,
      );
      deck = Deck.shuffled();
      usedCards = 0;
    }

    final target = board[index]!;
    final drawn = deck.draw();
    usedCards++;

    board[index] = drawn;

    if (_check(g, drawn, target)) {
      index++;
      _handleFaceDown();
      if (index >= boardSize) {
        _showOverlay(
          '✅ Bravo ! Fin du parcours.',
          gifs: gifsfinish,
          milliseconds: 3500,
        );
        _newGame();
      }
    } else {
      _showOverlay(
        '❌ Perdu ! boit 1 gorgée',
        gifs: gifsdrink,
        milliseconds: 3500,
      );
      index = 0;
      _handleFaceDown();
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B5D1E),
      body: SafeArea(
        child: Stack(
          children: [
            // CONTENU PRINCIPAL (doit être dans un Column pour utiliser Expanded)
            Column(
              children: [
                const SizedBox(height: 8),

                /// ZONE CARTES
                Expanded(
                  flex: 5,
                  child: LayoutBuilder(
                    builder: (context, constraints) {
                      const gap = 10.0;
                      const outerPadding = 16.0;

                      final availableW =
                          constraints.maxWidth - outerPadding * 2;
                      final cardW =
                          (availableW - gap * (boardSize - 1)) / boardSize;

                      final cardH = cardW * (88 / 63);

                      final maxH = constraints.maxHeight * 0.92;
                      final scale = cardH > maxH ? (maxH / cardH) : 1.0;

                      final finalW = cardW * scale;
                      final finalH = cardH * scale;

                      return Center(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                            horizontal: outerPadding,
                          ),
                          child: SizedBox(
                            height: finalH,
                            child: Row(
                              children: List.generate(boardSize, (i) {
                                return Padding(
                                  padding: EdgeInsets.only(
                                    right: i == boardSize - 1 ? 0 : gap,
                                  ),
                                  child: SizedBox(
                                    width: finalW,
                                    height: finalH,
                                    child: CardSlot(
                                      card: board[i],
                                      faceDown: faceDown.contains(i),
                                      active: i == index,
                                    ),
                                  ),
                                );
                              }),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),

                /// BOUTONS
                Expanded(
                  flex: 1,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Row(
                      children: [
                        Expanded(
                          child: FilledButton(
                            onPressed: () => _guess(Guess.higher),
                            child: const Text('+'),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: FilledButton(
                            onPressed: () => _guess(Guess.equal),
                            child: const Text('='),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: FilledButton(
                            onPressed: () => _guess(Guess.lower),
                            child: const Text('−'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 8),
              ],
            ),

            if (overlayMessage != null)
              Positioned(
                top: 60,
                left: 0,
                right: 0,
                child: Center(
                  child: AnimatedOpacity(
                    duration: const Duration(milliseconds: 300),
                    opacity: overlayMessage != null ? 1 : 0,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.7),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          if (overlayGif != null)
                            Padding(
                              padding: const EdgeInsets.only(right: 12),
                              child: Image.asset(
                                overlayGif!,
                                width: 120,
                                height: 120,
                              ),
                            ),
                          Text(
                            overlayMessage!,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),

            // BOUTON RECOMMENCER EN HAUT A DROITE
            Positioned(
              top: 8,
              right: 8,
              child: _RestartButton(onTap: _newGame),
            ),
          ],
        ),
      ),
    );
  }

  final List<String> gifsdrink = [
    'animations/drink1.gif',
    'animations/drink1.gif',
    'animations/drink2.gif',
    'animations/drink3.gif',
    'animations/drink4.gif',
    'animations/drink5.gif',
    'animations/drink6.gif',
    'animations/drink7.gif',
    'animations/drink8.gif',
    'animations/drink9.gif',
    'animations/drink10.gif',
    'animations/drink11.gif',
  ];

  final List<String> gifsfinish = [
    'animations/finish1.gif',
    'animations/finish2.gif',
  ];

  Future<void> _showOverlay(
    String message, {
    required List<String> gifs,
    required int milliseconds,
    bool lock = false,
  }) async {
    // Si un overlay "locké" est affiché, on ignore les autres.
    if (_overlayLocked) return;

    final token = ++_overlayToken;

    setState(() {
      overlayMessage = message;
      overlayGif = gifs[Random().nextInt(gifs.length)];
      _overlayLocked = lock;
    });

    await Future.delayed(Duration(milliseconds: milliseconds));

    // Si un autre overlay a été affiché après, on ne nettoie pas celui-là.
    if (!mounted || token != _overlayToken) return;

    setState(() {
      overlayMessage = null;
      overlayGif = null;
      _overlayLocked = false;
    });
  }
}

/* =======================
   WIDGETS UI
   ======================= */

class CardSlot extends StatelessWidget {
  final PlayingCard? card;
  final bool faceDown;
  final bool active;

  const CardSlot({
    super.key,
    required this.card,
    required this.faceDown,
    required this.active,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedScale(
      scale: active ? 1.05 : 1.0,
      duration: const Duration(milliseconds: 200),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: active ? Colors.amber : Colors.black26,
            width: active ? 3 : 1,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.4),
              blurRadius: 10,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(14),
          child: faceDown
              ? Image.asset(
                  'cards/back.png',
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stack) {
                    return Container(
                      color: Colors.blueGrey.shade700,
                      child: const Center(
                        child: Text('🂠', style: TextStyle(fontSize: 40)),
                      ),
                    );
                  },
                )
              : Image.asset(card!.assetPath, fit: BoxFit.cover),
        ),
      ),
    );
  }
}

class _RestartButton extends StatelessWidget {
  final VoidCallback onTap;
  const _RestartButton({required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(999),
        child: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: Colors.amber,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.35),
                blurRadius: 8,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: const Icon(Icons.refresh, size: 26, color: Colors.black),
        ),
      ),
    );
  }
}
