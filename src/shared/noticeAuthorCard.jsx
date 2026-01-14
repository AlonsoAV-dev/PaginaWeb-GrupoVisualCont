import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faXTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

function NoticeAuthorCard({ selectedAuthor }) {
  return (
    <>
      <div className="md:flex flex-row md:gap-x-5 card w-full p-5 mt-8">
        {selectedAuthor.image && (
          <div className="flex items-center justify-center md:min-h-full">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                src={
                  selectedAuthor.image ||
                  "/images/noticias/autores/authorPlaceholder.webp"
                }
                alt={selectedAuthor.name}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col md:text-start text-center md:mt-0 mt-4">
          <div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white underline-offset-2 underline">
              {selectedAuthor.name}
            </span>
            <p className="text-md text-gray-700 dark:text-gray-300 mt-2">
              {selectedAuthor.comment}
            </p>
          </div>
          {/* Iconos de redes sociales */}
          <div className="flex md:flex-row gap-8 pt-2 justify-center md:justify-start md:mt-0 mt-2">
            {selectedAuthor.socials?.facebook && (
              <Link
                href={selectedAuthor.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                type="button"
                className="socialMediaIcons"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  style={{ color: "#1877F2" }}
                />
              </Link>
            )}
            {selectedAuthor.socials?.linkedin && (
              <Link
                href={selectedAuthor.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                type="button"
                className="socialMediaIcons"
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  style={{ color: "#0077B5" }}
                />
              </Link>
            )}
            {selectedAuthor.socials?.twitter && (
              <Link
                href={selectedAuthor.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                type="button"
                className="socialMediaIcons"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </Link>
            )}
            {selectedAuthor.socials?.whatsapp && (
              <Link
                href={selectedAuthor.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                type="button"
                className="socialMediaIcons"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  style={{ color: "#63E6BE" }}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NoticeAuthorCard;
