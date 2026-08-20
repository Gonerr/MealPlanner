import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div>
          <Link href="/" className="app-footer__brand">
            NeМеню
          </Link>
          <p>Меньше вопросов «что готовить?», больше спокойных вечеров.</p>
        </div>

        <div className="app-footer__note">
          <Sparkles size={16} aria-hidden="true" />
          <span>Личный pet-project, который растёт вместе со своей кухней</span>
        </div>

        <div className="app-footer__meta">
          <span>{new Date().getFullYear()}</span>
          <Heart size={15} fill="currentColor" aria-hidden="true" />
          <span>Сделано для домашних</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
