import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { NAV } from "../content/nav.js";
import Chevron from "./Chevron.jsx";

const WHITE_LOGO =
  "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='196.808'%20height='170.369'%20viewBox='0%200%20196.808%20170.369'%20fill='none'%3e%3cpath%20d='M%20162.181%20102.857%20C%20163.736%2097.481%20164.58%2091.591%20164.58%2085.183%20C%20164.58%2045.108%20131.525%200%2098.51%200%20C%2065.495%200%2032.438%2045.108%2032.438%2085.183%20C%2032.438%2093.921%2034.01%20101.698%2036.81%20108.518%20L%2016.964%20107.4%20C%208.881%20106.944%201.435%20112.722%202.695%20120.739%20C%203.184%20123.848%204.116%20127.031%205.78%20129.78%20C%200.162%20133.742%20-2.133%20141.026%202.419%20146.734%20C%206.989%20152.464%2013.699%20157.744%2022.909%20157.744%20C%2032.899%20157.744%2038.911%20155.156%2042.562%20151.905%20C%2042.829%20153.325%2043.378%20154.723%2044.246%20156.044%20C%2048.73%20162.868%2056.156%20170.369%2067.134%20170.369%20C%2085.809%20170.369%2087.892%20158.61%2088.937%20152.709%20C%2089.019%20152.248%2089.094%20151.821%2089.17%20151.44%20L%20101.65%20145.183%20L%20114.13%20151.44%20C%20114.207%20151.821%20114.282%20152.247%20114.364%20152.708%20C%20115.409%20158.609%20117.492%20170.369%20136.167%20170.369%20C%20147.145%20170.369%20154.571%20162.868%20159.055%20156.044%20C%20159.231%20155.776%20159.394%20155.504%20159.544%20155.229%20C%20163.063%20156.754%20167.72%20157.744%20173.898%20157.744%20C%20183.109%20157.744%20189.819%20152.464%20194.389%20146.734%20C%20199.986%20139.715%20195.231%20130.316%20186.676%20127.636%20L%20183.849%20126.751%20C%20192.15%20122.437%20193.372%20114.303%20192.483%20107.175%20C%20191.478%2099.12%20182.726%2095.639%20175.086%2098.323%20L%20162.181%20102.857%20Z'%20fill='%23FFFFFF'%20fill-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";

export function activeSectionId(pathname) {
  return NAV.find((t) => t.path && (pathname === t.path || pathname.startsWith(t.path + "/")))?.id;
}

export default function Sidebar({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const active = activeSectionId(location.pathname);
  const [open, setOpen] = useState(active ?? null);
  useEffect(() => {
    if (active) setOpen(active);
  }, [active]);

  const toggle = (id) => setOpen((o) => (o === id ? null : id));

  return (
    <nav className="sidebar" aria-label="Brand guidelines">
      <div className="sidebar__brandrow">
        <a className="sidebar__brand" href="/" aria-label="Chainguard — home">
          <img src={WHITE_LOGO} alt="" width={28} height={24} />
        </a>
      </div>
      <div className="sidebar__sections">
        {NAV.map((section) => {
          const isOpen = open === section.id;
          const isActiveLeaf = !section.children && active === section.id;
          return section.children ? (
            <div className="nav-group" key={section.id}>
              <button
                type="button"
                className="nav-header"
                aria-expanded={isOpen}
                onClick={() => {
                  toggle(section.id);
                  navigate(section.path);
                }}
              >
                <span className="nav-header__label">{section.label}</span>
                <span className={"nav-header__chevron" + (isOpen ? "" : " nav-header__chevron--closed")}>
                  <Chevron />
                </span>
              </button>
              <div className={"nav-children-wrap" + (isOpen ? " open" : "")} aria-hidden={!isOpen}>
                <ul className="nav-children">
                  {section.children.map((child) => {
                    if (child.hash) {
                      const samePath = location.pathname === child.path;
                      return (
                        <li key={child.label}>
                          <Link
                            to={{ pathname: child.path, hash: `#${child.hash}` }}
                            onClick={() => {
                              onNavigate?.();
                              samePath &&
                                requestAnimationFrame(() =>
                                  document.getElementById(child.hash)?.scrollIntoView({ behavior: "smooth", block: "start" })
                                );
                            }}
                            tabIndex={isOpen ? 0 : -1}
                            className="nav-child"
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li key={child.path}>
                        <NavLink
                          to={child.path}
                          onClick={onNavigate}
                          tabIndex={isOpen ? 0 : -1}
                          className={({ isActive }) => "nav-child" + (isActive ? " nav-child--active" : "")}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : section.href ? (
            <div className="nav-group" key={section.id}>
              <a
                href={section.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className="nav-header nav-header--cta"
              >
                <span className="nav-header__label">{section.label}</span>
                <span className="nav-header__chevron nav-header__chevron--closed">
                  <Chevron />
                </span>
              </a>
            </div>
          ) : (
            <div className="nav-group" key={section.id}>
              <NavLink to={section.path} onClick={onNavigate} className={"nav-header" + (isActiveLeaf ? " nav-header--active" : "")}>
                <span className="nav-header__label">{section.label}</span>
                <span className="nav-header__chevron nav-header__chevron--closed">
                  <Chevron />
                </span>
              </NavLink>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
