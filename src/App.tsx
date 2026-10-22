import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';

type Screen =
  | 'splash'
  | 'welcome'
  | 'login'
  | 'signup'
  | 'home'
  | 'live'
  | 'shows'
  | 'show-detail'
  | 'store'
  | 'gift'
  | 'cart'
  | 'checkout'
  | 'success'
  | 'support'
  | 'profile';

type IconName =
  | 'home'
  | 'calendar'
  | 'bag'
  | 'user'
  | 'play'
  | 'pause'
  | 'back'
  | 'cart'
  | 'phone'
  | 'bell'
  | 'chevron'
  | 'close'
  | 'minus'
  | 'plus'
  | 'check'
  | 'wifi'
  | 'gift'
  | 'heart'
  | 'settings'
  | 'logout'
  | 'headphones';

const shows = [
  {
    id: 'hurricane',
    name: 'Hurricane Main Show',
    time: 'Mon–Fri · 10 AM & 8 PM EST',
    category: 'Talk',
    image: '/assets/hurricane-main.jpg',
    description: 'Bold conversations, community voices, and the stories moving us forward.',
  },
  {
    id: 'word',
    name: 'Getting the Word Out',
    time: 'Tuesdays · 11 AM & 6 PM',
    category: 'Faith',
    image: '/assets/getting-word-out.jpg',
    description: 'An uplifting hour of faith, purpose, and practical encouragement.',
  },
  {
    id: 'believing',
    name: 'Believing & Becoming',
    time: 'Fridays · 12 noon EST',
    category: 'Faith',
    image: '/assets/believing-becoming.jpg',
    description: 'Real stories about becoming who you were created to be.',
  },
  {
    id: 'grit',
    name: 'The Grit & Grace Recovery Hour',
    time: 'Wednesdays · 12 noon',
    category: 'Recovery',
    image: '/assets/grit-grace.jpg',
    description: 'Hope, honesty, and useful support for every step of recovery.',
  },
];

const products = [
  { id: 'snapback', name: 'Classic Snapback', price: 27.25, image: '/assets/snapback.jpg' },
  { id: 'coaster', name: 'Cork-back coaster', price: 10, image: '/assets/coaster.jpg' },
  { id: 'tote', name: 'Large organic tote bag', price: 32.5, image: '/assets/tote.jpg' },
  { id: 'slides', name: 'Slides', price: 40, image: '/assets/slides.jpg' },
  { id: 'mug', name: 'White glossy mug', price: 12, image: '/assets/mug.jpg' },
];

const supportLines = [
  { name: 'Georgia Crisis & Access Line', phone: '1-800-715-4225', note: '24/7 crisis support' },
  { name: 'CARES Warm Line', phone: '1-844-326-5400', note: 'Daily peer support' },
  { name: 'Peer Support for Georgia', phone: '888-945-1414', note: 'Talk with someone who understands' },
];

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v10h13V10M9 20v-6h6v6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4M17 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    play: <path d="m9 7 8 5-8 5V7Z" />,
    pause: <><path d="M9 7v10M15 7v10" /></>,
    back: <><path d="m15 18-6-6 6-6" /></>,
    cart: <><path d="M3 4h2l2 11h10l2-7H6" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></>,
    phone: <path d="M6.6 3h3l1.5 5-2.2 1.3a15.6 15.6 0 0 0 5.8 5.8l1.3-2.2 5 1.5v3a3 3 0 0 1-3 3A15 15 0 0 1 3.6 6a3 3 0 0 1 3-3Z" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    minus: <path d="M5 12h14" />,
    plus: <><path d="M5 12h14M12 5v14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    wifi: <><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="20" r="1" /></>,
    gift: <><rect x="3" y="9" width="18" height="12" rx="2" /><path d="M12 9v12M3 13h18M7.5 9C5 9 4 7.5 4.5 6S8 5 12 9M16.5 9C19 9 20 7.5 19.5 6S16 5 12 9" /></>,
    heart: <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.8l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4M9 12h9" /></>,
    headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Button({
  children,
  onClick,
  variant = 'primary',
  icon,
  type = 'button',
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: IconName;
  type?: 'button' | 'submit';
  className?: string;
}) {
  return (
    <button type={type} onClick={onClick} className={`button button--${variant} ${className}`}>
      {icon && <Icon name={icon} size={20} />}
      <span>{children}</span>
    </button>
  );
}

function Field({ label, placeholder, type = 'text', required = false }: { label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} placeholder={placeholder} required={required} />
    </label>
  );
}

function TopBar({ title, onBack, action }: { title: string; onBack: () => void; action?: ReactNode }) {
  return (
    <div className="topbar">
      <button className="icon-button" onClick={onBack} aria-label="Go back"><Icon name="back" /></button>
      <div className="topbar__title">{title}</div>
      <div className="topbar__action">{action}</div>
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? 'logo logo--compact' : 'logo'} src="/assets/station-logo.jpg" alt="CAT.10ENT. Radio" />;
}

function AppHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="app-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <div className="page-title">{title}</div>
      </div>
      {action}
    </div>
  );
}

function MiniPlayer({ playing, setPlaying, open }: { playing: boolean; setPlaying: (value: boolean) => void; open: () => void }) {
  return (
    <div className="mini-player">
      <button className="mini-player__main" onClick={open}>
        <Logo compact />
        <span><b>Live on CAT.10ENT.</b><small>Inspire. Motivate. Inform.</small></span>
      </button>
      <button className="mini-player__play" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}>
        <Icon name={playing ? 'pause' : 'play'} />
      </button>
    </div>
  );
}

function BottomNav({ screen, navigate }: { screen: Screen; navigate: (screen: Screen) => void }) {
  const tabs: { label: string; icon: IconName; screen: Screen }[] = [
    { label: 'Home', icon: 'home', screen: 'home' },
    { label: 'Shows', icon: 'calendar', screen: 'shows' },
    { label: 'Store', icon: 'bag', screen: 'store' },
    { label: 'Profile', icon: 'user', screen: 'profile' },
  ];
  return (
    <div className="bottom-nav">
      {tabs.slice(0, 2).map((tab) => <NavItem key={tab.label} {...tab} active={screen === tab.screen || (screen === 'show-detail' && tab.screen === 'shows')} navigate={navigate} />)}
      <button className="live-nav" onClick={() => navigate('live')} aria-label="Open live player"><Icon name="play" size={28} /></button>
      {tabs.slice(2).map((tab) => <NavItem key={tab.label} {...tab} active={screen === tab.screen || (['gift', 'cart', 'checkout', 'success'].includes(screen) && tab.screen === 'store')} navigate={navigate} />)}
    </div>
  );
}

function NavItem({ label, icon, screen, active, navigate }: { label: string; icon: IconName; screen: Screen; active: boolean; navigate: (screen: Screen) => void }) {
  return (
    <button className={`nav-item ${active ? 'is-active' : ''}`} onClick={() => navigate(screen)}>
      <Icon name={icon} size={21} /><span>{label}</span>
    </button>
  );
}

function AppShell({ children, screen, navigate, playing, setPlaying, mini = true }: { children: ReactNode; screen: Screen; navigate: (s: Screen) => void; playing: boolean; setPlaying: (v: boolean) => void; mini?: boolean }) {
  return (
    <div className="app-screen">
      <main className="screen-scroll">{children}</main>
      {mini && <MiniPlayer playing={playing} setPlaying={setPlaying} open={() => navigate('live')} />}
      <BottomNav screen={screen} navigate={navigate} />
    </div>
  );
}

function Splash() {
  return (
    <div className="splash">
      <div className="splash__glow" />
      <Logo />
      <div className="splash__tagline">Inspire. Motivate. Inform.</div>
      <div className="splash__loader"><span /></div>
    </div>
  );
}

function Welcome({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="welcome">
      <div className="welcome__hero">
        <img src="/assets/hero-studio.jpg" alt="CAT.10ENT. Radio studio" />
        <div className="welcome__shade" />
        <Logo compact />
      </div>
      <div className="welcome__content">
        <div className="eyebrow">HisHopRadio</div>
        <div className="display-title">Listen while<br />on your mission.</div>
        <div className="body-copy">Purposeful radio for your everyday journey.</div>
        <div className="stack">
          <Button onClick={() => navigate('signup')}>Create account</Button>
          <Button variant="outline" onClick={() => navigate('login')}>Log in</Button>
          <Button variant="ghost" onClick={() => navigate('home')}>Continue as guest</Button>
        </div>
      </div>
    </div>
  );
}

function AuthScreen({ mode, navigate }: { mode: 'login' | 'signup'; navigate: (s: Screen) => void }) {
  const isLogin = mode === 'login';
  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate('home');
  };
  return (
    <div className="auth">
      <TopBar title="" onBack={() => navigate('welcome')} />
      <div className="auth__brand"><Logo compact /></div>
      <div className="page-title">{isLogin ? 'Welcome back' : 'Join the mission'}</div>
      <div className="body-copy">{isLogin ? 'Log in to keep listening.' : 'Create your free account.'}</div>
      <form className="form-stack" onSubmit={submit}>
        {!isLogin && <Field label="Name" placeholder="Your name" required />}
        <Field label="Email" placeholder="you@example.com" type="email" required />
        <Field label="Password" placeholder="At least 8 characters" type="password" required />
        {isLogin && <button className="text-link form-link" type="button">Forgot password?</button>}
        <Button type="submit">{isLogin ? 'Log in' : 'Create account'}</Button>
      </form>
      <button className="auth-switch" onClick={() => navigate(isLogin ? 'signup' : 'login')}>
        {isLogin ? 'New here? ' : 'Already a member? '}<b>{isLogin ? 'Sign up' : 'Log in'}</b>
      </button>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="skeleton-wrap">
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--hero" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton-row"><div className="skeleton skeleton--card" /><div className="skeleton skeleton--card" /></div>
    </div>
  );
}

function Home({ navigate, playing, setPlaying, loading }: { navigate: (s: Screen) => void; playing: boolean; setPlaying: (v: boolean) => void; loading: boolean }) {
  if (loading) return <AppShell screen="home" navigate={navigate} playing={playing} setPlaying={setPlaying} mini={false}><HomeSkeleton /></AppShell>;
  return (
    <AppShell screen="home" navigate={navigate} playing={playing} setPlaying={setPlaying} mini={false}>
      <AppHeader eyebrow="Good evening," title="Jordan" action={<button className="avatar">JM</button>} />
      <section className="live-card">
        <div className="live-card__top"><span className="live-badge"><i /> LIVE</span><span className="muted-label">ON AIR NOW</span></div>
        <Logo />
        <div className="live-card__meta">
          <div><small>NOW PLAYING</small><b>CAT.10ENT. Radio Live</b></div>
          <div className="equalizer">{[1,2,3,4,5].map((n) => <i key={n} />)}</div>
        </div>
        <button className="big-play" onClick={() => { setPlaying(!playing); navigate('live'); }} aria-label="Play live radio"><Icon name={playing ? 'pause' : 'play'} size={30} /></button>
      </section>

      <SectionTitle title="On air this week" action="See all" onClick={() => navigate('shows')} />
      <div className="horizontal-list">
        {shows.slice(0, 3).map((show) => (
          <button className="show-tile" key={show.id} onClick={() => navigate('show-detail')}>
            <img src={show.image} alt="" />
            <span><b>{show.name}</b><small>{show.time}</small></span>
          </button>
        ))}
      </div>

      <SectionTitle title="Store picks" action="Shop all" onClick={() => navigate('store')} />
      <div className="horizontal-list">
        {products.slice(0, 3).map((product) => (
          <button className="product-tile" key={product.id} onClick={() => navigate('store')}>
            <img src={product.image} alt="" />
            <span><b>{product.name}</b><small>${product.price.toFixed(2)}</small></span>
          </button>
        ))}
      </div>

      <button className="support-banner" onClick={() => navigate('support')}>
        <span className="support-banner__icon"><Icon name="heart" /></span>
        <span><b>Need support?</b><small>You're never alone. Talk to someone now.</small></span>
        <Icon name="chevron" />
      </button>
    </AppShell>
  );
}

function SectionTitle({ title, action, onClick }: { title: string; action: string; onClick: () => void }) {
  return <div className="section-title"><b>{title}</b><button onClick={onClick}>{action}</button></div>;
}

function LivePlayer({ navigate, playing, setPlaying }: { navigate: (s: Screen) => void; playing: boolean; setPlaying: (v: boolean) => void }) {
  return (
    <div className="player-screen">
      <div className="player-screen__glow" />
      <button className="close-button" onClick={() => navigate('home')} aria-label="Close player"><Icon name="close" /></button>
      <div className="player-kicker"><span className="live-badge"><i /> LIVE</span></div>
      <div className="player-art"><Logo /></div>
      <div className="player-info"><small>NOW PLAYING</small><div className="page-title">CAT.10ENT. Radio</div><p>Inspire. Motivate. Inform.</p></div>
      <button className="player-play" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}><Icon name={playing ? 'pause' : 'play'} size={38} /></button>
      <div className="volume"><Icon name="headphones" size={19} /><input aria-label="Volume" type="range" defaultValue="72" /><span>72%</span></div>
      <div className="player-equalizer">{Array.from({ length: 22 }, (_, i) => <i key={i} />)}</div>
    </div>
  );
}

function Shows({ navigate, playing, setPlaying }: { navigate: (s: Screen) => void; playing: boolean; setPlaying: (v: boolean) => void }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? shows : shows.filter((show) => show.category === filter);
  return (
    <AppShell screen="shows" navigate={navigate} playing={playing} setPlaying={setPlaying}>
      <AppHeader eyebrow="Discover" title="Tune in" />
      <div className="chips">{['All', 'Talk', 'Faith', 'Recovery'].map((chip) => <button key={chip} className={`chip ${filter === chip ? 'is-selected' : ''}`} onClick={() => setFilter(chip)}>{chip}</button>)}</div>
      <div className="show-list">
        {filtered.map((show) => (
          <button className="show-row" key={show.id} onClick={() => navigate('show-detail')}>
            <img src={show.image} alt="" />
            <span className="show-row__copy"><b>{show.name}</b><small>{show.time}</small></span>
            <span className="remind-icon" onClick={(e) => e.stopPropagation()}><Icon name="bell" size={15} />Remind</span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function ShowDetail({ navigate, playing, setPlaying }: { navigate: (s: Screen) => void; playing: boolean; setPlaying: (v: boolean) => void }) {
  const show = shows[0];
  const [reminded, setReminded] = useState(false);
  return (
    <AppShell screen="show-detail" navigate={navigate} playing={playing} setPlaying={setPlaying}>
      <TopBar title="Show details" onBack={() => navigate('shows')} />
      <img className="detail-art" src={show.image} alt={show.name} />
      <div className="detail-copy">
        <span className="category-pill">TALK & CULTURE</span>
        <div className="page-title">{show.name}</div>
        <div className="detail-time"><Icon name="calendar" size={18} />{show.time}</div>
        <p>{show.description}</p>
      </div>
      <div className="detail-actions">
        <Button icon="play" onClick={() => navigate('live')}>Listen live</Button>
        <Button variant="outline" icon={reminded ? 'check' : 'bell'} onClick={() => setReminded(!reminded)}>{reminded ? 'Reminder set' : 'Remind me'}</Button>
      </div>
    </AppShell>
  );
}

function Store({ navigate, playing, setPlaying, cart, addToCart }: { navigate: (s: Screen) => void; playing: boolean; setPlaying: (v: boolean) => void; cart: Record<string, number>; addToCart: (id: string) => void }) {
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  return (
    <AppShell screen="store" navigate={navigate} playing={playing} setPlaying={setPlaying}>
      <AppHeader eyebrow="Official merch" title="Show your support" action={<button className="cart-button" onClick={() => navigate('cart')}><Icon name="cart" />{cartCount > 0 && <span>{cartCount}</span>}</button>} />
      <button className="gift-banner" onClick={() => navigate('gift')}><span><Icon name="gift" /></span><b>Send a gift card</b><Icon name="chevron" /></button>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-card__content">
              <b>{product.name}</b>
              <strong>${product.price.toFixed(2)}</strong>
              <button onClick={() => addToCart(product.id)}><Icon name="plus" size={18} /> Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function GiftCard({ navigate, addGift }: { navigate: (s: Screen) => void; addGift: (amount: number) => void }) {
  const [amount, setAmount] = useState(50);
  return (
    <div className="standalone-screen">
      <TopBar title="Gift card" onBack={() => navigate('store')} action={<button className="icon-button" onClick={() => navigate('cart')}><Icon name="cart" /></button>} />
      <div className="gift-art"><div className="gift-art__glow" /><Logo /><span>THE GIFT OF GOOD RADIO</span></div>
      <div className="section-heading">Choose an amount</div>
      <div className="amount-grid">{[25, 50, 100, 150, 200].map((value) => <button className={`amount-chip ${amount === value ? 'is-selected' : ''}`} key={value} onClick={() => setAmount(value)}>${value}</button>)}</div>
      <div className="form-stack compact-form">
        <Field label="Recipient email" placeholder="friend@example.com" type="email" />
        <label className="field"><span>Message</span><textarea placeholder="A few words from you…" rows={3} /></label>
      </div>
      <div className="sticky-action"><Button onClick={() => { addGift(amount); navigate('cart'); }}>Add ${amount} gift card</Button></div>
    </div>
  );
}

function Cart({ navigate, cart, setCart }: { navigate: (s: Screen) => void; cart: Record<string, number>; setCart: (cart: Record<string, number>) => void }) {
  const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
  const total = entries.reduce((sum, [id, quantity]) => {
    const price = id.startsWith('gift-') ? Number(id.split('-')[1]) : products.find((product) => product.id === id)?.price ?? 0;
    return sum + price * quantity;
  }, 0);
  const update = (id: string, delta: number) => setCart({ ...cart, [id]: Math.max(0, (cart[id] || 0) + delta) });
  return (
    <div className="standalone-screen">
      <TopBar title="Your cart" onBack={() => navigate('store')} />
      {entries.length === 0 ? (
        <div className="empty-state">
          <span><Icon name="bag" size={34} /></span>
          <div className="page-title">Your cart is empty</div>
          <p>Find something meaningful in the store.</p>
          <Button onClick={() => navigate('store')}>Browse the store</Button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {entries.map(([id, quantity]) => {
              const product = products.find((item) => item.id === id);
              const isGift = id.startsWith('gift-');
              const price = isGift ? Number(id.split('-')[1]) : product?.price ?? 0;
              return (
                <div className="cart-row" key={id}>
                  {isGift ? <div className="cart-row__gift"><Icon name="gift" /></div> : <img src={product?.image} alt="" />}
                  <div className="cart-row__copy"><b>{isGift ? `$${price} Gift card` : product?.name}</b><strong>${price.toFixed(2)}</strong></div>
                  <div className="stepper"><button onClick={() => update(id, -1)}><Icon name="minus" size={16} /></button><span>{quantity}</span><button onClick={() => update(id, 1)}><Icon name="plus" size={16} /></button></div>
                </div>
              );
            })}
          </div>
          <div className="order-total"><span>Total</span><b>${total.toFixed(2)}</b></div>
          <div className="sticky-action"><Button onClick={() => navigate('checkout')}>Checkout · ${total.toFixed(2)}</Button></div>
        </>
      )}
    </div>
  );
}

function Checkout({ navigate, total }: { navigate: (s: Screen) => void; total: number }) {
  const submit = (event: FormEvent) => { event.preventDefault(); navigate('success'); };
  return (
    <div className="standalone-screen">
      <TopBar title="Checkout" onBack={() => navigate('cart')} />
      <div className="checkout-summary"><span>Order total</span><b>${total.toFixed(2)}</b></div>
      <form className="form-stack checkout-form" onSubmit={submit}>
        <div className="section-heading">Contact</div>
        <Field label="Name" placeholder="Your full name" required />
        <Field label="Email" placeholder="you@example.com" type="email" required />
        <div className="section-heading address-heading">Delivery</div>
        <Field label="Address" placeholder="Street address" required />
        <Field label="City & ZIP" placeholder="Atlanta, GA 30301" required />
        <div className="sticky-action"><Button type="submit">Place order · ${total.toFixed(2)}</Button></div>
      </form>
    </div>
  );
}

function Success({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="success-screen">
      <div className="success-check"><Icon name="check" size={46} /></div>
      <div className="eyebrow">ORDER CONFIRMED</div>
      <div className="display-title">Thank you for<br />your support!</div>
      <p>Your order helps CAT.10ENT. Radio continue to inspire, motivate, and inform.</p>
      <Button onClick={() => navigate('home')}>Back to home</Button>
    </div>
  );
}

function Support({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="standalone-screen">
      <TopBar title="Support lines" onBack={() => navigate('home')} />
      <div className="support-intro"><span><Icon name="heart" size={28} /></span><div className="page-title">You are not alone.</div><p>Free, confidential support is one call away.</p></div>
      <div className="support-list">
        {supportLines.map((line) => (
          <div className="support-card" key={line.name}>
            <small>{line.note}</small>
            <b>{line.name}</b>
            <strong>{line.phone}</strong>
            <a href={`tel:${line.phone}`}><Icon name="phone" size={19} />Call now</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile({ navigate, playing, setPlaying }: { navigate: (s: Screen) => void; playing: boolean; setPlaying: (v: boolean) => void }) {
  const rows: { label: string; detail?: string; icon: IconName; screen?: Screen }[] = [
    { label: 'Cart', icon: 'cart', screen: 'cart' },
    { label: 'Gift cards', icon: 'gift', screen: 'gift' },
    { label: 'Support lines', icon: 'heart', screen: 'support' },
    { label: 'Advertise with us', detail: '$20/month', icon: 'wifi' },
    { label: 'Donate', icon: 'heart' },
    { label: 'Settings', icon: 'settings' },
    { label: 'Log out', icon: 'logout', screen: 'welcome' },
  ];
  return (
    <AppShell screen="profile" navigate={navigate} playing={playing} setPlaying={setPlaying}>
      <AppHeader title="Profile" />
      <div className="profile-card"><div className="profile-avatar">JM</div><div><b>Jordan Miller</b><span>jordan@example.com</span></div></div>
      <div className="profile-list">
        {rows.map((row) => (
          <button key={row.label} onClick={() => row.screen && navigate(row.screen)}>
            <span className="profile-list__icon"><Icon name={row.icon} size={20} /></span>
            <b>{row.label}</b>
            {row.detail && <small>{row.detail}</small>}
            <Icon name="chevron" size={18} />
          </button>
        ))}
      </div>
    </AppShell>
  );
}

function Offline() {
  return (
    <div className="offline">
      <span><Icon name="wifi" size={38} /></span>
      <div className="page-title">No internet connection</div>
      <p>Reconnect to keep the music playing.</p>
      <Button onClick={() => window.location.reload()}>Try again</Button>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [playing, setPlaying] = useState(false);
  const [loadingHome, setLoadingHome] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [cart, setCart] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => setScreen('welcome'), 1800);
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const navigate = (next: Screen) => {
    if (next === 'home' && !['home', 'splash'].includes(screen)) {
      setLoadingHome(true);
      window.setTimeout(() => setLoadingHome(false), 700);
    }
    setScreen(next);
  };

  const addToCart = (id: string) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const total = useMemo(() => Object.entries(cart).reduce((sum, [id, quantity]) => {
    const price = id.startsWith('gift-') ? Number(id.split('-')[1]) : products.find((product) => product.id === id)?.price ?? 0;
    return sum + price * quantity;
  }, 0), [cart]);

  if (!online) return <div className="phone-shell"><Offline /></div>;

  let content: ReactNode;
  switch (screen) {
    case 'splash': content = <Splash />; break;
    case 'welcome': content = <Welcome navigate={navigate} />; break;
    case 'login': content = <AuthScreen mode="login" navigate={navigate} />; break;
    case 'signup': content = <AuthScreen mode="signup" navigate={navigate} />; break;
    case 'home': content = <Home navigate={navigate} playing={playing} setPlaying={setPlaying} loading={loadingHome} />; break;
    case 'live': content = <LivePlayer navigate={navigate} playing={playing} setPlaying={setPlaying} />; break;
    case 'shows': content = <Shows navigate={navigate} playing={playing} setPlaying={setPlaying} />; break;
    case 'show-detail': content = <ShowDetail navigate={navigate} playing={playing} setPlaying={setPlaying} />; break;
    case 'store': content = <Store navigate={navigate} playing={playing} setPlaying={setPlaying} cart={cart} addToCart={addToCart} />; break;
    case 'gift': content = <GiftCard navigate={navigate} addGift={(amount) => addToCart(`gift-${amount}`)} />; break;
    case 'cart': content = <Cart navigate={navigate} cart={cart} setCart={setCart} />; break;
    case 'checkout': content = <Checkout navigate={navigate} total={total} />; break;
    case 'success': content = <Success navigate={navigate} />; break;
    case 'support': content = <Support navigate={navigate} />; break;
    case 'profile': content = <Profile navigate={navigate} playing={playing} setPlaying={setPlaying} />; break;
  }

  return <div className="phone-shell"><div className="screen-transition" key={screen}>{content}</div></div>;
}
