import re

with open('src/components/Home/SocialProofSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure Link is imported
if 'import { Link }' not in content:
    content = content.replace('import { useLanguage } from \'@/src/lib/LanguageContext\';', 'import { useLanguage } from \'@/src/lib/LanguageContext\';\nimport { Link } from \'react-router-dom\';')

# Update PlayerCard definition
content = re.sub(r'const PlayerCard = \(\{ role, tamil, icon, body \}: any\) => \(', 'const PlayerCard = ({ role, tamil, icon, body, link }: any) => (', content)

# Update PlayerCard link
content = re.sub(
    r'<button className="text-\[14px\] font-medium text-primary hover:text-white transition-colors">\s*Protocol Access →\s*</button>',
    '<Link to={link || "#"} className="text-[14px] font-medium text-primary hover:text-white transition-colors">\\n      Protocol Access →\\n    </Link>',
    content
)

# Update PlayerCard instances
content = content.replace('role="FARMER"', 'role="FARMER"\n    link="/farmers"')
content = content.replace('role="VENDOR"', 'role="VENDOR"\n    link="/vendors"')
content = content.replace('role="LOGISTICS"', 'role="LOGISTICS"\n    link="/logistics"')
content = content.replace('role="GLOBAL BUYER"', 'role="CUSTOMER"\n    link="/customers"')

with open('src/components/Home/SocialProofSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
