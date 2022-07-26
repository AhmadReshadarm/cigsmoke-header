import { motion } from 'framer-motion';
const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    strokeLinecap="round"
    {...props}
  />
);

const PathCircle = (props: any) => <motion.path {...props} />;

export { Path, PathCircle };
