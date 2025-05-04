import {useState} from 'react';
import {Modal, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Car} from '../types/car';
import {dealerships} from './dealerships';

export interface Filter {
  brands: string[];
  seats: number[];
  companies: number[];
}

interface Props {
  visible: boolean;
  onClose(): void;
  initial: Filter;
  onApply(filter: Filter): void;
  cars: Car[];
}

const FilterModal = ({visible, onClose, initial, onApply, cars}: Props) => {
  const [filter, setFilter] = useState<Filter>(initial);
  const [openSection, setOpenSection] = useState<
    'brand' | 'seats' | 'company' | null
  >(null);

  const toggleArray = <T,>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const brands = [...new Set(cars.map((c) => c.brand))];
  const seatOptions = [...new Set(cars.map((c) => c.seats))].sort(
    (a, b) => a - b,
  );
  const companies = [...new Set(cars.map((c) => c.dealership_id))];

  const SectionHeader = (label: string, key: typeof openSection) => (
    <TouchableOpacity
      className="flex-row items-center mb-2"
      onPress={() => setOpenSection(openSection === key ? null : key)}
    >
      <Text className="font-semibold flex-1">{label}</Text>
      <Ionicons
        name={openSection === key ? 'chevron-up' : 'chevron-down'}
        size={18}
      />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/80">
        <View className="bg-primary w-4/5 p-6 rounded-2xl max-h-[80%]">
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4"
          >
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
          <Text className="self-center text-lg font-bold mb-4">
            Filter cars
          </Text>

          {SectionHeader('Brand', 'brand')}
          {openSection === 'brand' && (
            <ScrollView className="mb-4 max-h-40">
              {brands.map((b) => (
                <TouchableOpacity
                  key={b}
                  className="flex-row justify-between items-center py-1"
                  onPress={() =>
                    setFilter((f) => ({...f, brands: toggleArray(f.brands, b)}))
                  }
                >
                  <Text>{b}</Text>
                  <Ionicons
                    name={
                      filter.brands.includes(b) ? 'checkbox' : 'square-outline'
                    }
                    size={18}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {SectionHeader('Seats', 'seats')}
          {openSection === 'seats' && (
            <View className="mb-4">
              {seatOptions.map((s) => (
                <TouchableOpacity
                  key={s}
                  className="flex-row justify-between items-center py-1"
                  onPress={() =>
                    setFilter((f) => ({...f, seats: toggleArray(f.seats, s)}))
                  }
                >
                  <Text>{s} seats</Text>
                  <Ionicons
                    name={
                      filter.seats.includes(s) ? 'checkbox' : 'square-outline'
                    }
                    size={18}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {SectionHeader('Company', 'company')}
          {openSection === 'company' && (
            <View className="mb-4">
              {companies.map((c) => (
                <TouchableOpacity
                  key={c}
                  className="flex-row justify-between items-center py-1"
                  onPress={() =>
                    setFilter((f) => ({
                      ...f,
                      companies: toggleArray(f.companies, c),
                    }))
                  }
                >
                  <Text>{dealerships.find((d) => d.id === c)?.name}</Text>
                  <Ionicons
                    name={
                      filter.companies.includes(c)
                        ? 'checkbox'
                        : 'square-outline'
                    }
                    size={18}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View className="items-center gap-3 mt-4">
            <TouchableOpacity
              className="bg-flame py-2 px-10 rounded-2xl"
              onPress={() => setFilter({brands: [], seats: [], companies: []})}
            >
              <Text>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-secondary py-2 px-10 rounded-2xl"
              onPress={() => {
                onApply(filter);
                onClose();
              }}
            >
              <Text className="text-white">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
