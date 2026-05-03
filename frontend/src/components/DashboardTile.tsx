import Link from 'next/link';
import PropTypes from 'prop-types';

/**
 * Props for the DashboardTile component.
 */
interface DashboardTileProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  colorClass: string;
}

/**
 * Renders a navigation tile for the main dashboard.
 *
 * @param {DashboardTileProps} props - The component props.
 * @returns {JSX.Element} The rendered tile component.
 */
export default function DashboardTile({
  title,
  description,
  icon,
  href,
  colorClass,
}: DashboardTileProps) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col items-center justify-center p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-civic-saffron focus:ring-offset-2 ${colorClass}`}
      aria-label={`Navigate to ${title}`}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
      <span
        className="text-5xl mb-4 transform transition-transform group-hover:scale-110"
        aria-hidden="true"
      >
        {icon}
      </span>
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        {title}
      </h2>
      <p className="text-white/90 text-center font-medium px-4">
        {description}
      </p>
    </Link>
  );
}

DashboardTile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  colorClass: PropTypes.string.isRequired,
};
