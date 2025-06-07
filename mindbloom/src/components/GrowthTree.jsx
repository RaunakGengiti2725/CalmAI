import { motion } from 'framer-motion';

export default function GrowthTree({ growth }) {
  // growth counts for each type
  const leaves = Array(growth.neutral).fill('🌿');
  const flowers = Array(growth.positive).fill('🌸');
  const sprouts = Array(growth.insight).fill('🌱');

  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">
        🌳
      </motion.div>
      <motion.div layout className="text-2xl">
        {leaves.join('')} {flowers.join('')} {sprouts.join('')}
      </motion.div>
    </div>
  );
}
