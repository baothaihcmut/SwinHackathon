from pyspark.sql import SparkSession
from pyspark.sql.types import StringType, StructField, StructType, ArrayType, ByteType
from pyspark.sql.functions import from_json,current_timestamp, udf
import base64

def decodeImages(images):
    def decodeImageandSave(image, path):
        if base64_string.startswith('data:image/jpeg;base64,'):
            base64_string = base64_string.replace('data:image/jpeg;base64,', '')
        img_data = base64.b64decode(base64_string)

decodeImageUDF = udf(decodeImages, ByteType())
spark = SparkSession.builder \
    .appName("Streaming from Kafka") \
    .config("spark.streaming.stopGracefullyOnShutdown", True) \
    .config('spark.jars.packages', 'org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1') \
    .master("spark://ThaiBaos-MacBook-Pro.local:7077") \
    .getOrCreate()
json_schema = StructType([
    StructField("owner", StringType(), True),
    StructField("images", ArrayType(StringType()), True),
    StructField("text", StringType(), True),
    StructField("path", StringType()),
])

df = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("failOnDataLoss", "false") \
    .option("subscribe", "spark-kafka") \
    .load()
json_df = df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING) as msg_value")
json_expanded_df = json_df.withColumn("msg_value", from_json(json_df["msg_value"], json_schema)).select("msg_value.*")
exploded_df = json_expanded_df.select("owner", "text")
df_with_date = exploded_df.withColumn("inserted_time", current_timestamp())
df_images = json_expanded_df.select("image")



