import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	FlatList,
} from "react-native";

import PopularjobsCard from "../../common/cards/popular/PopularJobCard";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";

import useFetch from "../../../hook/useFetch";
import { useRouter } from "expo-router";

const Popularjobs = () => {
	const router = useRouter();

	const [selectedJob, setSelectedJob] = useState();

	const { data, isLoading, error, refetch } = useFetch("search", {
		query: "React Developer",
		num_pages: 1,
	});

	const handleCardPress = (item) => {
		router.push(`/job-details/${item.job_id}`);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Popular Jobs</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>Show All</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator
						size='large'
						color={COLORS.primary}
					/>
				) : error ? (
					<Text>Something Went Wrong</Text>
				) : (
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<PopularjobsCard
								item={item}
								selectedJob={selectedJob}
								handleCardPress={handleCardPress}
							/>
						)}
						key={(item) => item?.job_id}
						contentContainerStyle={{ columnGap: SIZES.medium }}
						horizontal
					/>
				)}
			</View>
		</View>
	);
};

export default Popularjobs;
